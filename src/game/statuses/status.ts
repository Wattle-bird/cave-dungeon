import { Creature } from '../creatures/creature';
import { Game } from '../game';

export class Status {
    name: string;

    constructor(protected game: Game) {}

    doAction(user: Creature, target: Creature): void {
        this.game.messageBox.showText(`${user.name} does UNDEFINED`);
    }
}