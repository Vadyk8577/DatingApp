import { Component, inject, input, ViewChild } from '@angular/core';
import { Message } from '../../_services/message';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css'
})
export class MemberMessages {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageService = inject(Message);
  username = input.required<string>();
  messageContent = '';

  sendMessage(){
      this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
        this.messageForm?.reset();
      })
  }
}
