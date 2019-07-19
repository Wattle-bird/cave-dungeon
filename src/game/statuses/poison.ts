import { Status } from "./status";
import { Creature } from '../creatures/creature';
import { Effect } from '../effect';
import { Game } from '../game';

export class PoisonStatus implements Status {
    name = 'Poison';

    constructor(private game: Game) {}

    get damagePerTurn() {
        return 1 + 2 * Math.random()
    }

    doAfterTurn(creature: Creature) {
        const damage = this.damagePerTurn;
        this.game.messageBox.showText(`${creature.name} is poisoned`);
        const effect = new Effect();
        effect.damage = damage;
        creature.recieveEffectDamage(effect);
    }
}

