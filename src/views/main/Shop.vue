<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> <ion-icon :icon="storefrontOutline" /> Shop </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <AsyncChild>
        <LibraryList />
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
import LibraryList from '@/components/tabs/shop/List.vue';

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    AsyncChild,
    LibraryList,
  },
  setup() {
    return {
      storefrontOutline,
    };
  },
});
</script>

