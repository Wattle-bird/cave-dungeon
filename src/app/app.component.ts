import { Component } from '@angular/core';
import { MessageLine, MessageBox } from '../game/messageBox';
import { Game } from 'src/game/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game: Game;
  messageBox = new MessageBox();

  constructor() {
    this.game = new Game(this.messageBox);
  }
}
