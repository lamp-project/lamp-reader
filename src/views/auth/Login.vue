<template>
  <ion-page>
    <ion-content>
      <form @submit="login($event)">
        <img src="@/../public/img/logo.png" width="96" />
        <br />
        <h2>Login</h2>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" name="email" type="email" :required="true" clear-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" name="password" type="password" :required="true" clear-input></ion-input>
        </ion-item>
        <hr />
        <ion-button type="submit" expand="block" color="dark">
          Login
        </ion-button>
        <hr />
        <router-link to="/registration">Or create a new account</router-link>
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
import { userStore } from '@/store/user.store';
import { Toast } from '@/utils/Toast';
import { localDatabase } from '@/utils/LocalDatabase';

export default defineComponent({
  components: { IonPage, IonContent, IonButton, IonItem, IonInput, IonLabel },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async login(event: Event) {
      event.stopPropagation();
      event.preventDefault();
      const user = await Loading.wait('Logging in ...', async () => {
        const user = await userStore.login({
          email: this.email,
          password: this.password,
        });
        // await userWordStore.syncUserWords();
        return user;
      });
      await Toast.show({
        message: `Hi ${user?.name} 👋`,
        color: 'success',
        duration: 1000,
      });
      await localDatabase.open();
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
