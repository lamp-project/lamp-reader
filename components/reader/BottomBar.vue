<template>
  <b-navbar class="bottom-bar" variant="light" fixed="bottom">
    <b-navbar-nav>
      <b-nav-item @click="changePage">
        <small>
          <b>{{ percentage }}</b>%
        </small>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="leftPagesOfTheChapter > 0" right>
        <small>{{ leftPagesOfTheChapter }} pages left in this chapter</small>
      </b-nav-item>
      <b-nav-item v-else right>
        <small>last page of this chapter</small>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    book: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    leftPagesOfTheChapter() {
      const displayed = this.book.pagination.currentLocation?.end.displayed;
      return displayed ? displayed.total - displayed.page : -1;
    },
    percentage() {
      return (
        (this.book.pagination.currentLocation?.end.percentage || 0) * 100
      ).toFixed();
    },
  },
  methods: {
    changePage() {
      const input = prompt('Please enter page number');
      const currentPage = parseInt(input);
      if (isNaN(currentPage)) {
        alert(`Wrong input: ${input}`);
      } else {
        this.$emit('change', this.book.pagination.pages[currentPage - 1]);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.bottom-bar {
  background-color: unset !important;
}
</style>
