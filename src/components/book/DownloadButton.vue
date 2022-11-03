<template>
  <ion-button expand="block" color="success" :disabled="downloading" @click="download">
    <span v-if="downloading">{{ progress }}%</span>
    <span v-else>Downalod</span>
  </ion-button>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IonButton } from '@ionic/vue';
import fetchProgress from 'fetch-progress';

export default defineComponent({
  components: { IonButton },
  props: {
    url: String,
  },
  emits: ['downloaded'],
  data: () => ({
    downloading: false,
    progress: 0,
  }),
  methods: {
    async download() {
      this.downloading = true;
      try {
        const progressHandler = fetchProgress({
          onProgress: (progress: any) => {
            this.progress = progress.percentage;
          },
        });
        const file = await fetch(this.url as string)
          .then(progressHandler)
          .then((res) => res.arrayBuffer());
        this.$emit('downloaded', file);
        this.downloading = false;
      } catch (error: any) {
        alert(error.message);
      }
    },
  },
});
</script>
