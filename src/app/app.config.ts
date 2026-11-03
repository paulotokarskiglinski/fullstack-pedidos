import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {enabled: !isDevMode()})
  ]
};
