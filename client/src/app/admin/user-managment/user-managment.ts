import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../_services/admin';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModal } from '../../modals/roles-modal/roles-modal';

@Component({
  selector: 'app-user-managment',
  imports: [],
  templateUrl: './user-managment.html',
  styleUrl: './user-managment.css'
})
export class UserManagment implements OnInit{
  private adminService = inject(Admin);
  private modalService = inject(BsModalService);
  users: User[] = [];

  bsModalRef: BsModalRef<RolesModal> = new BsModalRef<RolesModal>();

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  openRolesModal(user: User){
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        selectedRoles: [...user.roles],
        availableRoles: ['Admin','Moderator','Member'],
        users: this.users,
        rolesUpdated: false
      }
    }
    this.bsModalRef = this.modalService.show(RolesModal, initialState);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        if (this.bsModalRef.content && this.bsModalRef.content.rolesUpdated) {
          const selectedRoles = this.bsModalRef.content.selectedRoles;
          this.adminService.updateUserRoles(user.username,selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  getUsersWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}
