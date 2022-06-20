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
        <b-list-group-item to="/store" @click="hide">
          <img src="~assets/icons/store.svg" height="24" alt="book store" />
          Book Store
        </b-list-group-item>
        <b-list-group-item to="/" @click="hide">
          <img src="~assets/icons/book.svg" height="24" alt="library" />
          Library
        </b-list-group-item>
        <b-list-group-item to="#" @click="importFromFile">
          <img src="~assets/icons/import.svg" height="24" alt="import" />
          Import Epub
        </b-list-group-item>
        <b-list-group-item v-b-modal.about-modal to="#">
          <img src="~assets/icons/info.svg" height="24" alt="about" />
          About
        </b-list-group-item>
        <b-list-group-item to="#" @click="logoutAndReditect">
          <img src="~assets/icons/logout.svg" height="24" alt="about" />
          Logout
        </b-list-group-item>
      </b-list-group>
      <!-- /Menue -->
      <!-- Footer -->
      <b-navbar toggleable="lg" fixed="bottom">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <small>
            <kbd>v{{ version }}</kbd>
          </small>
        </b-navbar-nav>
      </b-navbar>
      <!-- /Footer -->
      <AboutModal />
    </template>
  </b-sidebar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { library } from '@derock.ir/epubjs-plus';
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
  methods: {
    ...mapActions({ logout: 'user/logout' }),
    async importFromFile() {
      await library.addFromFileDialog();
      this.$router.push('/');
    },
    logoutAndReditect() {
      this.logout();
      this.$router.push('login');
    },
  },
});
</script>
<style lang="scss">
.btn-remove {
  background-color: unset;
  border: none;
  font-size: 1.5rem;
}
</style>
