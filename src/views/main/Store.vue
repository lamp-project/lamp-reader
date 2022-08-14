<template>
  <TabPage title="Store">
    <List />
  </TabPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabPage from '@/components/utils/TabPage.vue';
import List from '@/components/tabs/store/List.vue';

export default defineComponent({
  components: {
    TabPage,
    List,
  },
});
</script>

