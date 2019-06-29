import { Status } from "../status";
import { Creature } from '../../creatures/creature';
import { Game } from '../../game';

export class DebugDumpTargetAction implements Status {
    name = 'Dump Target';

    constructor(private game: Game) {}

    doAction(user: Creature, target: Creature) {
        console.log(target);

        this.game.messageBox.showText(`> HP: ${target.currentHp}/${target.maxHp}`);

        this.game.messageBox.showText('> Statuses:');
        for (const status of target.statuses) {
            this.game.messageBox.showText(`    > ${status.name}`);
        }
    }
}