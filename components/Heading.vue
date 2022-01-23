<template>
  <section>
    <component :is="type"> {{ title }} </component>
    <hr />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  // eslint-disable-next-line vue/require-prop-types
  props: ['type', 'title'],
});
</script>
