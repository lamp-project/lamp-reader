<template>
  <ion-item-sliding class="item">
    <ion-item button :detail="size != 'big'" :router-link="to">
      <ion-thumbnail slot="start" :class="size">
        <img :src="cover" />
      </ion-thumbnail>
      <ion-label>
        <slot name="content" />
      </ion-label>
    </ion-item>
    <ion-item-options side="end">
      <slot name="options" />
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
} from '@ionic/vue';

export default defineComponent({
  props: {
    size: String,
    to: String,
    cover: String,
  },
  components: {
    IonItem,
    IonThumbnail,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
  },
});
</script>

<style lang="scss">
.item {
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
}
</style>
