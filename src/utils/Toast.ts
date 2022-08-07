import { toastController, ToastOptions } from '@ionic/vue';

export class Toast {
  static async show<T = any>(options: ToastOptions) {
    const toast = await toastController.create(options);
    await toast.present();
  }
}
