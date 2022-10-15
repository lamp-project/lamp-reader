<template>
  <ion-modal id="import-dictionary-modal" :backdrop-dismiss="false">
    <div class="wrapper">
      <h1>Importing Dictionary</h1>

      <br />
      <br />
      <ion-progress-bar
        v-if="progress == 0"
        type="indeterminate"
        color="dark"
      ></ion-progress-bar>
      <ion-progress-bar
        v-else
        color="dark"
        :value="progress / 100"
      ></ion-progress-bar>
      <div class="text-center">
        {{ state }}
        <hr />
        <kbd color="light"> {{ progress }}% </kbd>
      </div>
      <br />
    </div>
  </ion-modal>
</template>

<script lang="ts">
import { languageOutline } from 'ionicons/icons';
import { IonModal, IonProgressBar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { groupBy } from 'lodash';
import { DictionaryEntry, localDatabase } from '@/utils/LocalDatabase';
import { Toast } from '@/utils/Toast';
import { dictionaryRepository } from '@/repositories/dictionary.repository';

const ENTRIES_CHUNCK_SIZE = 5000;

export default defineComponent({
  setup() {
    return {
      languageOutline,
    };
  },
  components: {
    IonModal,
    IonProgressBar,
  },
  data: () => ({
    state: 'downloading entries ...',
    progress: 0,
  }),
  methods: {
    async import() {
      this.progress = 0;
      await this.$el.present();
      const { definitions, entries } =
        await dictionaryRepository.downloadDictionary();
      let counter = 0;
      let entriesChunck = [];
      for (const [word, rank, ratio] of entries) {
        if (++counter % ENTRIES_CHUNCK_SIZE == 0) {
          this.state = `Importing "${word}"`;
          this.progress = Math.round((counter * 100) / entries.length);
          await localDatabase.dictionary.bulkAdd(entriesChunck);
          entriesChunck = [];
          await this.$forceUpdate();
        }
        if (!definitions[word]) {
          console.warn(`No definition for [${word}] found!`);
          continue;
        }
        const POSs = groupBy(
          definitions[word].map(([, ...rest]: any) => rest),
          '0'
        );
        Object.keys(POSs).forEach((POS) => {
          POSs[POS] = POSs[POS].map(([, def]) => def);
        });
        const entry = {
          word,
          rank: +rank,
          ratio: +ratio,
          definitions: POSs,
        } as DictionaryEntry;
        entriesChunck.push(entry);
      }
      await this.$el.dismiss();
      await Toast.show({
        header: ' 💪 Dictionary imported successfuly!',
        color: 'success',
      });
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
section {
  padding: 12px;
}
ion-title {
  padding-left: 6px;
}
text-center {
  text-align: center;
}

ion-modal#import-dictionary-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#import-dictionary-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal#import-dictionary-modal ion-icon {
  margin-right: 6px;

  width: 48px;
  height: 48px;

  padding: 4px 0;

  color: #aaaaaa;
}

ion-modal#import-dictionary-modal .wrapper {
  margin-bottom: 10px;
}
</style>
