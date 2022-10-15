<template>
  <LoadingScreen v-if="loading" :value="book" />
  <ion-page v-else @click="showControlls = !showControlls">
    <Header
      :chapter="book?.chapter"
      :showControlls="showControlls"
      :viewer="viewer"
    />
    <ion-content :fullscreen="true">
      <div ref="viewerElement" class="epub-viewer"></div>
    </ion-content>
    <Footer :location="book?.location?.end" @click="openSeeker" />
  </ion-page>
  <WordModal ref="wordModal" @review="updateUserWord" />
  <Seeker ref="seeker" :viewer="viewer" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import WordModal from '@/components/review/WordModal.vue';
import { userWordStore } from '@/store/user-word.store';
import LoadingScreen from './LoadingScreen.vue';
import { libraryStore } from '@/store/library.store';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Seeker from './Seeker.vue';
import { UserWord } from '@/utils/LocalDatabase';

export default defineComponent({
  async setup() {
    // 1- validate param
    const { params } = useRoute();
    if (!params.id) {
      throw new Error(`ID param didn't provide.`);
    }
    // 2- loading the user-words
    const userWords = await userWordStore.initialise();
    // 3- creating the viewer
    await libraryStore.initialise();
    const viewer = await libraryStore.read(params.id as string);
    const showControlls = ref(false);
    viewer.on('click-tap', () => {
      showControlls.value = !showControlls.value;
    });
    return {
      userWords,
      viewer,
      showControlls,
    };
  },
  components: {
    LoadingScreen,
    Header,
    IonPage,
    IonContent,
    Footer,
    WordModal,
    Seeker,
  },
  data: () => ({
    loading: false,
    book: libraryStore.activeItem,
  }),
  async mounted() {
    this.loading = true;
    await this.viewer.initialize(this.userWords);
    this.loading = false;
    await this.$nextTick();
    await this.viewer.display(
      this.$refs.viewerElement as Element,
      {},
      this.book?.location?.end.cfi
    );
    this.viewer.on<HTMLSpanElement>('word-click', ({ detail: element }) => {
      // @ts-ignore
      this.$refs.wordModal.open(
        {
          word: element.getAttribute('word'),
          status: element.getAttribute('status'),
        },
        element.textContent
      );
    });
  },
  beforeUnmount() {
    this.viewer.destroy();
  },
  methods: {
    updateUserWord(userWord: UserWord) {
      this.viewer.updateWordStatus(userWord);
    },
    async openSeeker(event:Event) {
      event.stopPropagation();
      // @ts-ignore
      await this.$refs.seeker.open();
    },
  },
});
</script>
<style lang="scss" scoped>
.epub-viewer {
  width: 100%;
  height: 100%;
}
</style>
