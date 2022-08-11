<template>
  <ul>
    <li v-for="(meaning, key) in value?.records[0].meanings" :key="key">
      <b>{{ meaning.partOfSpeech }}</b>
      <ol>
        <li v-for="(item, key) in meaning.definitions" :key="key">
          {{ item.definition }}
        </li>
      </ol>
      <br />
    </li>
  </ul>
</template>
<script lang="ts">
import { DictionaryEntry } from '@/repositories/dictionary.repository';
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
</style>
