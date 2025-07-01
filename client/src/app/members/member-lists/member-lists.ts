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
  private memberService = inject(Members);
  members: Member[] = [];


  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    })
  }
}
