<template>
  <b-navbar class="chapter-bar" fixed="top">
    <b-navbar-nav>
      <b-nav-item>
        <small>{{ chapter }}</small>
      </b-nav-item>
    </b-navbar-nav>
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
    chapter: { type: String, default: '' },
  },
});
</script>
<style lang="scss" scoped>
.chapter-bar {
  justify-content: center;
}
</style>
