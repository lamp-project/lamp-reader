<template>
  <ion-list v-if="activeItem">
    <ion-list-header>Current Reading</ion-list-header>
    <LibraryItem size="big" :value="activeItem" />
  </ion-list>
  <!-- OTHER bOOks-->
  <ion-list>
    <ion-list-header>Books</ion-list-header>
    <LibraryItem
      v-for="item in books"
      :key="item.id"
      :value="item"
      @remove="removeItem(item.id, item.title)"
    />
  </ion-list>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button color="dark" @click="addFromFileDialog">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonListHeader,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import LibraryItem from './Item.vue';
import { libraryStore } from '@/store/library.store';

export default defineComponent({
  async setup() {
    await libraryStore.initialise();
    return {
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
  data: () => ({
    items: libraryStore.items,
    activeItem: libraryStore.activeItem,
  }),
  computed: {
    books() {
      // @ts-ignore
      return this.items.filter((item) => item.id != this.activeItem?.id);
    },
  },
  methods: {
    async addFromFileDialog() {
      await libraryStore.addFromFileDialog();
    },
    async removeItem(id: string, title: string) {
      if (confirm(`Are you sure wanna remove "${title}"?`)) {
        await libraryStore.remove(id);
      }
    },
  },
});
</script>
