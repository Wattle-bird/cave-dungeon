import { BattleAction } from './battleAction';
import { Creature } from '../creatures/creature';

export class BasicAttackAction implements BattleAction {
    name = 'Attack';
    baseDamage = 1;
    damageVariance = 0;

    constructor(baseDamage?: number, damageVariance?: number) {
        this.baseDamage = baseDamage || this.baseDamage;
        this.damageVariance = damageVariance || this.damageVariance;
    }

    doAction(user: Creature, target: Creature) {
        target.takeDamage(this.baseDamage + Math.random() * this.damageVariance);
        return [`${user.name} attacks ${target.name}`];
    }
}