import { Status } from "../status";
import { Creature } from '../../creatures/creature';
import { Effect } from '../../effect';
import { Game } from '../../game';

export class DebugImmunityStatus implements Status {
    name = 'Immunity';

    constructor(private game: Game) {}

    modifyIncomingEffect(effect: Effect, receiver: Creature) {
        this.game.messageBox.showText(`> Effect Damage: ${effect.damage}`);
        return new Effect();
    }
}