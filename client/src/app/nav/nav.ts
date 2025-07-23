import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HasRole } from '../_directives/has-role';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive, HasRole],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  accountService = inject(Account);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
      },
      error: error => this.toastr.error(error.error)
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  console.log('Image failed to load, fallback to default');
  img.src = 'assets/user.png';

}


  get userPhotoUrl(): string {
  const user = this.accountService.currentUser();
  if (!user) return 'assets/user.png';
  if (!user.photoUrl || !user.photoUrl.trim()) {
    return 'assets/user.png';
  }
  return user.photoUrl + '?v=' + new Date().getTime();
}



}
