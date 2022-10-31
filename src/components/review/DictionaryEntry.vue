<template>
  <ul>
    <li v-for="(definitions, POS) in value?.definitions" :key="POS">
      <b>{{ POS }}</b>
      <ol>
        <li v-for="(item, key) in definitions" :key="key">
          {{ item }}
        </li>
      </ol>
      <br />
    </li>
  </ul>
</template>
<script lang="ts">
import { DictionaryEntry } from '@/utils/LocalDatabase';
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    value: {
      default: undefined as DictionaryEntry | undefined,
    },
  },
});
</script>
<style lang="scss" scoped>
ul {
  padding-left: 24px;
}

ol {
  padding-top: 6px !important;
  padding-left: 12px !important;
}
</style>
