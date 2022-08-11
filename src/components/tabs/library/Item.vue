<template>
  <Item :to="`/reader/${value.id}`" :cover="cover" :size="size">
    <template #content>
      <h2>{{ value.title }}</h2>
      <h3>{{ value.creator }}</h3>
      <p>{{ value.description }}</p>
    </template>
    <template #options>
      <ion-item-option color="danger" @click="$emit('remove')">
        <ion-icon :icon="trashOutline"></ion-icon>
      </ion-item-option>
      <ion-item-option color="dark">
        <ion-icon :icon="informationOutline"></ion-icon>
      </ion-item-option>
    </template>
  </Item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BookInfo } from '@derock.ir/epubjs-plus';
import { IonItemOption, IonIcon } from '@ionic/vue';
import { trashOutline, informationOutline } from 'ionicons/icons';
import Item from '@/components/utils/Item.vue';

export default defineComponent({
  setup() {
    return { trashOutline, informationOutline };
  },
  emits: ['remove', 'info'],
  props: {
    size: String,
    value: {
      default: {} as BookInfo,
    },
  },
  components: {
    IonItemOption,
    IonIcon,
    Item,
  },
  computed: {
    cover() {
      return this.value.cover ? URL.createObjectURL(this.value.cover) : '';
    },
  },
});
</script>
