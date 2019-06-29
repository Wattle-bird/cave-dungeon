import { Status } from './status';
import { Creature } from '../creatures/creature';
import { Game } from '../game';
import { Effect } from '../effect';

export class BasicAttackAction implements Status {
    name = 'Attack';
    baseDamage = 1;
    damageVariance = 0;

    constructor(private game: Game, baseDamage?: number, damageVariance?: number) {
        this.baseDamage = baseDamage || this.baseDamage;
        this.damageVariance = damageVariance || this.damageVariance;
    }

    doAction(user: Creature, target: Creature) {
        this.game.messageBox.showText(`${user.name} attacks ${target.name}`);
        const damage = (this.baseDamage + Math.random() * this.damageVariance);
        user.sendEffect(new Effect().withDamage(damage), target);
    }
}