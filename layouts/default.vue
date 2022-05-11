<template>
  <div>
    <Sidebar />
    <Navbar />
    <br />
    <b-container>
      <Nuxt />
    </b-container>
  </div>
</template>

<script lang="ts">
import { BContainer } from 'bootstrap-vue';
import Vue from 'vue';

export default Vue.extend({
  components: {
    BContainer,
  },
});
</script>

<style lang="scss">
body {
  margin-top: 72px;
}
</style>
