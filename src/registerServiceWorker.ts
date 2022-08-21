/* eslint-disable no-console */

import { register } from 'register-service-worker';
import { Toast } from './utils/Toast';
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.VUE_APP_BASE_URL}/service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      );
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      Toast.show({ message: 'New vesrion is downloading.' });
    },
    updated() {
      if (confirm('New vesrion is downloaded. Do you want to refresh?')) {
        window.location.reload();
      }
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}

