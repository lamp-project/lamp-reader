<template>
  <TabPage title="Store">
    <List :order-by="orderBy" />
    <template #buttons>
      <ion-button @click="pickOrderBy">
        <ion-icon :icon="swapVerticalOutline"></ion-icon>
      </ion-button>
      <ion-button disabled>
        <ion-icon :icon="funnelOutline"></ion-icon>
      </ion-button>
    </template>
  </TabPage>
</template>

<script lang="ts">
import { findIndex } from 'lodash';
import { defineComponent } from 'vue';
import { IonButton, IonIcon, pickerController } from '@ionic/vue';
import { swapVerticalOutline, funnelOutline } from 'ionicons/icons';
import TabPage from '@/components/utils/TabPage.vue';
import List from '@/components/store/List.vue';

const options = [
  {
    text: 'Easy to hard',
    value: 'a1Readability-desc',
  },
  {
    text: 'Hard to easy',
    value: 'a1Readability-asc',
  },
  {
    text: 'Short to long',
    value: 'wordsCount-asc',
  },
  {
    text: 'Long to short',
    value: 'wordsCount-desc',
  },
];

export default defineComponent({
  setup() {
    return { swapVerticalOutline, funnelOutline };
  },
  components: {
    TabPage,
    List,
    IonButton,
    IonIcon,
  },
  data: () => ({
    orderBySelectedIndex: 0,
  }),
  computed: {
    orderBy() {
      return options[this.orderBySelectedIndex];
    },
  },
  methods: {
    async pickOrderBy() {
      const picker = await pickerController.create({
        columns: [
          {
            name: 'orderBy',
            options,
            selectedIndex: this.orderBySelectedIndex,
          },
        ],
        buttons: [
          {
            text: 'Sort',
            handler: ({ orderBy: { value } }) => {
              this.orderBySelectedIndex = findIndex(options, { value });
            },
          },
        ],
      });
      await picker.present();
    },
  },
});
</script>
