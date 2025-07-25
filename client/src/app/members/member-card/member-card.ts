import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { Likes } from '../../_services/likes';
import { Presence } from '../../_services/presence';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css'
})
export class MemberCard {
  private likedService = inject(Likes);
  private presenceService = inject(Presence);
  member = input.required<Member>();
  hasLiked = computed(() => this.likedService.likeIds().includes(this.member().id));
  isOnline = computed(() => this.presenceService.onlineUsers().includes(this.member().username));

  toggleLike(){
    this.likedService.toggleLike(this.member().id).subscribe({
      next: () => {
        if(this.hasLiked()) {
          this.likedService.likeIds.update(ids => ids.filter(x => x !== this.member().id)) 
        }else {
          this.likedService.likeIds.update(ids => [...ids, this.member().id])
        }
      }
    })
  }
}
