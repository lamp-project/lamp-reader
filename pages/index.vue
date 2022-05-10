<template>
  <section>
    <center v-if="items.length === 0">
      <br />
      <br />
      <br />
      No Item in the Libarry.
      <br />
      <small>Try to import the first one... </small>
      <br />
      <br />
      <strong>***</strong>
    </center>
    <div v-else>
      <h3><b>Book Store</b></h3>
      <hr />
      <br />
      <b-row class="library">
        <b-col v-for="{ node } in books.edges" :key="node.id"  cols="12" md="6" lg="4">
          <LibraryBook :book="node" />
        </b-col>
      </b-row>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { library } from '@derock.ir/epubjs-plus';
import { BRow, BCol } from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BRow,
    BCol,
  },
  layout: 'library',
  middleware: ['auth'],
  async asyncData({ store }) {
    const items = await library.index();
    const currentReadingId = await library.getLastBookId();
    const books = await store.dispatch('book/getBooks');
    return {
      books,
      items,
      currentReading:
        items.filter(({ id }) => id === currentReadingId)[0] || '',
    };
  },
  mounted() {
    library.on('item-added', (item) => this.items.push(item));
    library.on('item-removed', async () => {
      this.items = await library.index();
    });
  },
});
</script>

<style lang="scss" scoped>
$book_item_scale: 10;

.library {
  margin: 0;
  padding: 0;
  h4 {
    font-weight: 700;
  }
}
</style>
