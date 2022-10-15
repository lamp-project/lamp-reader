<template>
  <TabPage title="Library">
    <LibraryList />
    <template #buttons>
      <ion-menu-button></ion-menu-button>
    </template>
  </TabPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonMenuButton } from '@ionic/vue';
import TabPage from '@/components/utils/TabPage.vue';
import LibraryList from '@/components/library/List.vue';

export default defineComponent({
  components: {
    TabPage,
    LibraryList,
    IonMenuButton,
  },
});
</script>

