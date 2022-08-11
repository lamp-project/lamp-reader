import { UserWordStatus } from 'types/backend'; import { UserWordStatus } from
'types/backend';
<template>
  <ion-modal initial-breakpoint="0.5">
    <ion-content>
      <section>
        <h1>
          * {{ word }}
          <small v-if="phonetic" class="phonetic">
            {{ phonetic.text }}
            <ion-icon
              v-if="phonetic.audio"
              :icon="volumeMediumOutline"
              @click="playAudio"
            />
          </small>
        </h1>
        <p class="translation">
          <ion-progress-bar
            v-if="loading"
            type="indeterminate"
            color="dark"
          ></ion-progress-bar>
          <DictionaryEntryView :value="entry" />
        </p>
        <hr />
        <ion-button
          @click="setWordStatus(UserWordStatus.Learning)"
          :disabled="loading"
          color="warning"
          expand="block"
        >
          Needs more review
        </ion-button>
        <ion-button
          @click="setWordStatus(UserWordStatus.Known)"
          :disabled="loading"
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
import {
  DictionaryEntry,
  dictionaryRepository,
} from '@/repositories/dictionary.repository';
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
import { HighlighterViewer } from '@/utils/HighlighterViewer';
import { userWordRepository } from '@/repositories/user-word.repository';

export default defineComponent({
  setup() {
    return {
      volumeMediumOutline,
      UserWordStatus,
    };
  },
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
    word: '' as string | undefined,
    entry: undefined as DictionaryEntry | undefined,
  }),
  computed: {
    translations() {
      return this.entry?.records;
    },
    phonetic() {
      if (this.entry?.records.length) {
        const record = this.entry.records.filter(
          (record) => record.phonetics?.length
        )[0];
        return record?.phonetics[0];
      }
      return undefined;
    },
  },
  methods: {
    async open(element: HTMLSpanElement) {
      this.loading = true;
      this.element = element;
      this.word = element.textContent?.toLowerCase();
      this.entry = undefined;
      await this.$el.present();
      try {
        this.entry = await dictionaryRepository.lookup(this.word as string);
      } catch (error) {
        await Toast.show({ message: error as any, color: 'danger' });
      }
      this.loading = false;
    },
    playAudio() {
      if (this.phonetic?.audio) {
        new Audio(this.phonetic.audio).play();
      }
    },
    async setWordStatus(status: UserWordStatus) {
      this.loading = true;
      try {
        const userWord = await userWordRepository.review({
          status,
          word: this.word as string,
        });
        HighlighterViewer.updateWordStatus(
          this.element as HTMLSpanElement,
          userWord
        );
      } catch (error) {
        await Toast.show({ message: error as any, color: 'danger' });
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
  font-family: monospace;
  font-weight: 300;
  ion-icon {
    color: black;
  }
}
.translation {
  height: calc(50vh - 170px);
  overflow-y: scroll;
  margin: 0;
}
section {
  padding: 6px;
  height: 50vh;
}
</style>
