import { Status } from './status';
import { Game } from '../game';
import { Effect } from '../effect';
import { Creature } from '../creatures/creature';

export class AttackBoost1p2Status implements Status {
    name = 'Attack Boost x1.2';

    constructor(private game: Game) {}

    modifyOutgoingEffect(effect: Effect, creature: Creature) {
        effect.damage *= 1.2;
        return effect;
    }
}