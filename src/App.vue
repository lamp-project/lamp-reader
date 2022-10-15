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
import { User } from 'types/backend';
import { dictionaryRepository } from './repositories/dictionary.repository';
import { app } from '@/main';
import { userWordStore } from './store/user-word.store';

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
  watch: {
    async user(value: User | undefined) {
      if (value) {
        await dictionaryRepository.initialise();
        if (userWordStore.userWords.value.length == 0) {
          await userWordStore.syncUserWords();
        }
      }
    },
  },
  async mounted() {
    app.config.globalProperties.dictionaryImporter =
      this.$refs.dictionaryImporter;
    // await dictionaryRepository.initialise();
  },
});
</script>
