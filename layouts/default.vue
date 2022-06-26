<template>
  <div>
    <Navbar>
      <b-button v-b-toggle.sidebar variant="light">
        <img src="~/assets/img/bulb.png" height="36" />
      </b-button>
    </Navbar>
    <Sidebar />
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
