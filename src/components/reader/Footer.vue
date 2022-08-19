<template>
  <ion-footer collapse="fade" @click="openSeeker">
    <Toolbar>
      <template #start>
        <small>
          <b> {{ percentage }} </b>%
        </small>
      </template>
      <template #end v-if="location?.displayed?.total > 1">
        <small v-if="leftPagesOfTheChapter > 0">
          {{ leftPagesOfTheChapter }} pages left in this chapter
        </small>
        <small v-else>last page of this chapter</small>
      </template>
    </Toolbar>
  </ion-footer>
  <Seeker ref="seeker" :viewer="viewer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonFooter } from '@ionic/vue';
import Toolbar from '@/components/utils/Toolbar.vue';
import { DisplayedLocation } from 'epubjs/types/rendition';
import Seeker from './Seeker.vue';
import { LampViewer } from '@/utils/viewer/LampViewer';

export default defineComponent({
  components: {
    IonFooter,
    Toolbar,
    Seeker,
  },
  props: {
    location: {
      default: {} as DisplayedLocation,
    },
    viewer: LampViewer,
  },
  computed: {
    leftPagesOfTheChapter() {
      const displayed = this.location.displayed;
      return displayed ? displayed.total - displayed.page : -1;
    },
    percentage() {
      return ((this.location.percentage || 0) * 100).toFixed();
    },
  },
  methods: {
    async openSeeker() {
      // @ts-ignore
      await this.$refs.seeker.open();
    },
  },
});
</script>
<style lang="scss" scoped>
.footer-md {
  &::before {
    display: none;
  }
}
ion-toolbar {
  font-family: unset;
  small {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
