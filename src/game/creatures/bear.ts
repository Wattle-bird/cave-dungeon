import { Creature } from './creature';
import { Game } from '../game';
import { BattleAction } from '../battleActions/battleAction';
import { BasicAttackAction } from '../battleActions/basicAttackAction';

class FocusAction extends BattleAction {
    name: 'Focus';
    doAction(user: Creature, _) {
        // TODO raise attack mult
        this.game.messageBox.showText(`${user.name} sharpens its focus. Its attack damage rises!`);
    }
}

export class BearCreature extends Creature {
    name = "Bear";
    maxHp = 15;

    constructor(game: Game) {
        super(game);
        this.actions = [
            new BasicAttackAction(game, 3, 4),
            new FocusAction(game)
        ];
        this.initStats();
    }
}