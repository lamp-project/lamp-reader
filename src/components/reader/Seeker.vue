LampViewer
<template>
  <ion-modal :initial-breakpoint="0.5" :breakpoints="[0.25, 0.5, 0.75, 1]">
    <ion-header>
      <Toolbar>
        <template #start>
          &nbsp;<ion-icon :icon="settingsOutline"></ion-icon>
        </template>
        <template #middle>&nbsp;Seek</template>
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
          <ion-label position="stacked">
            Progress: {{ progress.toFixed() }}%
          </ion-label>
          <ion-range
            color="dark"
            v-model="progress"
            @ionKnobMoveEnd="onProgressChanged"
          ></ion-range>
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
  IonList,
  IonItem,
  IonRange,
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Toolbar from '@/components/utils/Toolbar.vue';
import { LampViewer } from '@/utils/viewer/LampViewer';

export default defineComponent({
  setup() {
    return {
      settingsOutline,
      closeOutline,
    };
  },
  props: {
    viewer: {
      type: LampViewer,
      required: true,
    },
  },
  components: {
    IonModal,
    IonIcon,
    IonList,
    IonItem,
    IonRange,
    IonButton,
    IonContent,
    IonHeader,
    IonLabel,
    Toolbar,
  },
  data: () => ({
    progress: 0,
  }),
  methods: {
    async open() {
      this.progress = this.viewer.percentage;
      await this.$el.present();
    },
    async onProgressChanged({ detail: { value } }: CustomEvent) {
      await this.viewer.goTo((value - 0.000000000001) / 100);
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
