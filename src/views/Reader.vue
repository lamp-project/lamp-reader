<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <AsyncChild>
        <Reader />
      </AsyncChild>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import AsyncChild from '@/components/utils/AsyncChild.vue';
import Reader from '@/components/reader/Reader.vue';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    AsyncChild,
    Reader,
  },
});
</script>
