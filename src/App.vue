<template>
  <ion-app id="main-content">
    <ion-router-outlet />
  </ion-app>
  <Menu />
  <DictionaryImporter ref="dictionaryImporter" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from '@/components/menu/Menu.vue';
import DictionaryImporter from '@/components/dictionary/Importer.vue';
import { userStore } from './store/user.store';
import { app } from '@/main';

export default defineComponent({
  setup() {
    return {
      user: userStore.user,
    };
  },
  components: {
    IonApp,
    IonRouterOutlet,
    Menu,
    DictionaryImporter,
  },
  async mounted() {
    app.config.globalProperties.dictionaryImporter =
      this.$refs.dictionaryImporter;
  },
});
</script>
