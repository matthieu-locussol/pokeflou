// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
   dsn: 'https://19d2db9b37d9b1b9e429f897011f1920@o4507950493728768.ingest.de.sentry.io/4507950497071184',

   // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
   tracesSampleRate: 1,

   // Setting this option to true will print useful information to the console while you're setting up Sentry.
   debug: false,

   enabled: process.env.NODE_ENV === 'production',
});
