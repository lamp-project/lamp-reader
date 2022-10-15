LampViewer
<template>
  <ion-modal :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.75, 1]">
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label> <b>Progress:</b> {{ progress.toFixed() }}% </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-range
            color="dark"
            v-model="progress"
            @ionKnobMoveEnd="onProgressChanged"
          ></ion-range>
        </ion-item>
        <ion-list-header>
          <ion-label>
            <ion-icon slot="icon-only" :icon="listOutline"></ion-icon>
            <b> Table of contents </b>
          </ion-label>
        </ion-list-header>
        <ion-item
          v-for="item in toc"
          :key="item.id"
          detail
          button
          @click="onTocClick(item.href)"
        >
          <ion-label class="nav-item-label">{{ item.label }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { settingsOutline, listOutline } from 'ionicons/icons';
import {
  IonModal,
  IonIcon,
  IonList,
  IonItem,
  IonRange,
  IonContent,
  IonListHeader,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { LampViewer } from '@/utils/viewer/LampViewer';
import { NavItem } from 'epubjs';

export default defineComponent({
  setup() {
    return {
      settingsOutline,
      listOutline,
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
    IonListHeader,
    IonList,
    IonItem,
    IonRange,
    IonContent,
    IonLabel,
  },
  data: () => ({
    progress: 0,
  }),
  computed: {
    toc() {
      const toc:NavItem[] = [];
      this.viewer.toc.forEach((item) => {
        if (item.subitems?.length) {
          toc.push(...item.subitems);
        } else {
          toc.push(item);
        }
      });
      return toc;
    },
  },
  methods: {
    async open() {
      this.progress = this.viewer.percentage;
      await this.$el.present();
    },
    async onProgressChanged({ detail: { value } }: CustomEvent) {
      await this.viewer.goTo((value - 0.000000000001) / 100);
    },
    async onTocClick(href: string) {
      await this.viewer.goTo(href);
      await this.$el.dismiss();
    },
  },
});
</script>
<style lang="scss" scoped>
.nav-item-label {
  font-family: 'Merriweather', serif !important;
}
section {
  padding: 12px;
}
ion-range {
  padding-top: 0px;
}
// ion-item {
//   font-weight: 700;
//   text-transform: capitalize;
// }
</style>
