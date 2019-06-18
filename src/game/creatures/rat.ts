import { Creature } from './creature';
import { Game } from '../game';
import { BasicAttackAction } from '../battleActions/basicAttackAction';
import { BattleAction } from '../battleActions/battleAction';

class RatAttackAction extends BasicAttackAction {
    baseDamage = 1;
    damageVariance = 1;
}

class SnoozeAction implements BattleAction {
    name: 'Snooze';
    doAction(user: Creature, _) {
        return [`${user.name} snoozes and snores...`];
    }
}

export class RatCreature extends Creature {
    name = "Rat";
    maxHp = 6;

    constructor(game: Game) {
        super(game);
        this.actions = [
            new RatAttackAction(),
            new SnoozeAction()
        ];
        this.initStats();
    }
}