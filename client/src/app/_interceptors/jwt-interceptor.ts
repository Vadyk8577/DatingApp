import { HttpInterceptorFn } from '@angular/common/http';
import { Account } from '../_service/account';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
const accountService = inject(Account);

if(accountService.currentUser()){
  req = req.clone({
    setHeaders:{
      Authorization:`Bearer ${accountService.currentUser()?.token}`
    }
  })
}

  return next(req);
};
