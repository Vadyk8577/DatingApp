import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  imports: [],
  templateUrl: './roles-modal.html',
  styleUrl: './roles-modal.css'
})
export class RolesModal {
  bsModalRef = inject(BsModalRef);
  username = '';
  title = '';
  availableRoles: string[] = [];
  selectedRoles: string[] = [];
  rolesUpdated = false;

  updateCheked(chekedValue: string) {
    if (this.selectedRoles.includes(chekedValue)) {
      this.selectedRoles = this.selectedRoles.filter(r => r !== chekedValue)
    }else {
      this.selectedRoles.push(chekedValue);
    }
  }

  onSelectRoles() {
    this.rolesUpdated = true;
    this.bsModalRef.hide();
  }


}
