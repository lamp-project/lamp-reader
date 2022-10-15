import { localDatabase } from '@/utils/LocalDatabase';
import { Mutex } from 'async-mutex';
import { Location } from 'epubjs';
import { ref } from 'vue';
import fileDialog from 'file-dialog';
import { v4 as uuid } from 'uuid';
import { PageChangedEventPlayload } from '@/utils/viewer/EpubViewer';
import { LampViewer } from '@/utils/viewer/LampViewer';
import { LEPub } from '@/utils/LEPub';
import { Loading } from '@/utils/Loading';
import { EPub, EpubMeta } from '@/utils/viewer/utils/Epub';

export interface LibraryItem extends EpubMeta {
  id: string;
  location?: Location;
  chapter?: string;
}

const ACTIVE_ITEM_SETTINGS_SLUG = 'library:active-item';

export class LibraryStore {
  private readonly initialising = new Mutex();
  public readonly items = ref<LibraryItem[]>([]);
  public readonly activeItem = ref<LibraryItem>();

  async initialise(): Promise<{
    activeItem?: LibraryItem;
    items: LibraryItem[];
  }> {
    const release = await this.initialising.acquire();
    try {
      // 1- initialising items
      if (this.items.value.length == 0) {
        this.items.value = await localDatabase.libraryItems.toArray();
      }
      // 2- initialising active item
      const activeItemId = localStorage.getItem(ACTIVE_ITEM_SETTINGS_SLUG);
      if (activeItemId) {
        this.activeItem.value = await localDatabase.libraryItems.get(
          activeItemId
        );
      }
      return {
        activeItem: this.activeItem.value,
        items: this.items.value,
      };
    } finally {
      release();
    }
  }

  public async addFromFileDialog(): Promise<LibraryItem | undefined> {
    const selectedFiles = await fileDialog({ accept: 'application/epub+zip' });
    const file = await selectedFiles.item(0)?.arrayBuffer();
    if (file) {
      return Loading.wait(`Generating indexes ...`, async () => {
        return await this.add(file, uuid());
      });
    }
  }

  public async add(file: ArrayBuffer, id: string): Promise<LibraryItem> {
    let locations = await LEPub.getLocations(file);
    const epub = new EPub(file, locations);
    const item: LibraryItem = {
      ...(await epub.getMeta()),
      id,
    };
    if (!locations) {
      await epub.initialize();
      locations = epub.locations;
    }
    epub.destroy();
    await localDatabase.epubFiles.put(file, id);
    await localDatabase.libraryItems.put(item, id);
    await localDatabase.epubLocations.put(locations, id);
    this.items.value.push(item);
    return item;
  }

  public async remove(id: string) {
    await localDatabase.epubFiles.delete(id);
    await localDatabase.libraryItems.delete(id);
    await localDatabase.epubLocations.delete(id);
    this.items.value = await localDatabase.libraryItems.toArray();
    if (this.activeItem.value?.id == id) {
      this.activeItem.value = undefined;
    }
  }

  public async get(id: string) {
    return localDatabase.libraryItems.get(id);
  }

  public async read(id: string) {
    // 1- initializing the viewer
    const locations = await localDatabase.epubLocations.get(id);
    const file = await localDatabase.epubFiles.get(id);
    const item = await localDatabase.libraryItems.get(id);
    if (!file || !item || !locations) {
      throw new Error(`Book [${id}] didn't found.`);
    }
    const viewer = new LampViewer(file, locations);
    // 2- setting active item and applying changes
    localStorage.setItem(ACTIVE_ITEM_SETTINGS_SLUG, id);
    this.activeItem.value = item;
    viewer.on<PageChangedEventPlayload>(
      'page-changed',
      async ({ detail: { location, chapter } }) => {
        if (this.activeItem.value) {
          this.activeItem.value = {
            ...this.activeItem.value,
            location,
            chapter,
          };
          await localDatabase.libraryItems.put({ ...item, location, chapter });
        }
      }
    );
    return viewer;
  }
}

export const libraryStore = new LibraryStore();
