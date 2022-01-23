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
        <h3><b>Library</b></h3>
        <hr />
        <LibraryItem v-for="item in items" :key="item.id" :book="item" />
      </b-col>
    </b-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { library } from '~/utils/library/Library';

async function fetchLibraryData() {
  const items = await library.all();
  const currentReadingId = await library.getCurrentReadingId();
  return {
    items,
    currentReading: items.filter(({ id }) => id === currentReadingId)[0] || '',
  };
}

export default Vue.extend({
  layout: 'library',
  asyncData() {
    return fetchLibraryData();
  },
  mounted() {
    library.on('update', this.reloadData.bind(this));
  },
  // beforeDestroy() {
  //   library.removeListener('update',this.reloadData.bind(this));
  // },
  methods: {
    async reloadData() {
      const { items, currentReading } = await fetchLibraryData();
      this.items = items;
      this.currentReading = currentReading;
    },
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
