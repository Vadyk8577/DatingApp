import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { Account } from '../../_service/account';
import { Members } from '../../_service/members';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.html',
  styleUrl: './member-edit.css'
})
export class MemberEdit implements OnInit {
  member?: Member;
  private accountService = inject(Account);
  private memberService = inject(Members);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }
}
