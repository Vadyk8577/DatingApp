import { HttpInterceptorFn } from '@angular/common/http';
import { Busy } from '../_services/busy';
import { inject } from '@angular/core';
import { delay, finalize, identity } from 'rxjs';
import { environment } from '../../environments/environment';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(Busy)

  busyService.busy();

  return next(req).pipe(
    (environment.production ? identity : delay(1000)),
    finalize(() => {
      busyService.idle()
    }
    )
  )
};
