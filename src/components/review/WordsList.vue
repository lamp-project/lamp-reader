<template>
  <ion-list>
    <ion-list-header>Learning Words</ion-list-header>
    <ion-item
      v-for="userWord in userWords"
      :key="userWord.wordId"
      button
      @click="showModal(userWord)"
    >
      <ion-label>{{ userWord.wordId }}</ion-label>
      <ion-icon slot="end" :icon="eye"></ion-icon>
    </ion-item>
  </ion-list>
  <WordModal ref="wordModal" @review="reload" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { eye } from 'ionicons/icons';
import { UserWord, UserWordStatus } from '@/../types/backend';
import { userWordRepository } from '@/repositories/user-word.repository';
import WordModal from './WordModal.vue';

export default defineComponent({
  async setup() {
    const userWords = await userWordRepository.getMyUserWords(UserWordStatus.Learning);
    return {
      userWords: ref(userWords),
      // Icons
      eye,
    };
  },
  components: {
    WordModal,
  },
  methods: {
    async reload() {
      this.userWords = await userWordRepository.getMyUserWords(UserWordStatus.Learning)
    },
    showModal(userWord: UserWord) {
      // @ts-ignore
      this.$refs.wordModal.open(userWord.wordId);
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
