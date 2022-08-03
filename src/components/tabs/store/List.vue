<template>
  <ion-list>
    <ion-list-header>Latest Books</ion-list-header>
    <Item v-for="item in items" :key="item.id" :value="item" />
  </ion-list>
  <ion-infinite-scroll @ionInfinite="loadData" :disabled="isAtTheEnd">
    <ion-infinite-scroll-content loading-spinner="crescent" />
  </ion-infinite-scroll>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonListHeader,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/vue';
import { Book } from 'types/backend';
import Item from './Item.vue';

const ITEMS_PER_PAGE = 8;

export default defineComponent({
  async setup() {
    const { bookRepository } = await import('@/repositories/book.repository');
    const page = await bookRepository.findMany({ first: ITEMS_PER_PAGE });
    const items = ref(page.edges?.map(({ node }) => node) as Book[]);
    return {
      bookRepository,
      totalCount: page.totalCount,
      items,
    };
  },
  components: {
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonListHeader,
    Item,
  },
  computed: {
    isAtTheEnd() {
      return this.items.length >= this.totalCount;
    },
  },
  methods: {
    async loadData({ target }: InfiniteScrollCustomEvent) {
      const lastItem = this.items[this.items.length - 1];
      const page = await this.bookRepository.findMany({
        first: ITEMS_PER_PAGE,
        after: +lastItem.id,
      });
      const items = page.edges?.map(({ node }) => node) as Book[];
      this.items.push(...items);
      target.complete();
    },
  },
});
</script>
