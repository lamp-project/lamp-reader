<template>
  <Item :to="`/reader/${value.id}`" :cover="cover" :size="size">
    <template #label>
      <h2>{{ value.title }}</h2>
      <h3>{{ value.creator }}</h3>
      <p>{{ value.description }}</p>
      <hr />
      <ion-badge color="light">{{ percentage }}% read</ion-badge>
    </template>
    <template v-if="size != 'big'" #options>
      <ion-item-option color="danger" @click="remove">
        <ion-icon :icon="trashOutline"></ion-icon>
      </ion-item-option>
      <ion-item-option
        v-if="/^\d+$/.test(value.id)"
        color="dark"
        @click="showDetails"
      >
        <ion-icon :icon="informationOutline"></ion-icon>
      </ion-item-option>
    </template>
  </Item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BookInfo } from '@derock.ir/epubjs-plus';
import { IonItemOption, IonBadge, IonIcon } from '@ionic/vue';
import { trashOutline, informationOutline } from 'ionicons/icons';
import Item from '@/components/utils/Item.vue';

export default defineComponent({
  setup() {
    return { trashOutline, informationOutline };
  },
  emits: ['remove'],
  props: {
    size: {
      default: 'small' as 'big' | 'small',
    },
    value: {
      default: {} as BookInfo,
    },
  },
  components: {
    IonItemOption,
    IonBadge,
    IonIcon,
    Item,
  },
  computed: {
    cover() {
      return this.value.cover ? URL.createObjectURL(this.value.cover) : '';
    },
    percentage() {
      return (
        (this.value.pagination.currentLocation?.end.percentage || 0) * 100
      ).toFixed();
    },
  },
  methods: {
    showDetails() {
      this.$router.push(`/book/${this.value.id}`);
      this.$el.close();
    },
    remove() {
      this.$emit('remove');
      this.$el.close();
    },
  },
});
</script>
