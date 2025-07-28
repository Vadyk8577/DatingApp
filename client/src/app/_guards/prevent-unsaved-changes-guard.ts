import { CanDeactivateFn } from '@angular/router';
import { MemberEdit } from '../members/member-edit/member-edit';
import { Confirm } from '../_services/confirm';
import { inject } from '@angular/core';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEdit> = (component) => {
  const confirmService = inject(Confirm);

  if(component.editForm?.dirty){
    return confirmService.confirm() ?? false;
  }
  return true;
};
