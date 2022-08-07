<template>
  <ion-page>
    <ion-content>
      <form>
        <img src="/img/bulb.png" width="96" />
        <br />
        <h2>Login</h2>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input
            v-model="email"
            name="email"
            type="email"
            clear-input
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            v-model="password"
            name="password"
            type="password"
            clear-input
          ></ion-input>
        </ion-item>
        <hr />
        <ion-button @click="login" expand="block" color="dark">
          Login
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
import { Loading } from '@/utils/Loading';
import { backend } from '@/utils/Backend';

export default defineComponent({
  components: { IonPage, IonContent, IonButton, IonItem, IonInput, IonLabel },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async login() {
      await Loading.wait('Logging in ...', async () => {
        const user = await backend.login({
          email: this.email,
          password: this.password,
        });
        console.log(user);
      });
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
  padding: 12px;
  h2,
  ion-button {
    font-family: 'Merriweather', serif;
  }
}
</style>
