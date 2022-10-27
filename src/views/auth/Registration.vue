<template>
  <ion-page>
    <ion-content>
      <form @submit="signup($event)">
        <img src="@/../public/img/logo.png" width="96" />
        <br />
        <h2>Registration</h2>
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" name="name" type="text" :minlength="3" :required="true" clear-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" name="email" type="email" :required="true" clear-input></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" name="password" type="password" :minlength="9" :required="true" clear-input>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-checkbox slot="start" :checked="confirmed" @ion-change="confirmed = !confirmed" color="dark">
          </ion-checkbox>
          <ion-label>I agree to the privacy policy.</ion-label>
        </ion-item>
        <ion-button type="submit" expand="block" color="dark" :disabled="!confirmed">
          Signup
        </ion-button>
        <hr />
        <router-link to="/login">Or login if you have an account</router-link>
      </form>
      <div class="bottom-centered">
        <!-- <ion-button fill="clear">Terms Of Service</ion-button>
        | -->
        <ion-button fill="clear" @click="showPrivacyPolicy">Privacy Policy</ion-button>
      </div>
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
  IonLabel, IonCheckbox,
} from '@ionic/vue';
import { Loading } from '@/utils/Loading';
import { userStore } from '@/store/user.store';
import { Toast } from '@/utils/Toast';
import { localDatabase } from '@/utils/LocalDatabase';
import { app } from '@/main';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonItem,
    IonInput,
    IonLabel, IonCheckbox,
  },
  data: () => ({
    confirmed: true,
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    async showPrivacyPolicy() {
      await app.config.globalProperties.privacyPolicyModal.open();
    },
    async signup(event: Event) {
      event.stopPropagation();
      event.preventDefault();
      const user = await Loading.wait('Signing up ...', async () => {
        return userStore.signup({
          name: this.name,
          email: this.email,
          password: this.password,
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

.bottom-centered {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-family: "Merriweather", serif;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
