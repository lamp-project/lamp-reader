<template>
  <LoadingScreen v-if="loading" :value="book" />
  <ion-page v-else>
    <Header :chapter="currentChapter" :showControlls="showControlls" :viewer="viewer" />
    <ion-content :fullscreen="true">
      <div ref="viewerElement" class="epub-viewer"></div>
    </ion-content>
    <Footer :location="location" />
  </ion-page>
  <WordModal ref="wordModal" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { HighlighterViewer } from '@/utils/HighlighterViewer';
import LoadingScreen from './LoadingScreen.vue';
import { DisplayedLocation } from 'epubjs/types/rendition';
import { userWordRepository } from '@/repositories/user-word.repository';
import Header from './Header.vue';
import Footer from './Footer.vue';
import WordModal from './WordModal.vue';

export default defineComponent({
  async setup() {
    // 1- validate param
    const { params } = useRoute();
    if (!params.id) {
      throw new Error(`ID param didn't provide.`);
    }
    // 2- loading book
    const { library } = await import('@derock.ir/epubjs-plus');
    const book = await library.get(params.id as string);
    if (!book) {
      throw new Error(`Book [${params.id}] didn't found.`);
    }
    // 3- loading the user-words
    const userWords = await userWordRepository.getMyUserWords();
    // 3- creating the viewer
    const viewer = new HighlighterViewer(book, userWords);
    const showControlls = ref(false);
    const currentChapter = ref('');
    const location = ref<DisplayedLocation>();
    viewer.on('page-changed', () => {
      currentChapter.value = book.info.pagination.currentChapter ?? '';
      location.value = book.info.pagination.currentLocation?.end;
    });
    viewer.on('click-tap', () => {
      showControlls.value = !showControlls.value;
    });
    return {
      book: book.info,
      viewer,
      currentChapter,
      location,
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
  },
  data: () => ({
    loading: false,
  }),
  async mounted() {
    this.loading = true;
    await this.viewer.initialize();
    this.loading = false;
    await this.$nextTick();
    await this.viewer.display(this.$refs.viewerElement as Element);
    this.viewer.on('word-click', (element: HTMLSpanElement) => {
      (this.$refs.wordModal as any).open(element);
    });
  },
  beforeUnmount() {
    this.viewer.destroy();
  },
});
</script>
<style lang="scss" scoped>
$bars-height: 56px;

.epub-viewer {
  position: fixed;
  top: $bars-height;
  // z-index: 0;
  width: 100%;
  height: calc(100% - $bars-height * 2);
}
</style>
