import { AfterViewChecked, Component, inject, input, ViewChild } from '@angular/core';
import { Message } from '../../_services/message';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css'
})
export class MemberMessages implements AfterViewChecked {
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(Message);
  username = input.required<string>();
  messageContent = '';

  sendMessage(){
      this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
        this.messageForm?.reset();
        this.scrollToBottom();
      })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
