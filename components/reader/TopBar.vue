<template>
  <b-navbar class="top-bar" variant="light" fixed="top">
    <b-navbar-nav>
      <b-nav-item to="/">
        <img src="~assets/icons/left.svg" class="icon faded" alt="" />
      </b-nav-item>
      <!-- <b-nav-item> {{ title }} </b-nav-item> -->
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-b-modal.styles-modal right >
        <img src="~assets/icons/gear.svg" class="icon faded" alt="" />
      </b-nav-item>
    </b-navbar-nav>
    <ReaderStylesModal @font-size-changed="$emit('font-size-changed', $event)" />
  </b-navbar>
</template>
<script lang="ts">
import Vue from 'vue';
import { BNavbar, BNavbarNav, BNavItem } from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BNavbar,
    BNavbarNav,
    BNavItem,
  },
  props: {
    book: {
      type: Object,
      default: undefined,
    },
  },
});
</script>
<style lang="scss" scoped>
.top-bar {
  background-color: unset !important;
}
</style>
