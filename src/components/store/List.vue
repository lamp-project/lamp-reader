<template>
  <ion-list ref="list">
    <ion-list-header>
      Books ordered by {{ orderBy.text?.toLowerCase() }} &nbsp;
      <!-- <ion-badge color="dark">{{ totalCount }} Items</ion-badge> -->
    </ion-list-header>
    <Item v-for="item in paginatedList" :key="item.id" :value="item" />
  </ion-list>
  <ion-infinite-scroll
    @ionInfinite="loadData"
    :disabled="paginatedList.length == items.length"
  >
    <ion-infinite-scroll-content loading-spinner="crescent" />
  </ion-infinite-scroll>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button color="dark" @click="scrollTop()">
      <ion-icon :icon="arrowUpOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonListHeader,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  PickerColumnOption,
  IonFabButton,
  IonFab,
  IonIcon,
} from '@ionic/vue';
import { arrowUpOutline } from 'ionicons/icons';
import Item from './Item.vue';
import { Book } from '@/entities/Book';
import { orderBy } from 'lodash';

const ITEMS_PER_PAGE = 8;

export default defineComponent({
  async setup() {
    const { bookRepository } = await import('@/repositories/book.repository');
    const items = await bookRepository.init();
    return {
      arrowUpOutline,
      bookRepository,
      items,
    };
  },
  props: {
    orderBy: { default: {} as PickerColumnOption },
  },
  watch: {
    orderBy() {
      this.page = 0;
      this.paginatedList = [];
      this.pushPageItems();
    },
  },
  components: {
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonListHeader,
    Item,
    IonFabButton,
    IonFab,
    IonIcon,
  },
  data: () => ({
    page: 0,
    paginatedList: [] as Book[],
  }),
  computed: {
    filteredList() {
      // @ts-ignore
      return this.items;
    },
    orderedList() {
      const [column, order] = (
        this.orderBy.value || 'a1Readability-desc'
      ).split('-');
      return orderBy(this.filteredList, [column], [order]);
    },
  },
  created() {
    this.pushPageItems();
  },
  methods: {
    pushPageItems() {
      const start = this.page * ITEMS_PER_PAGE;
      this.paginatedList.push(
        ...this.orderedList.slice(start, start + ITEMS_PER_PAGE)
      );
      this.page++;
    },
    async loadData({ target }: InfiniteScrollCustomEvent) {
      this.pushPageItems();
      target.complete();
    },
    scrollTop() {
      document.querySelector('ion-content')?.scrollToTop();
    },
  },
});
</script>
