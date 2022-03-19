<template>
  <b-modal id="view-styles" size="sm" title="View Style" hide-footer centered>
    <b-form-checkbox switch size="lg">Dark mod</b-form-checkbox>
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue';
import { BModal, BFormCheckbox } from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BModal,
    BFormCheckbox,
  },
});
</script>
