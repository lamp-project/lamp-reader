<template>
  <ion-card color="primary" class="user-status">
    <ion-card-header>
      <ion-row>
        <ion-col>
          <ion-avatar>
            <img src="/img/gamer.png" />
          </ion-avatar>
        </ion-col>
        <ion-col size-xs="8" size-sm="9" size-md="10" size-lg="10" size-xl="11">
          <ion-card-subtitle>Hi Sajjad 👋</ion-card-subtitle>
          <h1>Pre Advanced</h1>
          1753 <small>words</small>
        </ion-col>
      </ion-row>
    </ion-card-header>
    <ion-card-content> </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonAvatar,
} from '@ionic/vue';

export default defineComponent({
  props: {
    size: { type: String },
  },
  components: {
    IonCard,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonAvatar,
  },
});
</script>
<style lang="scss" scoped>
ion-thumbnail {
  width: 55px;
  height: 83px;
  &.big {
    width: 144px;
    height: 216px;
  }
  img {
    border-radius: 6px;
  }
}
</style>
<style scoped>
.user-status h1 {
  font-family: 'Merriweather', serif;
}
ion-avatar {
  width: 96px;
  height: 96px;
}
</style>
