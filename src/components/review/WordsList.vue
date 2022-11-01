<template>
  <ion-list>
    <ion-list-header>
      <b>{{ statusFilter }}</b>
      &nbsp; Words
    </ion-list-header>
    <ion-item
      v-for="(userWord, index) in paginatedList"
      :key="userWord.word"
      button
      @click="showModal(userWord, index)"
    >
      <ion-label>
        <ion-badge color="light">rank:{{ userWord.rank }}</ion-badge>
        <h3>{{ userWord.word }}</h3>
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
  <WordModal ref="wordModal" @review="onReview" />
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
  IonBadge,
  IonIcon,
} from '@ionic/vue';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { orderBy } from 'lodash';
import { UserWordStatus } from '@/../types/backend';
import WordModal from './WordModal.vue';
import { userWordStore } from '@/store/user-word.store';
import { DictionaryEntry, UserWord } from '@/utils/LocalDatabase';
import { dictionaryRepository } from '@/repositories/dictionary.repository';

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
    IonBadge,
    IonIcon,
    WordModal,
  },
  data: () => ({
    userWords: userWordStore.userWords,
    paginatedList: [] as (UserWord & Partial<DictionaryEntry>)[],
    page: 0,
    selectedIndex: -1,
    statusFilter: UserWordStatus.Learning,
  }),
  computed: {
    filteredList() {
      return this.userWords.filter(
        ({ status }: UserWord) => status == this.statusFilter
      );
    },
    orderedList() {
      return orderBy(this.filteredList, ['updatedAt'], ['desc']);
    },
  },
  async created() {
    this.statusFilter = this.$router.currentRoute.value.query
      .status as UserWordStatus;
    await this.pushPageItems();
  },
  methods: {
    showModal(userWord: UserWord, index: number) {
      this.selectedIndex = index;
      // @ts-ignore
      this.$refs.wordModal.open(userWord, userWord.word);
    },
    async pushPageItems() {
      const start = this.page * ITEMS_PER_PAGE;
      const pageItems = this.orderedList.slice(start, start + ITEMS_PER_PAGE);
      for (const item of pageItems) {
        const { rank } = await dictionaryRepository.lookup(item.word);
        this.paginatedList.push({ ...item, rank });
      }
      this.page++;
    },
    async loadData({ target }: InfiniteScrollCustomEvent) {
      await this.pushPageItems();
      target.complete();
    },
    onReview(userWord: UserWord) {
      if (userWord.status != this.statusFilter) {
        this.paginatedList.splice(this.selectedIndex, 1);
      }
      // this.userWords = userWordStore.userWords.value;
      console.log(this.orderedList);
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
