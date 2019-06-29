import { Creature } from './creature';
import { Game } from '../game';
import { BasicAttackAction } from '../statuses/basicAttackAction';
import { Status } from '../statuses/status';

class RatAttackAction extends BasicAttackAction {
    baseDamage = 1;
    damageVariance = 1;
}

class SnoozeAction implements Status {
    name = 'Snooze';

    constructor(private game: Game) {}

    doAction(user: Creature, _) {
        this.game.messageBox.showText(`${user.name} snoozes and snores...`);
    }
}

export class RatCreature extends Creature {
    name = "Rat";
    maxHp = 6;

    constructor(game: Game) {
        super(game);
        this.statuses = [
            new RatAttackAction(game),
            new SnoozeAction(game)
        ];
        this.initStats();
    }
}