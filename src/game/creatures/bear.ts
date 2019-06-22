import { Creature } from './creature';
import { Game } from '../game';
import { Status } from '../statuses/status';
import { BasicAttackAction } from '../statuses/basicAttackAction';

class FocusAction extends Status {
    name: 'Focus';
    doAction(user: Creature, _) {
        user.attackMultiplier *= 1.2;
        this.game.messageBox.showText(`${user.name} sharpens its focus. Its attack damage rises!`);
    }
}

export class BearCreature extends Creature {
    name = "Bear";
    maxHp = 15;

    constructor(game: Game) {
        super(game);
        this.statuses = [
            new BasicAttackAction(game, 3, 4),
            new FocusAction(game)
        ];
        this.initStats();
    }
}