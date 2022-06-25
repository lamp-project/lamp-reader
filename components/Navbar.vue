<template>
  <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
    <b-container>
      <b-navbar-brand to="/store">
        <b>Lamp</b>
        <small>Reader</small>
      </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <slot />
        <b-button v-b-toggle.sidebar variant="light">
          <img src="~/assets/img/bulb.png" height="36" />
        </b-button>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  BNavbar,
  BContainer,
  BNavbarBrand,
  BNavbarNav,
  VBToggle,
} from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BNavbar,
    BContainer,
    BNavbarBrand,
    BNavbarNav,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  data: () => ({
    version: process.env.VERSION,
  }),
});
</script>

<style lang="scss">
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
