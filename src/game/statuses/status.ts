import { Creature } from '../creatures/creature';
import { Effect } from '../effect';

export interface Status {
    name: string;

    doAction?(user: Creature, target: Creature): void;

    modifyOutgoingEffect?(creature: Creature, effect: Effect): Effect;
}