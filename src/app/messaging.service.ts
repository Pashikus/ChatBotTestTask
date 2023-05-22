import { Injectable, inject } from '@angular/core';
import { Chatbotmessage } from './chatbotmessage.interface';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  topic: string = '';
  chatbotmessageList: Chatbotmessage[] = [];
  isActive: boolean = true;
  readonly ADMIN_ID = 1;
  date = new Date();

  readonly days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
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
    'Have a wonderful day!',
  ];

  getAllMessages(): Chatbotmessage[] {
    return this.chatbotmessageList;
  }

  getState(): boolean {
    return this.isActive;
  }

  constructor(private ws: WeatherService) {}

  /**
   * submitApplication
   * Submits an application and processes the user's input, generating appropriate responses.
   * @param sender: The ID of the sender/user. 1 - for Admin
   * @param text: The text message or input provided by the sender.
   * @returns void
   * @example
   * submitApplication(123, "What is the current time?");
   * Additional notes:
   * - If the text starts with '_', it will be ignored.
   * - if have weather in a sentence, the bot will reply with a question for location – once user reply with a location(could be city) – boot will reply with the current weather forecast – taken from external public weather API
   * - if a user type “bye bye” the bot will reply with “a random goodbye message” and terminate the chat (no more accepting input)
   * - The function updates the 'chatbotmessageList' with appropriate messages based on the input.
   * - The 'topic' variable is used to manage the script of answers.
   */

  submitApplication(sender: number, text: string) {
    // Use this IF for special text with '_'
    if (text[0] == '_') {
    } else {
      // Add senders message to chatbotmessageList
      this.chatbotmessageList.push({
        id: this.chatbotmessageList.length + 1,
        sender: sender, // this place for user id
        text: text ?? '',
      });
      // if we don't have a conversation topic = '', we will find one of key word
      if (this.topic === '') {
        if (RegExp('\\bday\\b').test(text)) {
          // if we have "day" in the text
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,
            sender: this.ADMIN_ID,
            text: this.days[this.date.getDay()],
          });
        } else if (RegExp('\\btime\\b').test(text)) {
          // if we have "time" in the text
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,
            sender: this.ADMIN_ID,
            text:
              this.date.getHours().toString() +
              ':' +
              this.date.getMinutes().toString() +
              ':' +
              this.date.getSeconds().toString(),
          });
        } else if (RegExp('\\bweather\\b').test(text)) {
          // if we have "weather" in the text, we make a question and put "weather" to topic
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,
            sender: this.ADMIN_ID,
            text: 'Send location',
          });
          this.topic = 'weather';
        } else if (RegExp('\\bbye bye\\b').test(text)) {
          // if we have "bye bye" in the text, send a good bue message and disable Forms.
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,
            sender: this.ADMIN_ID,
            text: this.getRandomAnswer(this.goodbyeMessages),
          });
          this.isActive = false;
        } else {
          // if we didn't find key words, we will reverse all string and send back
          let rev: string = '';
          for (let char of text) {
            // append every character of string to the start of the reverseString
            rev = char + rev;
          }
          this.chatbotmessageList.push({
            id: this.chatbotmessageList.length + 1,
            sender: this.ADMIN_ID,
            text: rev,
          });
        }
      } else {
        if (this.topic === 'weather') {
          this.topic = '';
          this.ws.getCurrentWeather(text).subscribe((value) => {
            this.chatbotmessageList.push({
              id: this.chatbotmessageList.length + 1,
              sender: this.ADMIN_ID,
              text: value,
            });
          });
        }
      }
    }
  }

  /**
   * getRandomAnswer
   * [Description]: Retrieves a random answer from the provided array of strings.
   * @param answers: An array of strings containing the possible answers.
   * @returns The randomly selected answer as a string.
   * @example
   * const answers = ["Yes", "No", "Maybe"];
   * const randomAnswer = getRandomAnswer(answers);
   * console.log(randomAnswer); // Example output: "Maybe"
   */

  getRandomAnswer(answers: string[]): string {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
  }
}
