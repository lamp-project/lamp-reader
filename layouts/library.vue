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
import Vue from 'vue';
import { library } from '~/utils/library/Library';

export default Vue.extend({
  methods: {
    addFromFile() {
      library.importEpubFromFileDialog();
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
