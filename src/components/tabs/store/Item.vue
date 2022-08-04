<template>
  <Item :to="`/book/${value.id}`" :cover="value.cover.medium" :size="size">
    <template #content>
      <h2>{{ value.title }}</h2>
    </template>
  </Item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Book } from 'types/backend';
import Item from '@/components/utils/Item.vue';

export default defineComponent({
  props: {
    size: String,
    value: {
      default: {} as Book,
    },
  },
  components: {
    Item,
  },
});
</script>
