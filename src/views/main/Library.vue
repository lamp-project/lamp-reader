<template>
  <TabPage title="Library">
    <LibraryList />
  </TabPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabPage from '@/components/utils/TabPage.vue';
import LibraryList from '@/components/tabs/library/List.vue';

export default defineComponent({
  components: {
    TabPage,
    LibraryList,
  },
});
</script>

