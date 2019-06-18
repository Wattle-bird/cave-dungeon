import { Creature } from './creature';
import { Game } from '../game';
import { BattleAction } from '../battleActions/battleAction';

class FocusAction implements BattleAction {
    name: 'Focus';
    doAction(user: Creature, _) {
        // TODO raise attack mult
        return [`${user.name} sharpens its focus. Its attack damage rises!`];
    }
}

export class BearCreature extends Creature {
    name = "Bear";
    maxHp = 15;
    attackDamage = 3;
    attackVariance = 4;

    constructor(game: Game) {
        super(game);
        this.actions.push(new FocusAction());
        this.initStats();
    }
}