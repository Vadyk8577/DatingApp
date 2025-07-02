import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { Members } from '../../_service/members';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-lists',
  standalone: true,
  imports: [MemberCard],
  templateUrl: './member-lists.html',
  styleUrl: './member-lists.css'
})
export class MemberLists implements OnInit {
   memberService = inject(Members);


  ngOnInit(): void {
    if(this.memberService.members().length === 0) this.loadMembers();
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers()
  }
}
