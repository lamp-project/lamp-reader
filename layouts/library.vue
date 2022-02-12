<template>
  <div class="library">
    <Navbar>
      <b-button size="lg" variant="light" @click="addFromFile">
        <img src="~assets/icons/import.svg" class="icon x2" alt="">
      </b-button>
    </Navbar>
    <br />
    <b-container>
      <Nuxt />
    </b-container>
  </div>
</template>

<script lang="ts">
import { library } from '@lamp-project/epub-viewer';
import Vue from 'vue';

export default Vue.extend({
  methods: {
    addFromFile() {
      library.addFromFileDialog();
    },
  },
});
</script>

<style lang="scss" scoped>
.library {
  margin-top: 72px;
}
center {
  .btn {
    margin: 3px;
  }
}
</style>
