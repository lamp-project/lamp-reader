<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> <ion-icon :icon="homeOutline" /> Home </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-header> </ion-header>
    <ion-content :fullscreen="true">
      <UserStatusCard />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonContent,
} from '@ionic/vue';
import { homeOutline } from 'ionicons/icons';
import UserStatusCard from '@/components/tabs/home/UserStatusCard.vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    UserStatusCard,
  },
  setup() {
    return {
      homeOutline,
    };
  },
});
</script>

