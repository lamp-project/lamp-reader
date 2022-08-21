<template>
  <ion-list>
    <ion-list-header>
      <b>{{ $route.query.status }}</b>
      &nbsp; Words
    </ion-list-header>
    <ion-item
      v-for="userWord in paginatedList"
      :key="userWord.wordId"
      button
      @click="showModal(userWord)"
    >
      <ion-label>
        <h3>{{ userWord.wordId }}</h3>
        <small>
          Status changed at
          {{ formatDistanceToNowStrict(userWord.updatedAt) }}
          ago.
        </small>
      </ion-label>
      <ion-icon slot="end" :icon="eye"></ion-icon>
    </ion-item>
  </ion-list>
  <ion-infinite-scroll
    @ionInfinite="loadData"
    :disabled="paginatedList.length == userWords.length"
  >
    <ion-infinite-scroll-content loading-spinner="crescent" />
  </ion-infinite-scroll>
  <WordModal ref="wordModal" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { eye } from 'ionicons/icons';
import {
  IonList,
  IonListHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/vue';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { orderBy } from 'lodash';
import { UserWord, UserWordStatus } from '@/../types/backend';
import WordModal from './WordModal.vue';
import { userWordStore } from '@/store/user-word.store';

const ITEMS_PER_PAGE = 20;

export default defineComponent({
  async setup() {
    await userWordStore.initialise();
    return {
      formatDistanceToNowStrict,
      UserWordStatus,
      // Icons
      eye,
    };
  },
  components: {
    IonList,
    IonListHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonIcon,
    WordModal,
  },
  data: () => ({
    userWords: userWordStore.userWords,
    paginatedList: [] as UserWord[],
    page: 0,
  }),
  computed: {
    filteredList() {
      // @ts-ignore
      return this.userWords.filter(
        ({ status }: UserWord) => status == this.$route.query.status
      );
    },
    orderedList() {
      return orderBy(this.filteredList, ['updatedAt'], ['desc']);
    },
  },
  created() {
    this.pushPageItems();
  },
  methods: {
    showModal(userWord: UserWord) {
      // @ts-ignore
      this.$refs.wordModal.open(userWord);
    },
    pushPageItems() {
      const start = this.page * ITEMS_PER_PAGE;
      this.paginatedList.push(
        ...this.orderedList.slice(start, start + ITEMS_PER_PAGE)
      );
      this.page++;
    },
    loadData({ target }: InfiniteScrollCustomEvent) {
      this.pushPageItems();
      target.complete();
    },
  },
});
</script>
<style lang="scss" scoped>
ion-label {
  h3 {
    text-transform: capitalize;
    font-family: 'Merriweather', serif !important;
    font-size: 1.5em !important;
  }
  small {
    color: grey;
  }
}
</style>
