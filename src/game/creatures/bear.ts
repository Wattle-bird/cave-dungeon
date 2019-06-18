import { Creature } from './creature';
import { Game } from '../game';
import { BattleAction } from '../battleActions/battleAction';
import { BasicAttackAction } from '../battleActions/basicAttackAction';

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
    actions = [
        new BasicAttackAction(3, 4),
        new FocusAction()
    ];

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}