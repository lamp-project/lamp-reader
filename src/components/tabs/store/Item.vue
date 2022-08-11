<template>
  <Item
    :to="{ name: 'book', params: { id: value.id, title: value.title } }"
    :cover="value.cover.medium"
    :size="size"
  >
    <template #content>
      <h2>{{ value.title }}</h2>
      <h3>{{ creator }}</h3>
      <p>{{ value.description }}</p>
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
  computed: {
    creator() {
      const [author] = this.value.persons.filter(
        (person) => person.role == 'AUTHOR'
      );
      return author?.person?.name;
    },
  },
});
</script>
