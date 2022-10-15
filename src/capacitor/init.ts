import router from '@/router';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';

if (Capacitor.getPlatform() != 'web') {
  StatusBar.hide();
  router.afterEach(onReady);
}

let onReadyFired = false;
async function onReady() {
  if (!onReadyFired) {
    await SplashScreen.hide();
    onReadyFired = true;
  }
}
