<template>
  <a :href="`books?id=${book.id}`" class="store-item">
    <b-img rounded thumbnail :src="book.cover.medium" :alt="book.title"></b-img>
    <br />
    <!--<center>
      <kbd>{{ Math.round(book.level[level].readability) }}%</kbd>
       <br />
      Words: {{ Math.round(book.level[level].count) }}
    </center> -->
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
    // min-height: 160px;
    height: 300px;
  }
}
</style>
