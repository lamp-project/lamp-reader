<template>
  <ion-header>
    <Toolbar>
      <template #start>
        <ion-back-button defaultHref="/tabs/library"></ion-back-button>
      </template>
      <template #middle>
        <ion-title class="ion-text-center" v-show="chapter != `Titlepage`">
          {{ chapter }}
        </ion-title>
      </template>
      <template #end>
        <ion-button>
          <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
        </ion-button>
      </template>
    </Toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonHeader,
  IonTitle,
  IonButton,
  IonBackButton,
  IonIcon,
} from '@ionic/vue';
import { settingsOutline } from 'ionicons/icons';
import Toolbar from '@/components/utils/Toolbar.vue';

export default defineComponent({
  setup() {
    return {
      // ICONS
      settingsOutline,
    };
  },
  props: {
    chapter: String,
    showControlls: Boolean,
  },
  components: {
    Toolbar,
    IonHeader,
    IonTitle,
    IonButton,
    IonBackButton,
    IonIcon,
  },
  computed: {
    controlsOpacity() {
      return this.showControlls ?  0.66 : 0;
    },
  },
});
</script>
<style scoped>
ion-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.66);
}
ion-button,
ion-back-button {
  opacity: v-bind('controlsOpacity') !important;
}
.header-md::after {
  display: none;
}
</style>
