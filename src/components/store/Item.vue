<template>
  <Item
    :to="{ name: 'book', params: { id: value.id } }"
    :cover="value.cover"
    :size="size"
  >
    <template #label>
      <h2>{{ value.title }}</h2>
      <h3>{{ value.creator }}</h3>
      <p>
        <br />
        <ion-badge :color="a1ReadabilityColor">A1:{{ value.a1Readability }}%</ion-badge>
        <br />
        <ion-badge color="dark">
          {{ shortNumber(value.wordsCount) }} words
        </ion-badge>
      </p>
    </template>
  </Item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonBadge } from '@ionic/vue';
import Item from '@/components/utils/Item.vue';
import { Book } from '@/entities/Book';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortNumber = require('short-number');

export default defineComponent({
  setup() {
    return { shortNumber };
  },
  props: {
    size: String,
    value: {
      default: {} as Book,
    },
  },
  components: {
    Item,
    IonBadge,
  },
  computed: {
    a1ReadabilityColor() {
      if (this.value.a1Readability >= 75) {
        return 'primary';
      }else if (this.value.a1Readability >= 65) {
        return 'success';
      }  else if (this.value.a1Readability >= 50) {
        return 'warning';
      } else {
        return 'danger';
      }
    },
  },
});
</script>
<style lang="scss">
ion-badge {
  font-family: monospace;
  margin-right: 6px;
}
</style>
