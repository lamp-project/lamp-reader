<template>
  <div>
    <h2><b>Book Store</b></h2>
    <hr />
    <br />
    <div v-for="level in levels" :key="level">
      <h3>Level {{ level }}</h3>
      <hr />
      <vue-horizontal snap="start">
        <StoreItem v-for="book in topTenOfLevels[level]" :key="book.id" :book="book" />
      </vue-horizontal>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueHorizontal from 'vue-horizontal';

export default Vue.extend({
  components: {
    VueHorizontal,
  },
  // layout: 'library',
  middleware: ['auth'],
  async asyncData({ store }) {
    const topTenOfLevels = await store.dispatch('book/getTopTenOfLevels');
    return {
      topTenOfLevels,
    };
  },
  data: () => ({
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  }),
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
