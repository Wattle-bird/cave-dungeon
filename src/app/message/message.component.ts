import { Component, OnInit, Input } from '@angular/core';
import { MessageLine, MessageAction, MessageLinePrompt, MessageLineText } from '../../game/messageBox';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageLine: MessageLine;

  constructor() { }

  ngOnInit() {
  }

  get text() {
    return (this.messageLine as MessageLineText).text;
  }

  get actions() {
    return (this.messageLine as MessageLinePrompt).actions;
  }

  makeSelection(action: MessageAction) {
    this.hideButtons();
    (this.messageLine as MessageLinePrompt).resolve(action.value);
  }

  hideButtons() {
    this.messageLine.type = 'break';
  }

}
