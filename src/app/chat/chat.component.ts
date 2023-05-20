import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatbotmessage } from '../chatbotmessage';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
applyForm = new FormGroup({
  text: new FormControl('')
});

submitApplication() {
    this.chatbotmessageList.push({
                                    id: this.chatbotmessageList.length + 1,  
                                    sender : 2,               // this place for user id
                                    text : this.applyForm.value.text ?? ''
                                  });
    // 
}


}
