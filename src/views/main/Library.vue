<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> <ion-icon :icon="libraryOutline" /> Library </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <AsyncChild>
        <LibraryItemsList />
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
import { libraryOutline } from 'ionicons/icons';
import AsyncChild from '@/components/utils/AsyncChild.vue';
import LibraryItemsList from '@/components/library/ItemsList.vue';

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    AsyncChild,
    LibraryItemsList,
  },
  setup() {
    return {
      libraryOutline,
    };
  },
});
</script>

