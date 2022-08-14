<template>
  <ion-card color="primary" class="user-status">
    <ion-card-header>
      <ion-row>
        <ion-col>
          <ion-avatar>
            <img src="@/../public/img/gamer.png" />
          </ion-avatar>
        </ion-col>
        <ion-col size-xs="8" size-sm="9" size-md="10" size-lg="10" size-xl="11">
          <ion-card-subtitle>
            Hi <span class="user-name">{{user.name}}</span> 👋
          </ion-card-subtitle>
          <h1>{{ level }}</h1>
          {{ userWords.length }} <small>words</small>
        </ion-col>
      </ion-row>
    </ion-card-header>
    <ion-card-content> </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonAvatar,
} from '@ionic/vue';
import { userWordRepository } from '@/repositories/user-word.repository';
import { backend } from '@/utils/Backend';
import { User } from 'types/backend';

export default defineComponent({
  async setup() {
    const user = backend.authenticatedUser as User;
    const userWords = await userWordRepository.getMyUserWords();
    return {
      user,
      userWords,
    };
  },
  components: {
    IonCard,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonAvatar,
  },
  props: {
    size: { type: String },
  },
  computed: {
    level() {
      if (this.userWords.length < 500) {
        return 'Biginner';
      } else if (this.userWords.length < 1000) {
        return 'Elementry';
      } else if (this.userWords.length < 2000) {
        return 'Lower Intermediate';
      } else if (this.userWords.length < 4000) {
        return 'Upper Intermediate';
      } else if (this.userWords.length < 8000) {
        return 'Advanced';
      } else {
        return 'Fluency Level';
      }
    },
  },
});
</script>
<style lang="scss" scoped>
ion-thumbnail {
  width: 55px;
  height: 83px;
  &.big {
    width: 144px;
    height: 216px;
  }
  img {
    border-radius: 6px;
  }
}
</style>
<style scoped>
.user-status h1 {
  font-family: 'Merriweather', serif;
}
ion-avatar {
  width: 96px;
  height: 96px;
}
.user-name {
  text-transform: capitalize;
}
</style>
