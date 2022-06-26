<template>
  <div>
    <h2><b>Book Store</b></h2>
    <hr />
    <br />
    <div v-for="level in levels" :key="level">
      <div class="level-header">
        <h3>Level {{ level }}</h3>
        <a :href="`./books?level=${level}`">More</a>
      </div>
      <hr />
      <div class="horizontal-list">
        <StoreItem
          v-for="book in topTenOfLevels[level]"
          :key="book.id"
          :book="book"
        />
      </div>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
.horizontal-list {
  overflow-x: scroll;
  white-space: nowrap;
}
.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
