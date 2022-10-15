<template>
  <span>{{ text }}</span>
  <span v-if="text.length < value.length || showAll">
    <a
      v-if="showAll"
      @click="
        showAll = !showAll;
        $event.preventDefault();
      "
      href="#"
    >
      Show less.
    </a>
    <a
      v-else
      @click="
        showAll = !showAll;
        $event.preventDefault();
      "
      href="#"
    >
      read more ...
    </a>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      default: '',
    },
    size: {
      default: 50,
    },
  },
  data: () => ({
    showAll: false,
  }),
  computed: {
    text() {
      if (this.showAll) {
        return this.value;
      } else {
        return this.value.split(' ').slice(0, this.size).join(' ');
      }
    },
  },
});
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
