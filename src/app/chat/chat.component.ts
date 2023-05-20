import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatbotmessage } from '../chatbotmessage';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,

  ],
  templateUrl: 'chat.component.html' ,
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
chatbotmessageList : Chatbotmessage[] = []  // List of messages
messagingService: MessagingService = inject(MessagingService);

constructor() {
  this.chatbotmessageList = this.messagingService.getAllMessages();
}

applyForm = new FormGroup({
  text: new FormControl('')
});



  submitApplication() {
      this.messagingService.submitApplication(2, this.applyForm.value.text ?? '');
      this.applyForm.reset();
  }


}
