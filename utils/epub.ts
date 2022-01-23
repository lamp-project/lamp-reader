import loadEpub, * as Epub from 'epubjs';
import { PackagingMetadataObject } from 'epubjs/types/packaging';
import fileDialog from 'file-dialog';

export interface EpubBook {
  metadata: PackagingMetadataObject;
  cover: Blob;
  content: ArrayBuffer;
}

export function extractBookCover(book: Epub.Book) {
  const { coverPath } = book.packaging;
  if (coverPath) {
    return book.archive.getBlob(book.resolve(coverPath));
  } else {
    return null;
  }
}

export async function extractMeta(content: ArrayBuffer) {
  const book = loadEpub(content);
  await book.loaded.cover;
  const cover = await extractBookCover(book);
  const metadata = JSON.parse(JSON.stringify(book.packaging?.metadata));
  book.destroy();
  return { cover, metadata };
}

export async function importEpubFromFileDialog(): Promise<EpubBook> {
  const content = await fileDialog({ accept: 'application/epub+zip' }).then(
    (res) => res[0].arrayBuffer()
  );
  const meta = await extractMeta(content);
  return { content, ...meta };
}
