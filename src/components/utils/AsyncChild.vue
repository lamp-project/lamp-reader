<template>
  <div v-if="errorMessage" class="error-message">
    <ion-icon :icon="warningOutline" />
    <br />
    {{ errorMessage }}
  </div>
  <Suspense v-else>
    <template #fallback>
      <ion-progress-bar type="indeterminate" color="dark"></ion-progress-bar>
    </template>
    <template #default>
      <slot />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue';
import { IonProgressBar, IonIcon } from '@ionic/vue';
import { warningOutline } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonProgressBar,
    IonIcon,
  },
  setup() {
    const errorMessage = ref<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onErrorCaptured((error) => {
      errorMessage.value = 'Something went wrong!';
      throw error;
    });
    return {
      warningOutline,
      errorMessage,
    };
  },
});
</script>
<style lang="scss" scoped>
.error-message {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  ion-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
