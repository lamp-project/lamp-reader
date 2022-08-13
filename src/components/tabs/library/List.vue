<template>
  <ion-list v-if="currentReading">
    <ion-list-header>Current Reading</ion-list-header>
    <LibraryItem size="big" :value="currentReading" />
  </ion-list>
  <!-- OTHER bOOks-->
  <ion-list>
    <ion-list-header>Books</ion-list-header>
    <LibraryItem
      v-for="(item, index) in books"
      :key="item.id"
      :value="item"
      @remove="removeItem(item, index)"
    />
  </ion-list>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button color="dark" @click="addFromFileDialog">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonListHeader,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import LibraryItem from './Item.vue';
import { BookInfo } from '@derock.ir/epubjs-plus';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export default defineComponent({
  async setup() {
    const { library } = await import('@derock.ir/epubjs-plus');
    return {
      library,
      items: ref<BookInfo[]>([]),
      currentReadingId: ref<string | null>(),
      // icons
      add,
    };
  },
  components: {
    IonList,
    IonListHeader,
    LibraryItem,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  computed: {
    currentReading() {
      return (
        // @ts-ignore
        this.items.filter(({ id }) => id == this.currentReadingId)[0] || ''
      );
    },
    books() {
      // @ts-ignore
      return this.items.filter((item) => item.id != this.currentReadingId);
    },
  },
  async mounted() {
    await this.loadLibrary();
  },
  watch: {
    $route: {
      deep: true,
      async handler(to: RouteLocationNormalizedLoaded) {
        if (to.path == '/tabs/library') {
          await this.loadLibrary();
        }
      },
    },
  },
  methods: {
    async loadLibrary() {
      this.items = await this.library.index();
      this.currentReadingId = await this.library.getLastBookId();
    },
    async reloadList() {
      this.items = await this.library.index();
    },
    async addFromFileDialog() {
      const book = await this.library.addFromFileDialog();
      if (book) {
        this.items.push(book.info);
      }
    },
    async removeItem(item: BookInfo, index: number) {
      if (confirm(`Are you sure wanna remove "${item.title}"?`)) {
        await this.library.remove(item.id);
        this.items.splice(index, 1);
      }
    },
  },
});
</script>
