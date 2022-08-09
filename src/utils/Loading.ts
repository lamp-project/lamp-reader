import { loadingController } from '@ionic/vue';
import { Toast } from './Toast';

export class Loading {
  static async wait<T = any>(message: string, job: () => T) {
    const loading = await loadingController.create({
      message,
    });
    await loading.present();
    try {
      return await job();
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
