<template>
  <TabPage title="Home">
    <UserStatusCard />
    <LearningWordsCard />
    <template #buttons>
      <ion-menu-button></ion-menu-button>
    </template>
  </TabPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonMenuButton } from '@ionic/vue';
import TabPage from '@/components/utils/TabPage.vue';
import UserStatusCard from '@/components/home/UserStatusCard.vue';
import LearningWordsCard from '@/components/home/LearningWordsCard.vue';

export default defineComponent({
  components: {
    TabPage,
    UserStatusCard,
    LearningWordsCard,
    IonMenuButton,
  },
});
</script>
