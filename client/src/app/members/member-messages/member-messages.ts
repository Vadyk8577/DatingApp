import { Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
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
  private messageService = inject(Message);
  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent = '';
  updateMessages = output<Message>();

  sendMessage(){
    this.messageService.sendMessage(this.username(),this.messageContent).subscribe({
      next: message => {
        this.updateMessages.emit(message);
        this.messageForm?.reset();
      }
    })
  }

}
