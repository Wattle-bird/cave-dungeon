import { Status } from "../status";
import { Creature } from '../../creatures/creature';
import { Game } from '../../game';

export class DebugAnnihilateAction implements Status {
    name = 'Annihilate';

    constructor(private game: Game) {}

    doAction(user: Creature, target: Creature) {
        this.game.messageBox.showText(`${user.name} annihilates ${target.name}`);
        target.recieveEffect(1e10);
    }
}