<template>
  <TabPage title="Home">
    <UserStatusCard />
    <LearningWordsCard />
  </TabPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabPage from '@/components/utils/TabPage.vue';
import UserStatusCard from '@/components/tabs/home/UserStatusCard.vue';
import LearningWordsCard from '@/components/tabs/home/LearningWordsCard.vue';

export default defineComponent({
  components: {
    TabPage,
    UserStatusCard,
    LearningWordsCard,
  },
});
</script>

