import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_service/account';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-nav',
  imports: [FormsModule,CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  accountService = inject(Account);
  model: any = {};

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout(){
    this.accountService.logout();
  }
}
