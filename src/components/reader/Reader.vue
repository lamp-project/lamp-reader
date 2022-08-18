<template>
  <LoadingScreen v-if="loading" :value="book" />
  <ion-page v-else>
    <Header
      :chapter="book?.chapter"
      :showControlls="showControlls"
      :viewer="viewer"
    />
    <ion-content :fullscreen="true">
      <div ref="viewerElement" class="epub-viewer"></div>
    </ion-content>
    <Footer :location="book?.location" :viewer="viewer"/>
  </ion-page>
  <WordModal ref="wordModal" @review="updateUserWord" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import LoadingScreen from './LoadingScreen.vue';
import WordModal from '@/components/review/WordModal.vue';
import { UserWord } from 'types/backend';
import { userWordStore } from '@/store/user-word.store';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { libraryStore } from '@/store/library.store';

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
    const viewer = await libraryStore.read(params.id as string);
    const showControlls = ref(false);
    viewer.on('click-tap', () => {
      showControlls.value = !showControlls.value;
    });
    return {
      book: libraryStore.activeItem,
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
  },
  data: () => ({
    loading: false,
  }),
  async mounted() {
    this.loading = true;
    await this.viewer.initialize(this.userWords);
    this.loading = false;
    await this.$nextTick();
    await this.viewer.display(this.$refs.viewerElement as Element);
    this.viewer.on('word-click', (element: HTMLSpanElement) => {
      // @ts-ignore
      this.$refs.wordModal.open({
        wordId: element.getAttribute('word'),
        status: element.getAttribute('status'),
      });
    });
  },
  beforeUnmount() {
    this.viewer.destroy();
  },
  methods: {
    updateUserWord(userWord: UserWord) {
      this.viewer.updateWordStatus(userWord);
    },
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
