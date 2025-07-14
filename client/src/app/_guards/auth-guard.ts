import { CanActivateFn } from '@angular/router';
import { Account } from '../_services/account';
import { inject } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(Account);
  const toast = inject(ToastrService);

if(accountService.currentUser()){
  return true;
}else {
  toast.error('You shall not pass!');
  return false;
}
};
