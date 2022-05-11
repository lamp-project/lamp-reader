<template>
  <div>
    <b-img
      rounded
      thumbnail
      class="store-item"
      :src="book.cover.medium"
      :alt="book.title"
      @click="$router.push(book.id)"
    ></b-img>
    <br />
    <!--<center>
      <kbd>{{ Math.round(book.level[level].readability) }}%</kbd>
       <br />
      Words: {{ Math.round(book.level[level].count) }}
    </center> -->
  </div>
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
  margin: 6px;
  height: 150px;
}
</style>
