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
export default Vue.extend({
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
