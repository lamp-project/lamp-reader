<template>
  <article class="books">
    <h1>Level {{ level }} Books</h1>
    <hr />
    <section class="text-center">
      <StoreItem v-for="{ node: book } in edges" :key="book.id" :book="book" />
    </section>
    <hr />
    <div class="page-navigation">
      <b-button
        :href="`/books?level=${level}&before=${edges[edges.length - 1].cursor}`"
        variant="outline-primary"
        :disabled="!pageInfo.hasPreviousPage"
      >
        Prev
      </b-button>
      <b-button
        :href="`/books?level=${level}&after=${edges[edges.length - 1].cursor}`"
        variant="outline-primary"
        :disabled="!pageInfo.hasNextPage"
      >
        Next
      </b-button>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

const perPage = 8;

export default Vue.extend({
  async asyncData({ store, query }) {
    const { totalCount, pageInfo, edges } = await store.dispatch(
      'book/getBooks',
      {
        orderBy: { [`R${query.level}`]: 'DESC' },
        first: perPage,
        after: +query.after,
      }
    );
    return {
      page: query.page || 1,
      level: query.level,
      edges,
      totalCount,
      pageInfo,
    };
  },
  data: () => ({ perPage }),
  watch: {
    // async page(page) {
    //   const { totalCount, edges } = await this.$store.dispatch(
    //     'book/getBooks',
    //     {
    //       orderBy: { [`R${this.level}`]: 'DESC' },
    //       first: perPage,
    //       after:
    //     }
    //   );
    //   this.totalCount = totalCount;
    //   this.edges = edges;
    // },
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
.page-navigation {
  display: flex;
  justify-content: space-between;
}
</style>
