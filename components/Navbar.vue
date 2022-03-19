<template>
  <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
    <b-container>
      <b-navbar-brand href="/">
        <!-- <img
          src="~/assets/img/bulb.png"
          alt="Brand"
          class="d-inline-block align-center"
          height="36"
        /> -->
        <b>Lamp</b>
        <small>Reader</small>
        <kbd>{{ version }}</kbd>
      </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <slot />
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { BNavbar, BContainer, BNavbarBrand, BNavbarNav } from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BNavbar,
    BContainer,
    BNavbarBrand,
    BNavbarNav,
  },
  data: () => ({
    version: process.env.VERSION,
  }),
});
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 1.9em;
  small {
    font-weight: 100;
  }
  kbd {
    font-size: 0.3em;
    background-color: black;
  }
}
</style>
