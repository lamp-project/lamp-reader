import { loadingController } from '@ionic/vue';

export class Loading {
  static async wait<T = any>(message: string, job: () => T) {
    const loading = await loadingController.create({
      message,
    });
    await loading.present();
    try {
      return await job();
    } catch (error) {
      alert(error);
    } finally {
      await loading.dismiss();
    }
  }
}
