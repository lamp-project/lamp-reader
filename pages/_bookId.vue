<template>
  <section class="reader">
    <ReaderLoading v-if="loading" :book="info" />
    <div v-if="initialised">
      <ReaderChapterBar :chapter="info.pagination.currentChapter" />
      <ReaderTopBar v-show="showControlls" :title="info.title" />
      <div ref="viewer" class="epub-viewer"></div>
      <ReaderBottomBar
        ref="btnBar"
        :book="info"
        @change="viewer.goTo($event)"
      />
    </div>
    <ReaderWordModal ref="wordModal" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { library } from '@lamp-project/epub-viewer';
import { HighlighterViewer } from '~/utils/HighlighterViewer';

let viewer: HighlighterViewer;

export default Vue.extend({
  layout: 'reader',
  async asyncData({ params, error, store }) {
    const id = params.bookId;
    const book = await library.get(id);
    if (book) {
      const userWords = await store.dispatch('user-word/getUserWords');
      viewer = new HighlighterViewer(book, userWords);
      // @ts-ignore
      window.viewer = viewer;
      return { info: book.info };
    } else {
      error({ statusCode: 404, message: `${id} not found!` });
    }
  },
  data: () => ({
    showControlls: false,
    loading: true,
    initialised: false,
  }),
  computed: {
    viewer() {
      return viewer;
    },
  },
  created() {
    viewer.on('click-tap', () => (this.showControlls = !this.showControlls));
    viewer.on('word-click', (element: HTMLSpanElement) => {
      this.$refs.wordModal.open(element);
    });
  },
  async mounted() {
    await viewer.initialize();
    this.initialised = true;
    await this.$nextTick();
    await viewer.display(this.$refs.viewer);
    this.loading = false;
  },
  beforeDestroy() {
    viewer.destroy();
  },
});
</script>
<style lang="scss" scoped>
.reader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 56px;
  margin-bottom: 56px;
  font-family: Helvetica, sans-serif;
  position: fixed;
  .epub-viewer {
    position: fixed;
    // z-index: 0;
    width: 100%;
    height: calc(100% - 56px * 2);
  }
}
</style>
