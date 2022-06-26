<template>
  <section class="reader">
    <ReaderLoading v-if="loading" :book="info" />
    <div v-if="initialised">
      <ReaderChapterBar :chapter="info.pagination.currentChapter" />
      <ReaderTopBar
        v-show="showControlls"
        :title="info.title"
        @font-size-changed="changeFontSize"
      />
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
import { library } from '@derock.ir/epubjs-plus';
import { HighlighterViewer } from '~/utils/HighlighterViewer';

let viewer: HighlighterViewer;

export default Vue.extend({
  layout: 'reader',
  async asyncData({ query, error, store }) {
    const id = query.id as string;
    const book = await library.get(id);
    if (book) {
      try {
        viewer = new HighlighterViewer(
          book,
          store.state['user-word'].userWords
        );
        // @ts-ignore
        window.viewer = viewer;
        return { info: book.info };
      } catch (error) {
        debugger;
      }
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
  methods: {
    changeFontSize(value) {
      // console.log(value);
      // console.log(this.viewer.rendition.themes.default({}));// .fontSize('12px'));
      viewer.fontSize = value;
    },
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
