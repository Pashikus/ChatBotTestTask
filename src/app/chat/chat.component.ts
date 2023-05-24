import {
  Component,
  inject,
  ElementRef,
  Renderer2,
  DoCheck,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatbotmessage } from '../chatbotmessage.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements DoCheck {
  chatbotmessageList: Chatbotmessage[] = []; // List of messages
  previousLengthMessageList : number = 0;
  userID: number = 2;
  isActive: boolean = true;
  messagingService: MessagingService = inject(MessagingService);

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.chatbotmessageList = this.messagingService.getAllMessages();
    this.isActive = this.messagingService.getState();
  }

  // Create forms for template:
  applyForm = new FormGroup({
    text: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  ngDoCheck() {  
    if (this.previousLengthMessageList != this.chatbotmessageList.length) {
      setTimeout(() => {
        this.scrollTerminalToBottom();
      }, 20);
      this.previousLengthMessageList = this.chatbotmessageList.length;
    }
  }

  scrollTerminalToBottom(): void {
    const contentElement =
      this.elementRef.nativeElement.querySelector('.terminal');
    contentElement.scrollTop = contentElement.scrollHeight;
  }

  onIsActiveChange() {
    if (this.isActive) {
      this.applyForm.get('text')?.enable();
    } else {
      this.applyForm.get('text')?.disable();
    }
  }

  submitApplication() {
    this.messagingService.submitApplication(
      this.userID,
      this.applyForm.value.text ?? ''
    );
    this.applyForm.reset();
    this.isActive = this.messagingService.getState();
  }
}
