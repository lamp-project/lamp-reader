<template>
  <ion-list>
    <ion-list-header>
      <b>{{ $route.query.status }}</b>
      &nbsp; Words
    </ion-list-header>
    <ion-item
      v-for="userWord in orderedList"
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
  <WordModal ref="wordModal" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { eye } from 'ionicons/icons';
import { IonList, IonListHeader, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { orderBy } from 'lodash';
import { UserWord, UserWordStatus } from '@/../types/backend';
import WordModal from './WordModal.vue';
import { userWordStore } from '@/store/user-word.store';

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
    IonItem,
    IonLabel,
    IonIcon,
    WordModal,
  },
  data: () => ({
    userWords: userWordStore.userWords,
  }),
  computed: {
    filteredList() {
      // @ts-ignore
      return this.userWords.filter(
        ({ status }: UserWord) => status == this.$route.query.status
      );
    },
    orderedList() {
      return orderBy(this.filteredList, ['updatedAt'], ['desc'])
    }
  },
  methods: {
    showModal(userWord: UserWord) {
      // @ts-ignore
      this.$refs.wordModal.open(userWord);
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
