import { Status } from "./status";
import { Creature } from '../creatures/creature';
import { Effect } from '../effect';
import { Game } from '../game';

export class TemplateStatus implements Status {
    name = 'TODO';

    constructor(private game: Game) {}

    // doAction(user: Creature, target: Creature) {
    //     // TODO
    // }

    // modifyOutgoingEffect(creature: Creature, effect: Effect) {
    //     // TODO
    //     return effect;
    // }

    // modifyIncomingEffect(effect: Effect, receiver: Creature) {
    //     // TODO
    //     return effect;
    // }
}