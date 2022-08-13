<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> <ion-icon :icon="homeOutline" /> Home </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <AsyncChild>
        <UserStatusCard />
        <LearningWordsCard />
      </AsyncChild>
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
import AsyncChild from '@/components/utils/AsyncChild.vue';
import UserStatusCard from '@/components/tabs/home/UserStatusCard.vue';
import LearningWordsCard from '@/components/tabs/home/LearningWordsCard.vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    UserStatusCard,
    LearningWordsCard,
    AsyncChild,
  },
  setup() {
    return {
      homeOutline,
    };
  },
});
</script>

