<template>
  <ion-menu side="start" content-id="main-content">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>
          <b>Zaban<span>Asly</span></b>
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
        <ion-item v-if="!user" button detail @click="createAnAccount">
          <ion-icon :icon="logInOutline"></ion-icon>&nbsp;
          <ion-label>Create Account</ion-label>
        </ion-item>
        <ion-item v-if="!user" button detail @click="signIn">
          <ion-icon :icon="fingerPrintOutline"></ion-icon>&nbsp;
          <ion-label>Sign In</ion-label>
        </ion-item>
        <ion-item v-if="user" button detail @click="syncUserWords">
          <ion-icon :icon="cloudDownloadOutline"></ion-icon>&nbsp;
          <ion-label>Sync Words</ion-label>
        </ion-item>
        <ion-item button detail @click="showAbout">
          <ion-icon :icon="informationCircleOutline"></ion-icon>&nbsp;
          <ion-label>About</ion-label>
        </ion-item>
        <ion-item v-if="user" button detail @click="signOut">
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
  logInOutline,
  fingerPrintOutline,
} from 'ionicons/icons';
import { Loading } from '@/utils/Loading';
import { userStore } from '@/store/user.store';
import AboutModal from './About.vue';
import { userWordStore } from '@/store/user-word.store';

export default defineComponent({
  setup() {
    userStore.initialise();
    return {
      user: userStore.user,
      version: process.env.VUE_APP_VERSION,
      // ICONS
      closeOutline,
      cloudDownloadOutline,
      walkOutline,
      informationCircleOutline,
      logInOutline,
      fingerPrintOutline,
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
    async syncUserWords() {
      await this.$el.close();
      await userWordStore.syncUserWords();
    },
    async showAbout() {
      this.$el.close();
      // @ts-ignore
      await this.$refs.aboutModal.open();
    },
    async createAnAccount() {
      await this.$el.close();
      await this.$router.push({ name: 'Registration' });
    },
    async signIn() {
      await this.$el.close();
      await this.$router.push({ name: 'Login' });
    },
    async signOut() {
      await this.$el.close();
      await Loading.wait('Signing Out ...', async () => {
        await userStore.signOut();
      });
      await this.$router.push({ name: 'Login' });
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
