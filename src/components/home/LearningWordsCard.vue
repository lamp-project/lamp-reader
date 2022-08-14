getLocalUserWords
<template>
  <ion-card color="warning" class="learning-words">
    <ion-item button color="warning" detail :router-link="{ name: 'review' }">
      <ion-label>
        <h1>{{ learningWordsCount }} <small>Learning words</small></h1>
      </ion-label>
    </ion-item>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonCard, IonItem, IonLabel } from '@ionic/vue';
import { UserWord, UserWordStatus } from '@/../types/backend';
import { userWordStore } from '@/store/user-word.store';

export default defineComponent({
  async setup() {
    await userWordStore.initialise();
    return {
      userWords: userWordStore.userWords,
    };
  },
  components: {
    IonCard,
    IonItem,
    IonLabel,
  },
  computed: {
    learningWordsCount() {
      // @ts-ignore
      return this.userWords.filter(
        ({ status }: UserWord) => status == UserWordStatus.Learning
      ).length;
    },
  },
});
</script>
<style lang="scss" scoped>
h1 {
  font-family: 'Merriweather', serif;
  font-size: 2.5em;
  display: flex;
  align-items: center;
  margin: 6px;
  small {
    font-size: initial;
    margin-left: 12px;
  }
}
</style>
