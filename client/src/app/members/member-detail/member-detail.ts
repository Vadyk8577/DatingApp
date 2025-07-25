import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../_models/member';
import {TabDirective, TabsetComponent, TabsModule} from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule} from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessages } from "../member-messages/member-messages";
import { Message } from '../../_services/message';
import { Presence } from '../../_services/presence';
import { Account } from '../../_services/account';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';


@Component({
  selector: 'app-member-detail',
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessages],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit,OnDestroy {
  @ViewChild('memberTabs',{static: true}) memberTabs?: TabsetComponent;
  private messageService = inject(Message);
  private accountService = inject(Account);
  presenceService = inject(Presence);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab?: TabDirective;
  

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'];
        this.member && this.member.photos.map(p =>{
          this.images.push(new ImageItem({src: p.url, thumb: p.url}))
        })
      }
    })

    this.route.paramMap.subscribe({
      next: _ => this.onRouteParamsChange()
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  onRouteParamsChange() {
    const user = this.accountService.currentUser();
    if (!user) return;
    if (this.messageService.hubConnection?.state === HubConnectionState.Connected && this.activeTab?.heading === 'Messages'){
      this.messageService.createHubConnection(user, this.member.username);
    }
  }

  selectTab(heading: string){
    if(this.memberTabs){
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if(messageTab) messageTab.active = true;
    }
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: this.activeTab.heading},
      queryParamsHandling: 'merge'
    })
    if(this.activeTab.heading === 'Messages' && this.member){
      const user = this.accountService.currentUser();
      if (!user) return;
      this.messageService.createHubConnection(user, this.member.username);
      } else {
        this.messageService.stopHubConnection();
      }
    }

    ngOnDestroy(): void {
      this.messageService.stopHubConnection();
    }
}
