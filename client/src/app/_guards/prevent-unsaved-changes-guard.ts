import { CanDeactivateFn } from '@angular/router';
import { MemberEdit } from '../members/member-edit/member-edit';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEdit> = (component) => {
  if(component.editForm?.dirty){
    return confirm('Are you sure want to continue? Any unsaved changes will be lost');
  }
  return true;
};
