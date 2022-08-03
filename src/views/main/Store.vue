<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> <ion-icon :icon="storefrontOutline" /> Shop </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <AsyncChild>
        <List />
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
  IonContent,
  IonIcon,
} from '@ionic/vue';
import { storefrontOutline } from 'ionicons/icons';
import AsyncChild from '@/components/utils/AsyncChild.vue';
import List from '@/components/tabs/store/List.vue';

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    AsyncChild,
    List,
  },
  setup() {
    return {
      storefrontOutline,
    };
  },
});
</script>

