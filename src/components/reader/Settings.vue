<template>
  <ion-modal initial-breakpoint="0.25">
    <ion-header>
      <Toolbar>
        <template #start>
          &nbsp;<ion-icon :icon="settingsOutline"></ion-icon>
        </template>
        <template #middle>&nbsp;Settings </template>
        <template #end>
          <ion-button @click="$el.dismiss()">
            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        </template>
      </Toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Font Size</ion-label>
          <ion-select :value="fontSize" v-model="fontSize">
            <ion-select-option value="18">Small</ion-select-option>
            <ion-select-option value="24">Medium</ion-select-option>
            <ion-select-option value="32">Large</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Dark mode</ion-label>
          <ion-toggle :disabled="true" color="primary"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { settingsOutline, closeOutline } from 'ionicons/icons';
import {
  IonModal,
  IonIcon,
  IonToggle,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from '@/components/utils/Toolbar.vue';
import { HighlighterViewer } from '@/utils/HighlighterViewer';

export default defineComponent({
  setup() {
    return {
      settingsOutline,
      closeOutline,
    };
  },
  props: {
    viewer: {
      type: HighlighterViewer,
      required: true,
    },
  },
  components: {
    IonModal,
    IonIcon,
    IonToggle,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonContent,
    IonHeader,
    IonLabel,
    Toolbar,
  },
  data: () => ({
    loading: false,
    fontSize: '',
  }),
  watch: {
    fontSize(value: string) {
      // eslint-disable-next-line vue/no-mutating-props
      this.viewer.fontSize = value;
      this.viewer.reloadLocation();
    },
  },
  methods: {
    async open() {
      this.loading = true;
      this.fontSize = this.viewer.fontSize;
      this.$el.present();
      this.loading = false;
    },
  },
});
</script>
<style lang="scss" scoped>
h1 {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  text-transform: capitalize;
}
section {
  padding: 12px;
}
</style>
