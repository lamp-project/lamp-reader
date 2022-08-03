<template>
  <ion-list>
    <ion-list-header>Latest Books</ion-list-header>
    <Item v-for="{ node } in page?.edges" :key="node.id" :value="node" />
  </ion-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonListHeader, IonList } from '@ionic/vue';
import { PaginatedBook } from 'types/backend';
import Item from './Item.vue';

export default defineComponent({
  async setup() {
    const { bookRepository } = await import('@/repositories/book.repository');
    const page = ref<PaginatedBook>();
    page.value = await bookRepository.findMany({});
    return {
      bookRepository,
      page,
    };
  },
  components: {
    IonList,
    IonListHeader,
    Item,
  },
  computed: {},
  methods: {},
});
</script>
