import { Creature } from '../creatures/creature';
import { Effect } from '../effect';

export interface Status {
    name: string;

    doAction?(user: Creature, target: Creature): void;

    modifyOutgoingEffect?(effect: Effect, user: Creature): Effect;

    modifyIncomingEffect?(effect: Effect, receiver: Creature): Effect;
}