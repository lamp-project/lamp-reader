<template>
  <b-modal id="styles-modal" size="sm" title="View Styles" centered>
    <h6>Font Size:</h6>
    <b-form-select v-model="fontSize" :options="fontSizeOptions"></b-form-select>
  </b-modal>
</template>
<script lang="ts">
import Vue from 'vue';
import { BModal } from 'bootstrap-vue';
export default Vue.extend({
  components: {
    BModal,
  },
  data: () => ({
    fontSize: localStorage.getItem('font-size') || '24',
    fontSizeOptions: [
      {value: '18', text: 'Small'},
      {value: '24', text: 'Medium'},
      {value: '32', text: 'Large'},
    ]
  }),
  watch: {
    fontSize(value: string) {
      this.$emit('font-size-changed', value);
    }
  }
});
</script>
