<template>
  <ion-page>
    <ion-content>
      <form>
        <img src="/img/bulb.png" width="96" />
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
        <ion-button @click="login" expand="block" color="dark">
          Signup
        </ion-button>
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { Loading } from '@/utils/Loading';
import { backend } from '@/utils/Backend';
import { Toast } from '@/utils/Toast';

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
    async login() {
      const user = await Loading.wait('Logging in ...', async () => {
        return backend.login({
          email: this.email,
          password: this.password,
        });
      });
      await Toast.show({
        message: `Hi ${user?.name} 👋`,
        color: 'success',
        duration: 1000,
      });
      this.$router.push('/tabs/home');
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
  ion-button {
    font-family: 'Merriweather', serif;
  }
}
</style>
