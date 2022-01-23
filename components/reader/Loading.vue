<template>
  <center class="loading">
    <div>
      <b-img
        center
        thumbnail
        :src="createObjectURL(book.cover)"
        alt="Center image"
      ></b-img>
      <br />
      <b-spinner small></b-spinner>
    </div>
    <br />
  </center>
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
  methods: {
    createObjectURL: URL.createObjectURL,
  },
});
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  img {
    height: 75vh;
    filter: grayscale(100%);
  }
}
</style>
