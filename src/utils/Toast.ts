import { toastController, ToastOptions } from '@ionic/vue';

export class Toast {
  static async show(options: ToastOptions) {
    const toast = await toastController.create({ duration: 1000, ...options });
    await toast.present();
  }
}
