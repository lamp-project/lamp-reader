<template>
  <ion-modal
    :initial-breakpoint="0.5"
    handle-behavior="cycle"
    @ion-breakpoint-did-change="updateBreakpoint"
  >
    <ion-content ref="ccc">
      <section :style="{ height: currentHeight + 'px' }">
      <h1>
        {{ word }}
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
        <DictionaryEntryView :value="entry"/>
      </p>
      <hr />
      <div class="word-buttons">
        <ion-button color="warning" expand="block">Needs more review</ion-button>
        <ion-button color="dark" expand="block">
          Move to the known ones
        </ion-button>
      </div>
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

const INITIAL_BREAKPOINT = 0.5;

export default defineComponent({
  setup() {
    return {
      volumeMediumOutline,
    };
  },
  components: {
    IonModal,
    IonProgressBar,
    IonIcon,
    IonButton,
    IonContent,
    DictionaryEntryView
  },
  data: () => ({
    loading: false,
    element: undefined as HTMLSpanElement | undefined,
    word: '' as string | undefined,
    entry: undefined as DictionaryEntry | undefined,
    currentBreakPoint: INITIAL_BREAKPOINT,
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
    currentHeight() {
      return this.currentBreakPoint * window.outerHeight;
    },
  },
  methods: {
    async open(element: HTMLSpanElement) {
      this.loading = true;
      this.element = element;
      this.word = element.textContent?.toLowerCase();
      this.entry = undefined;
      this.currentBreakPoint = INITIAL_BREAKPOINT;
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
    async updateBreakpoint({ detail: { breakpoint } }: CustomEvent) {
      this.currentBreakPoint = breakpoint;
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
  height: calc(50vh - 180px);
  overflow-y: scroll;
  margin:0
}
ul {
  padding-left: 24px;
}
section{
  padding: 6px;
  height: 50vh;
}
</style>
