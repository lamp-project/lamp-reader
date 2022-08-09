import { toastController, ToastOptions } from '@ionic/vue';

export class Toast {
  static async show(options: ToastOptions) {
    const toast = await toastController.create(options);
    await toast.present();
  }
}
