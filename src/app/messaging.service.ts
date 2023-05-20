import { Injectable } from '@angular/core';
import { Chatbotmessage } from './chatbotmessage';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  topic : string = ''; 
  chatbotmessageList : Chatbotmessage[] = []
  readonly ADMIN_ID = 1;
  date = new Date();
  readonly days : string[] = [
    'Sunday', 
    'Monday', 
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  readonly goodbyeMessages: string[] = [
    'Goodbye!',
    'Farewell!',
    'Take care!',
    'See you later!',
    'Have a great day!',
    'Until we meet again!',
    'Stay safe!',
    'Adios!',
    'Bye bye!',
    'Have a wonderful day!'
  ];

  getAllMessages(): Chatbotmessage[] {
    return this.chatbotmessageList;
  }
  constructor() { 

  }

 /**
 * submitApplication
 * 
 * Submits an application and processes the user's input, generating appropriate responses.
 * 
 * @param sender: The ID of the sender/user. 1 - for Admin
 * @param text: The text message or input provided by the sender.
 * 
 * @returns void
 * 
 * @example
 * submitApplication(123, "What is the current time?");
 * 
 * Additional notes:
 * - If the text starts with '_', it will be ignored.
 * - if have weather in a sentence, the bot will reply with a question for location – once user reply with a location(could be city) – boot will reply with the current weather forecast – taken from external public weather API
 * - if a user type “bye bye” the bot will reply with “a random goodbye message” and terminate the chat (no more accepting input)
 * - The function updates the 'chatbotmessageList' with appropriate messages based on the input.
 * - The 'topic' variable is used to manage the script of answers.
 */

  submitApplication(sender: number, text : string) {
    
    if (text[0] == '_') { 
    }
    else {
      this.chatbotmessageList.push({
        id: this.chatbotmessageList.length + 1,  
        sender : sender,               // this place for user id
        text : text ?? ''
      });
      if (this.topic === ''){
        if (text.toLowerCase().indexOf('day') > -1) {
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,  
            sender : this.ADMIN_ID,               
            text : this.days[this.date.getDay()]
            });
        } else if (text.toLowerCase().indexOf('time') > -1) {
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,  
            sender : this.ADMIN_ID,               
            text : this.date.getHours().toString() + ':' + this.date.getMinutes().toString() + ':' + this.date.getSeconds().toString()
          });
        } else if (text.toLowerCase().indexOf('weather') > -1) {
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,  
            sender : this.ADMIN_ID,               
            text : 'Send location'
          });
          this.topic = 'weather';
        } else if (text.toLowerCase().indexOf('bye bye') > -1) {
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,  
            sender : this.ADMIN_ID,               
            text : this.getRandomAnswer(this.goodbyeMessages)
          });

        } else {
          // if we didn't find key words, we will reverse all string and send back
          let rev : string = '';
          for (let char of text) {
            // append every character of string to the start of the reverseString
            rev = char + rev;
          }
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,  
            sender : this.ADMIN_ID,               
            text : rev
          });
        }
      } else {
        if (this.topic === 'weather') {
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,  
            sender : this.ADMIN_ID,               
            text : 'Your location is '+ text // place for function where we will call API from weather service in Internet
          });
          this.topic = '';
        }

      }
    }
  }

/**
 * getRandomAnswer
 * 
 * [Description]: Retrieves a random answer from the provided array of strings.
 * 
 * @param answers: An array of strings containing the possible answers.
 * 
 * @returns The randomly selected answer as a string.
 * 
 * @example
 * const answers = ["Yes", "No", "Maybe"];
 * const randomAnswer = getRandomAnswer(answers);
 * console.log(randomAnswer); // Example output: "Maybe"
 * 
 * [Additional information or notes, if necessary]
 */

  getRandomAnswer(answers: string[]): string {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
  }


}
