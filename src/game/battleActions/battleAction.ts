import { Creature } from '../creatures/creature';

export interface BattleAction {
    name: string;
    doAction(user: Creature, target: Creature): string[];

}