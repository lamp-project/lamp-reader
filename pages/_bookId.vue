<template>
  <section class="reader">
    <ReaderLoading v-if="loading" :book="info" />
    <div v-else>
      <ReaderChapterBar :chapter="info.pagination.currentChapter" />
      <ReaderTopBar v-show="showControlls" :title="info.title" />
      <div ref="viewer" class="epub-viewer"></div>
      <ReaderBottomBar
        ref="btnBar"
        :book="info"
        @change="viewer.goTo($event)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  library,
  StatefulPaginatedEpubViewer,
} from '@lamp-project/epub-viewer';
import { Highlighter } from '~/utils/highlighter';

let viewer: StatefulPaginatedEpubViewer;

export default Vue.extend({
  layout: 'reader',
  async asyncData({ params, error }) {
    const id = params.bookId;
    const book = await library.get(id);
    if (book) {
      viewer = new StatefulPaginatedEpubViewer(book);
      // @ts-ignore
      viewer.book.spine.hooks.content.register((document, section) => {
        console.log(document, section);
        // section.output = output.replace(/ /g, '@@@');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const highlighter = new Highlighter(document.body);
        // section.contents = document;
      });
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
  }),
  computed: {
    viewer() {
      return viewer;
    },
  },
  created() {
    viewer.on('click-tap', () => (this.showControlls = !this.showControlls));
  },
  async mounted() {
    await viewer.initialize();
    this.loading = false;
    await this.$nextTick();
    await viewer.display(this.$refs.viewer);
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
