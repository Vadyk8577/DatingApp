import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { MemberCard } from "../member-card/member-card";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { Account } from '../../_services/account';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-lists',
  standalone: true,
  imports: [MemberCard,PaginationModule,FormsModule, ButtonsModule],
  templateUrl: './member-lists.html',
  styleUrl: './member-lists.css'
})
export class MemberLists implements OnInit {
  memberService = inject(Members);
  genderList = [{value: 'male',display: 'Males'},{value: 'female',display: 'Females '}]
 


  ngOnInit(): void {
    if(!this.memberService.paginatedResult()) this.loadMembers();
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers();
  }

  resetFilters(){
    this.memberService.resetUserParams()
    this.loadMembers();
  }

  pageChanged(event: any) {
    if(this.memberService.userParams().pageNumber !== event.page){
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
