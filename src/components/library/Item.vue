<template>
  <ion-item-sliding>
    <ion-item
      button
      :detail="size != 'big'"
      :router-link="`/reader/${value.id}`"
    >
      <ion-thumbnail slot="start" :class="size">
        <img :src="cover" />
      </ion-thumbnail>
      <ion-label>
        <h2>{{ value.title }}</h2>
        <h3>{{ value.creator }}</h3>
        <p>{{ value.description }}</p>
      </ion-label>
    </ion-item>

    <ion-item-options side="end">
      <ion-item-option color="danger" @click="$emit('remove')">
        <ion-icon :icon="trashOutline"></ion-icon>
      </ion-item-option>
      <ion-item-option color="dark">
        <ion-icon :icon="informationOutline"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonItem,
  IonThumbnail,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from '@ionic/vue';
import { trashOutline, informationOutline } from 'ionicons/icons';
import { BookInfo } from '@derock.ir/epubjs-plus';

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
    IonItem,
    IonThumbnail,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  },
  computed: {
    cover() {
      return this.value.cover ? URL.createObjectURL(this.value.cover) : '';
    },
  },
});
</script>

<style lang="scss" scoped>
ion-thumbnail {
  width: 110px;
  height: 166px;
  &.big {
    width: 144px;
    height: 216px;
  }
  img {
    border-radius: 6px;
  }
}
h2 {
  font-family: 'Merriweather', serif;
  font-size: larger;
  font-weight: bold;
  margin-bottom: 6px;
}
h3 {
  margin-bottom: 12px;
  // font-weight: bold;
}
ion-icon {
  width: 24px;
  height: 24px;
}
</style>
