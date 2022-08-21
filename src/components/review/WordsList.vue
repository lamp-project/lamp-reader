<template>
  <ion-list>
    <ion-list-header>{{ $route.query.status }} Words</ion-list-header>
    <ion-item
      v-for="userWord in filteredList"
      :key="userWord.wordId"
      button
      @click="showModal(userWord)"
    >
      <ion-label>{{ userWord.wordId }}</ion-label>
      <ion-icon slot="end" :icon="eye"></ion-icon>
    </ion-item>
  </ion-list>
  <WordModal ref="wordModal" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { eye } from 'ionicons/icons';
import { IonList, IonListHeader, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { UserWord, UserWordStatus } from '@/../types/backend';
import WordModal from './WordModal.vue';
import { userWordStore } from '@/store/user-word.store';

export default defineComponent({
  async setup() {
    await userWordStore.initialise();
    return {
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
  text-transform: capitalize;
  font-family: 'Merriweather', serif !important;
  font-size: 1.2em !important;
}
</style>
