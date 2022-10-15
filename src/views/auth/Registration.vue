<template>
  <ion-page>
    <ion-content>
      <form>
        <img src="@/../public/img/bulb.png" width="96" />
        <br />
        <h2>Registration</h2>
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input
            v-model="name"
            name="name"
            type="text"
            clear-input
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input
            v-model="email"
            name="email"
            type="email"
            :required="true"
            clear-input
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            v-model="password"
            name="password"
            type="password"
            :required="true"
            clear-input
          ></ion-input>
        </ion-item>
        <hr />
        <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="token = $event" />
        <ion-button @click="signup" expand="block" color="dark">
          Signup
        </ion-button>
        <hr />
        <router-link to="/login">Or login if you have an account</router-link>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/vue';
// @ts-ignore
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { Loading } from '@/utils/Loading';
import { userStore } from '@/store/user.store';
import { Toast } from '@/utils/Toast';
import { localDatabase } from '@/utils/LocalDatabase';

export default defineComponent({
  setup() {
    return {
      hCaptchaSiteKey: process.env.VUE_APP_HCAPTCHA_SITEKEY,
    };
  },
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    VueHcaptcha,
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    token: '',
  }),
  methods: {
    async signup() {
      const user = await Loading.wait('Signing up ...', async () => {
        return userStore.signup({
          name: this.name,
          email: this.email,
          password: this.password,
          token: this.token,
        });
      });
      if (user) {
        await Toast.show({
          message: `Hi ${user.name} 👋`,
          color: 'success',
          duration: 1000,
        });
        await localDatabase.open();
        this.$router.push('/tabs/home');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px;
  h2,
  ion-button,
  a {
    font-family: 'Merriweather', serif;
  }
  a {
    text-decoration: none;
    color: black;
  }
}
</style>
