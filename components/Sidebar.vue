<template>
  <b-sidebar id="sidebar" no-header shadow>
    <template #default="{ hide }">
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">
          <b>Lamp</b>
          <small>Reader</small>
          <kbd>{{ version }}</kbd>
        </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <button class="btn-remove" @click="hide">×</button>
        </b-navbar-nav>
      </b-navbar>
      <b-list-group>
        <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
        <b-list-group-item href="#" active>
          Link with active state
        </b-list-group-item>
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled>
          Disabled link
        </b-list-group-item>
        <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
        <b-list-group-item href="#"> Link with active state </b-list-group-item>
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled>
          Disabled link
        </b-list-group-item>
      </b-list-group>
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
