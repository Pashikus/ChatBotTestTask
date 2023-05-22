import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatbotmessage } from '../chatbotmessage.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  chatbotmessageList: Chatbotmessage[] = []; // List of messages
  userID: number = 2;
  isActive: boolean;
  messagingService: MessagingService = inject(MessagingService);

  constructor() {
    this.chatbotmessageList = this.messagingService.getAllMessages();
    this.isActive = this.messagingService.getState();
  }

  // Create forms for template:
  applyForm = new FormGroup({
    text: new FormControl(''),
  });

  submitApplication() {
    this.messagingService.submitApplication(
      this.userID,
      this.applyForm.value.text ?? ''
    );
    this.applyForm.reset();
    this.isActive = this.messagingService.getState();
  }
}
