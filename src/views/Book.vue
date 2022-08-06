<template>
  <ion-page>
    <ion-header>
      <Toolbar>
        <template #start>
          <ion-back-button default-href="/tabs/store"></ion-back-button>
        </template>
        <template #middle>
          <!-- <ion-title>{{ $route.params.title }}</ion-title> -->
          <ion-title>Details</ion-title>
        </template>
      </Toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <AsyncChild>
        <Details />
      </AsyncChild>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonBackButton,
  IonContent,
} from '@ionic/vue';
import AsyncChild from '@/components/utils/AsyncChild.vue';
import Toolbar from '@/components/utils/Toolbar.vue';
import Details from '@/components/book/Details.vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonBackButton,
    IonContent,
    AsyncChild,
    Toolbar,
    Details,
  },
});
</script>
<style lang="scss" scoped>
ion-title {
  font-family: var(--ion-font-family, inherit);
}
</style>
