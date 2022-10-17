<template>
  <ion-modal>
    <ion-header>
      <ion-toolbar>
        <ion-title>About</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$el.dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-text-center">
      <div>
        <div class="container">
          <img src="@/../public/img/logo.png" width="96" />
          <h1>
            <b>Zaban<span>Asly</span></b>
          </h1>
          <b>Author:</b> Sajjad Shirazy
          <hr />
          <div class="socials">
            <a target="_blank" href="https://github.com/lamp-project">
              <ion-icon :icon="logoGithub"></ion-icon>
            </a>
            <a href="mailto:shirazy.sajjad@gmail.com">
              <ion-icon :icon="mailOutline"></ion-icon>
            </a>
            <!-- <a target="_blank" href="https://instagram.com">
              <ion-icon :icon="logoInstagram"></ion-icon>
            </a>
            <a target="_blank" href="https://twitter.com">
              <ion-icon :icon="logoTwitter"></ion-icon>
            </a> -->
          </div>
          <ion-badge color="light">Version: v{{ version }}</ion-badge>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonBadge,
  IonIcon,
} from '@ionic/vue';
import {
  logoGithub,
  logoInstagram,
  logoTwitter,
  mailOutline,
} from 'ionicons/icons';

export default defineComponent({
  setup() {
    return {
      logoGithub,
      logoInstagram,
      logoTwitter,
      mailOutline,
      version: process.env.VUE_APP_VERSION,
    };
  },
  components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonBadge,
    IonIcon,
  },
  methods: {
    async open() {
      await this.$el.present();
    },
  },
});
</script>
<style lang="scss" scoped>
ion-content > div {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  .container {
    transform: translateY(-33%);
  }
}
h1 {
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
.socials {
  a {
    font-size: 2em;
    margin: 6px;
    color: black;
  }
}
</style>
