import { Creature } from '../creatures/creature';

export interface Status {
    name: string;

    doAction?(user: Creature, target: Creature): void;
}