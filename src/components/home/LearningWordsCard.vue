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
import { defineComponent, ref } from 'vue';
import { IonCard, IonItem, IonLabel } from '@ionic/vue';
import { userWordRepository } from '@/repositories/user-word.repository';
import { UserWordStatus } from '@/../types/backend';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export default defineComponent({
  async setup() {
    const userWords = await userWordRepository.getLocalUserWords(
      UserWordStatus.Learning
    );
    return {
      learningWordsCount: ref(userWords.length),
    };
  },
  components: {
    IonCard,
    IonItem,
    IonLabel,
  },
  watch: {
    $route: {
      deep: true,
      async handler(to: RouteLocationNormalizedLoaded) {
        if (to.path == '/tabs/home') {
          await this.fetchData();
        }
      },
    },
  },
  created() {
    userWordRepository.on('updated', this.fetchData.bind(this));
  },
  methods: {
    async fetchData() {
      const userWords = await userWordRepository.getLocalUserWords(
        UserWordStatus.Learning
      );
      this.learningWordsCount = userWords.length;
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
