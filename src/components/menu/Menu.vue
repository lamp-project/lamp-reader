<template>
  <ion-menu side="start" content-id="main-content">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>
          <b>Lamp<span>Reader</span></b>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$el.close()">
            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button detail @click="syncWords">
          <ion-icon :icon="syncOutline"></ion-icon>&nbsp;
          <ion-label>Sync Words</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-badge color="light"> v{{ version }} </ion-badge>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonButton,
  IonButtons,
  IonBadge,
  IonIcon,
  IonLabel,
} from '@ionic/vue';
import { closeOutline, syncOutline } from 'ionicons/icons';
import { Loading } from '@/utils/Loading';
import { userWordRepository } from '@/repositories/user-word.repository';

export default defineComponent({
  setup() {
    return { closeOutline, syncOutline, version: process.env.VUE_APP_VERSION };
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenu,
    IonList,
    IonItem,
    IonButton,
    IonButtons,
    IonBadge,
    IonIcon,
    IonLabel,
  },
  methods: {
    async syncWords() {
      await this.$el.close();
      await Loading.wait(
        'Syncing Words ...',
        async () => {
          await userWordRepository.getUserWords();
        },
        'UserWords successfully synced.'
      );
    },
  },
});
</script>
<style lang="scss" scoped>
ion-title {
  b {
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: black;
    font-size: 1.1em;
    span {
      font-weight: 300;
    }
  }
}
ion-badge {
  font-weight: 300;
  padding: 12px;
  padding-right: 24px;
  color: grey;
  text-align: right;
}
</style>
