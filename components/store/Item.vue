<template>
  <b-img-lazy
    rounded
    thumbnail
    class="store-item"
    :src="book.cover.medium"
    :alt="book.title"
    @click="$router.push(book.id)"
  ></b-img-lazy>
</template>
<script lang="ts">
import Vue from 'vue';
import { BImgLazy } from 'bootstrap-vue';

export default Vue.extend({
  components: { BImgLazy },
  props: {
    book: {
      type: Object,
      default: () => ({}),
    },
    headline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss">
.store-item {
  margin: 6px;
  height: 150px;;
}
</style>
