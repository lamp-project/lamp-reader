import { loadingController } from '@ionic/vue';
import { Toast } from './Toast';

export class Loading {
  static async wait<T = any>(
    message: string,
    job: () => T,
    successMessage?: string
  ) {
    const loading = await loadingController.create({
      message,
    });
    await loading.present();
    try {
      const result = await job();
      if (successMessage) {
        Toast.show({ message: successMessage, color: 'success' });
      }
      return result;
    } catch (error) {
      await Toast.show({
        message: error as any,
        color: 'danger',
        duration: 1000,
      });
    } finally {
      await loading.dismiss();
    }
  }
}
