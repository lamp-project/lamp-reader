<template>
  <a :href="`/book?id=${book.id}`" class="store-item">
    <b-img rounded thumbnail :src="book.cover.medium" :alt="book.title"></b-img>
    <br />
  </a>
</template>
<script lang="ts">
import Vue from 'vue';
import { BImg } from 'bootstrap-vue';

export default Vue.extend({
  components: { BImg },
  props: {
    book: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: String,
      default: 'A1',
    },
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss">
.store-item {
  margin-right: 12px;
  display: inline-block;
  img {
    margin: 6px;
    height: 300px;
  }
}
</style>
