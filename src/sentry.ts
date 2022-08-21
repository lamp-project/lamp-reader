import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { Vue } from '@sentry/vue/types/types';
import { Router } from 'vue-router';
import { backend } from './utils/Backend';

export function initSentry(app: Vue, router: Router) {
  Sentry.init({
    app,
    dsn: 'https://fd24a9f80243482b87e15668e7fff865@o291924.ingest.sentry.io/6671916',
    release: process.env.VUE_APP_VERSION,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'lamp-reader.com', /^\//],
      }),
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    beforeSend(event, hint) {
      const user = backend.authenticatedUser;
      if (user) {
        event.user = { email: user.email, name: user.name };
      }
      return event;
    },
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
