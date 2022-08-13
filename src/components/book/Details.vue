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
      <ReadMore :value="book.description || ''" :size="35" />
      <hr />
      <router-link v-if="exists" :to="`/reader/${book.id}`">
        <ion-button expand="block" color="primary"> Read </ion-button>
      </router-link>
      <DownloadButton v-else :url="book.file" @downloaded="onFileDownloaded" />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonCard, IonCardHeader, IonButton, IonCardContent } from '@ionic/vue';
import { bookRepository } from '@/repositories/book.repository';
import { useRoute } from 'vue-router';
import { BookPerson } from 'types/backend';
import ReadMore from '@/components/utils/ReadMore.vue';
import DownloadButton from './DownloadButton.vue';

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
    // 3- loading library
    const { library } = await import('@derock.ir/epubjs-plus');
    const bookEntryInLibrary = await library.getInfo(id.toString());
    const exists = ref(!!bookEntryInLibrary);
    return { book, library, exists };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonButton,
    IonCardContent,
    ReadMore,
    DownloadButton,
  },
  computed: {
    creator() {
      // @ts-ignore
      const [author] = this.book.persons.filter(
        (person: BookPerson) => person.role == 'AUTHOR'
      );
      return author?.person?.name;
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
</style>
