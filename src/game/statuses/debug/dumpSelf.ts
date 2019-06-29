import { Status } from "../status";
import { Creature } from '../../creatures/creature';
import { Game } from '../../game';

export class DebugDumpSelfAction implements Status {
    name = 'Dump Self';

    constructor(private game: Game) {}

    doAction(user: Creature, target: Creature) {
        console.log(user);

        this.game.messageBox.showText('> Statuses:');
        for (const status of user.statuses) {
            this.game.messageBox.showText(` > ${status.name}`);
        }
    }
}