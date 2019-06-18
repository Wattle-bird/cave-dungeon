import { BattleAction } from './battleAction';
import { Creature } from '../creatures/creature';
import { Game } from '../game';

export class BasicAttackAction extends BattleAction {
    name = 'Attack';
    baseDamage = 1;
    damageVariance = 0;

    constructor(game: Game, baseDamage?: number, damageVariance?: number) {
        super(game);
        this.baseDamage = baseDamage || this.baseDamage;
        this.damageVariance = damageVariance || this.damageVariance;
    }

    doAction(user: Creature, target: Creature) {
        this.game.messageBox.showText(`${user.name} attacks ${target.name}`);
        const damage = (this.baseDamage + Math.random() * this.damageVariance) * user.attackMultiplier;
        target.takeDamage(damage);
    }
}