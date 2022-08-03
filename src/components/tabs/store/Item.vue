<template>
  <ion-item-sliding>
    <ion-item
      button
      :detail="size != 'big'"
      :router-link="`/reader/${value.id}`"
    >
      <ion-thumbnail slot="start" :class="size">
        <img :src="value.cover.medium" />
      </ion-thumbnail>
      <ion-label>
        <h2>{{ value.title }}</h2>
      </ion-label>
    </ion-item>
  </ion-item-sliding>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonThumbnail, IonLabel, IonItemSliding } from '@ionic/vue';
import { trashOutline, informationOutline } from 'ionicons/icons';
import { Book } from 'types/backend';

export default defineComponent({
  setup() {
    return { trashOutline, informationOutline };
  },
  emits: ['remove', 'info'],
  props: {
    size: String,
    value: {
      default: {} as Book,
    },
  },
  components: {
    IonItem,
    IonThumbnail,
    IonLabel,
    IonItemSliding,
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
