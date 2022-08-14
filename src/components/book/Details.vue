<template>
  <ion-card>
    <!-- <div class="band">Advanced</div> -->
    <ion-card-header class="ion-inherit-color md hydrated">
      <img class="header-img" :src="book.cover.medium" />
    </ion-card-header>

    <ion-card-content>
      <div class="title-box">
        <h1>{{ book.title }}</h1>
        <p>{{ creator }}</p>
      </div>
      <hr />
      <ion-row>
        <ion-col>
          You can read
          <h2>{{ readability }}%</h2>
          <h3>Of this book.</h3>
        </ion-col>
        <ion-col>
          It has
          <h2>{{ bookReport.words.length }}</h2>
          <h3>Unique words.</h3>
        </ion-col>
      </ion-row>
      <hr />
      <ReadMore :value="book.description || ''" :size="35" />
      <hr />
      <router-link v-if="exists" :to="`/reader/${book.id}`">
        <ion-button expand="block" color="primary"> Read </ion-button>
      </router-link>
      <DownloadButton v-else :url="book.file" @downloaded="onFileDownloaded" />
      <hr />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonButton,
  IonRow,
  IonCol,
  IonCardContent,
} from '@ionic/vue';
import { stopWords } from '@derock.ir/text-preprocessor';
import { bookRepository } from '@/repositories/book.repository';
import { useRoute } from 'vue-router';
import { BookPerson } from 'types/backend';
import ReadMore from '@/components/utils/ReadMore.vue';
import DownloadButton from './DownloadButton.vue';
import { userWordStore } from '@/store/user-word.store';

export default defineComponent({
  async setup() {
    // 1- validate param
    const { params } = useRoute();
    if (!params.id) {
      throw new Error(`ID param didn't provide.`);
    }
    const id = +params.id;
    // 2- loading book
    const book = await bookRepository.findUnique(id);
    // 3- loading book repost
    const bookReport = await fetch(
      book.file.replace('book.lepub', 'report.json')
    ).then((res) => res.json());
    console.log(bookReport);
    // 4- loading library
    const { library } = await import('@derock.ir/epubjs-plus');
    const bookEntryInLibrary = await library.getInfo(id.toString());
    const exists = ref(!!bookEntryInLibrary);
    // 5- load userWords
    await userWordStore.initialise();
    return { book, library, exists, bookReport };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonButton,
    IonRow,
    IonCol,
    IonCardContent,
    ReadMore,
    DownloadButton,
  },
  data: () => ({ userWords: userWordStore.userWords }),
  computed: {
    creator() {
      // @ts-ignore
      const [author] = this.book.persons.filter(
        (person: BookPerson) => person.role == 'AUTHOR'
      );
      return author?.person?.name;
    },
    readability() {
      let knownWords = 0;
      const userWords = this.userWords.map(({ wordId }) => wordId);
      this.bookReport.words.forEach(([word, count]: [string, number]) => {
        if (stopWords.includes(word) || userWords.includes(word)) {
          knownWords += count;
        }
      });
      return Math.round((knownWords * 100) / this.bookReport.wordsCount);
    },
  },
  methods: {
    async onFileDownloaded(file: ArrayBuffer) {
      await this.library.addFromArrayBuffer(file, this.book.id);
      this.exists = true;
    },
  },
});
</script>
<style lang="scss" scoped>
.band {
  background-color: var(--ion-color-primary, #3880ff);
  // height: 6px;
  width: 100%;
  color: white;
  padding: 6px;
  font-family: 'Merriweather', serif;
}
ion-card-header {
  text-align: center;
  img {
    max-width: 66vw;
    box-shadow: 0px 2px 8px rgb(2 8 20 / 10%), 0px 8px 16px rgb(2 8 20 / 8%);
    border-radius: 6px;
  }
}
ion-card-content {
  .title-box {
    text-align: center;
    font-family: 'Merriweather', serif;
    color: black;
  }
}
ion-row {
  text-align: center;
  font-family: 'Merriweather', serif;
  color: black;
  h2 {
    font-size: 2.5em;
    margin-top: 6px;
  }
  h3 {
    font-size: 1.3em;
  }
  ion-col:first-of-type {
    border-right: 1px solid grey;
  }
}
h2 {
  font-family: 'Merriweather', serif;
  color: black;
}
</style>
