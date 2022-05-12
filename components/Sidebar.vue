<template>
  <b-sidebar id="sidebar" no-header shadow>
    <template #default="{ hide }">
      <!-- Header -->
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">
          <b>Lamp</b>
          <small>Reader</small>
        </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <button class="btn-remove" @click="hide">×</button>
        </b-navbar-nav>
      </b-navbar>
      <!-- /Header -->
      <!-- Menue -->
      <b-list-group>
        <b-list-group-item to="/" @click="hide">
          <img src="~assets/icons/store.svg" height="24" alt="book store">
          Book Store
        </b-list-group-item>
        <b-list-group-item to="/library" @click="hide">
          <img src="~assets/icons/library.svg" height="24" alt="library">
          Library
        </b-list-group-item>
      </b-list-group>
      <!-- /Menue -->
      <!-- Footer -->
      <b-navbar toggleable="lg" fixed="bottom">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <small><kbd>v{{ version }}</kbd></small>
        </b-navbar-nav>
      </b-navbar>
      <!-- /Footer -->
    </template>
  </b-sidebar>
</template>

<script lang="ts">
import Vue from 'vue';
import { BSidebar, BListGroup, BListGroupItem } from 'bootstrap-vue';

export default Vue.extend({
  components: {
    BSidebar,
    BListGroup,
    BListGroupItem,
  },
  data: () => ({
    version: process.env.VERSION,
  }),
});
</script>
<style lang="scss">
.btn-remove {
  background-color: unset;
  border: none;
  font-size: 1.5rem;
}
</style>
