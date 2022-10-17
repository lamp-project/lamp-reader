import router from '@/router';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen';

async function init() {
  if (Capacitor.getPlatform() != 'web') {
    router.afterEach(onReady);
  }
}

let onReadyFired = false;
async function onReady() {
  if (!onReadyFired) {
    SplashScreen.hide();
    if (await AndroidFullScreen.isImmersiveModeSupported()) {
      await AndroidFullScreen.immersiveMode();
    }
    onReadyFired = true;
  }
}

init()
  .then(() => console.log('Capacitor initialised!'))
  .catch(console.error);
