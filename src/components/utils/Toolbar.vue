<template>
  <ion-toolbar>
    <ion-buttons slot="start">
      <slot name="start"></slot>
    </ion-buttons>
    <slot name="middle"></slot>
    <ion-buttons slot="end">
      <slot name="end"></slot>
    </ion-buttons>
  </ion-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonToolbar, IonButtons } from '@ionic/vue';

export default defineComponent({
  components: {
    IonToolbar,
    IonButtons,
  },
});
</script>
