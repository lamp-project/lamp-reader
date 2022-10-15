<template>
  <ion-modal :initial-breakpoint="0.5">
    <ion-content>
      <section>
        <h1>
          * {{ mainWord }}
          <small class="phonetic">
            <ion-icon :icon="volumeMediumOutline" @click="pronounce" />
          </small>
        </h1>
        <p
          class="translation"
          :style="{ height: `calc(50vh - ${buttonsSectionHeight}px)` }"
        >
          <ion-progress-bar
            v-if="loading"
            type="indeterminate"
            color="dark"
          ></ion-progress-bar>
          <DictionaryEntryView :value="entry" />
        </p>
        <ion-button
          v-if="showNButton"
          @click="setWordStatus(UserWordStatus.Learning)"
          color="warning"
          expand="block"
        >
          Needs more review
        </ion-button>
        <ion-button
          v-if="showPButton"
          @click="setWordStatus(UserWordStatus.Known)"
          color="dark"
          expand="block"
        >
          Move to the known ones
        </ion-button>
      </section>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { dictionaryRepository } from '@/repositories/dictionary.repository';
import { Toast } from '@/utils/Toast';
import { volumeMediumOutline } from 'ionicons/icons';
import {
  IonModal,
  IonProgressBar,
  IonIcon,
  IonButton,
  IonContent,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import DictionaryEntryView from './DictionaryEntry.vue';
import { UserWordStatus } from '@/../types/backend';
import { userWordStore } from '@/store/user-word.store';
import { DictionaryEntry, UserWord } from '@/utils/LocalDatabase';

export default defineComponent({
  setup() {
    return {
      volumeMediumOutline,
      UserWordStatus,
    };
  },
  emits: ['review'],
  components: {
    IonModal,
    IonProgressBar,
    IonIcon,
    IonButton,
    IonContent,
    DictionaryEntryView,
  },
  data: () => ({
    loading: false,
    element: undefined as HTMLSpanElement | undefined,
    userWord: undefined as UserWord | undefined,
    entry: undefined as DictionaryEntry | undefined,
    mainWord: undefined as string | undefined,
  }),
  computed: {
    translations() {
      return this.entry?.definitions;
    },
    phonetic() {
      return undefined;
    },
    showPButton() {
      return this.userWord?.status != UserWordStatus.Known;
    },
    showNButton() {
      return this.userWord?.status != UserWordStatus.Learning;
    },
    buttonsSectionHeight() {
      if (this.showNButton && this.showPButton) {
        return 160;
      } else {
        return 120;
      }
    },
  },
  methods: {
    async open(userWord: UserWord, mainWord: string) {
      this.loading = true;
      this.userWord = userWord;
      this.entry = undefined;
      this.mainWord = mainWord;
      await this.$el.present();
      try {
        this.entry = await dictionaryRepository.lookup(userWord.word);
      } catch (error) {
        await Toast.show({ message: error as any, color: 'danger' });
        throw error;
      }
      this.loading = false;
    },
    pronounce() {
      const msg = new SpeechSynthesisUtterance();
      msg.text = this.mainWord as string;
      window.speechSynthesis.speak(msg);
    },
    async setWordStatus(status: UserWordStatus) {
      this.loading = true;
      try {
        const userWord = await userWordStore.review({
          status,
          word: this.userWord?.word as string,
        });
        this.$emit('review', userWord);
        this.$el.dismiss();
      } catch (error) {
        await Toast.show({ message: error as any, color: 'danger' });
        throw error;
      }
      this.loading = false;
    },
  },
});
</script>
<style lang="scss" scoped>
h1 {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  text-transform: capitalize;
}
.phonetic {
  color: grey;
  font-family: serif;
  font-weight: 300;
  ion-icon {
    color: black;
  }
}
.translation {
  overflow-y: scroll;
  margin: 0;
}
section {
  padding: 6px;
  height: 50vh;
}
</style>
