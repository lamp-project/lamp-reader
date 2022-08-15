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
          <ion-icon :icon="cloudDownloadOutline"></ion-icon>&nbsp;
          <ion-label>Sync Words</ion-label>
        </ion-item>
        <ion-item button detail @click="showAbout">
          <ion-icon :icon="informationCircleOutline"></ion-icon>&nbsp;
          <ion-label>About</ion-label>
        </ion-item>
        <ion-item button detail @click="signOut">
          <ion-icon :icon="walkOutline"></ion-icon>&nbsp;
          <ion-label>Sign Out</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-badge color="light"> v{{ version }} </ion-badge>
    <AboutModal ref="aboutModal" />
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
import {
  closeOutline,
  cloudDownloadOutline,
  walkOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { Loading } from '@/utils/Loading';
import { userWordRepository } from '@/repositories/user-word.repository';
import { backend } from '@/utils/Backend';
import AboutModal from './About.vue';

export default defineComponent({
  setup() {
    return {
      version: process.env.VUE_APP_VERSION,
      closeOutline,
      cloudDownloadOutline,
      walkOutline,
      informationCircleOutline,
    };
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
    AboutModal,
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
    async showAbout() {
      this.$el.close();
      // @ts-ignore
      await this.$refs.aboutModal.open();
    },
    async signOut() {
      await this.$el.close();
      backend.signOut();
      this.$router.push({ name: 'Login' });
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
