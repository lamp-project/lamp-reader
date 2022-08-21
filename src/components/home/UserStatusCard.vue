<template>
  <ion-card color="primary" class="user-status">
    <ion-card-header>
      <router-link :to="{ name: 'review', query: { status: 'KNOWN' } }">
        <ion-row>
          <ion-col>
            <ion-avatar>
              <img src="@/../public/img/gamer.png" />
            </ion-avatar>
          </ion-col>
          <ion-col
            size-xs="8"
            size-sm="9"
            size-md="10"
            size-lg="10"
            size-xl="11"
          >
            <ion-card-subtitle>
              Hi <span class="user-name">{{ user.name }}</span> 👋
            </ion-card-subtitle>
            <h1>{{ level }}</h1>
            {{ userWords.length }} <small>words</small>
          </ion-col>
        </ion-row>
      </router-link>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardSubtitle,
  IonAvatar,
} from '@ionic/vue';
import { userWordStore } from '@/store/user-word.store';
import { backend } from '@/utils/Backend';
import { User } from 'types/backend';

export default defineComponent({
  async setup() {
    await userWordStore.initialise();
    return {
      user: backend.authenticatedUser as User,
      userWords: userWordStore.userWords,
    };
  },
  components: {
    IonCard,
    IonRow,
    IonCol,
    IonCardHeader,
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
a {
  color: white;
  text-decoration: none;
}
</style>
