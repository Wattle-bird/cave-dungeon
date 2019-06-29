import { Creature } from '../creatures/creature';
import { Effect } from '../effect';

export interface Status {
    name: string;

    doAction?(user: Creature, target: Creature): void;

    // TODO refactor like below
    modifyOutgoingEffect?(creature: Creature, effect: Effect): Effect;

    modifyIncomingEffect?(effect: Effect, receiver: Creature): Effect;
}