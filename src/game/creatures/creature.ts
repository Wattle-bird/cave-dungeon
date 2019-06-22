import { Game } from '../game';
import { Status } from '../statuses/status';
import { BasicAttackAction } from '../statuses/basicAttackAction';

export abstract class Creature {
    maxHp = 1;
    currentHp = 0;
    attackMultiplier = 1;
    name = 'UNNAMED';
    statuses: Status[];

    get defeated() {
        return this.currentHp <= 0;
    }

    constructor(public game: Game) {
        this.statuses = [new BasicAttackAction(game)];
    }

    initStats = () => {
        this.currentHp = this.maxHp;
    }

    takeDamage = (damage: number) => {
        const roundedDamage = Math.round(damage);
        this.game.messageBox.showText(`${this.name} takes ${roundedDamage} damage`);
        this.currentHp -= roundedDamage;
        if (this.currentHp <= 0) {
            this.game.messageBox.showText(`${this.name} is defeated!`);
            this.currentHp = 0;
        }
    }

    getHpFuzzyText = (): string => {
        const fullness = this.currentHp / this.maxHp;
        const percentage = Math.ceil(fullness * 10) * 10;
        return `${percentage}%`;
    }

    enemyTurn = () => {
        const actions = this.statuses.filter(status => !!status.doAction);
        const actionIndex = Math.floor(Math.random() * actions.length);
        actions[actionIndex].doAction(this, this.game.player);
    }

}