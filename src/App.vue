<template>
  <ion-app id="main-content">
    <ion-router-outlet />
  </ion-app>
  <Menu />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from '@/components/menu/Menu.vue';

export default defineComponent({
  components: {
    IonApp,
    IonRouterOutlet,
    Menu,
  },
});
</script>

