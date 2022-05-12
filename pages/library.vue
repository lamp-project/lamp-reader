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
    <b-row v-else class="library" cols="1" cols-md="2">
      <b-col v-if="currentReading">
        <h3><b>Current Reading</b></h3>
        <hr />
        <LibraryItem :book="currentReading" headline />
        <br />
      </b-col>
      <b-col>
        <h3><b>My Books</b></h3>
        <hr />
        <LibraryItem v-for="item in items" :key="item.id" :book="item" />
      </b-col>
    </b-row>
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
