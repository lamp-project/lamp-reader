<template>
  <ion-list v-if="activeItem">
    <ion-list-header>Current Reading</ion-list-header>
    <LibraryItem
      size="big"
      :value="activeItem"
      @remove="
        // @ts-ignore
        removeItem(activeItem.id, activeItem.title)
      "
    />
  </ion-list>
  <!-- OTHER bOOks-->
  <ion-list v-if="books.length">
    <ion-list-header>Books</ion-list-header>
    <LibraryItem
      v-for="item in books"
      :key="item.id"
      :value="item"
      @remove="removeItem(item.id, item.title)"
    />
  </ion-list>
  <div v-else class="no-item">
    <div class="ion-text-center">
      <h3>No book in your library!</h3>
      <router-link to="/tabs/store">
        <ion-button color="dark">
          <ion-icon :icon="storefrontOutline"></ion-icon>
          &nbsp;Store
        </ion-button>
      </router-link>
    </div>
  </div>
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
import { add, storefrontOutline } from 'ionicons/icons';
import LibraryItem from './Item.vue';
import { libraryStore } from '@/store/library.store';

export default defineComponent({
  async setup() {
    await libraryStore.initialise();
    return {
      // icons
      add,
      storefrontOutline,
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
<style lang="scss" scoped>
.no-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightgrey;
}
</style>
