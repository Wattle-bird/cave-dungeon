import { Game } from '../game';
import { BattleAction } from '../battleActions/battleAction';
import { BasicAttackAction } from '../battleActions/basicAttackAction';

export abstract class Creature {
    maxHp = 1;
    currentHp = 0;
    name = 'UNNAMED';
    defeated = false;
    actions: BattleAction[] = [new BasicAttackAction()];


    constructor(public game: Game) {
    }

    initStats = () => {
        this.currentHp = this.maxHp;
    }

    takeDamage = (damage: number) => {
        this.currentHp -= damage;
        if (this.currentHp <= 0) {
            this.game.messageBox.showText(`${this.name} is defeated!`);
            this.currentHp = 0;
            this.defeated = true;
        }
    }

    getHpFuzzyText = (): string => {
        const fullness = this.currentHp / this.maxHp;
        const percentage = Math.ceil(fullness * 10) * 10;
        return `${percentage}%`;
    }

    enemyTurn = (): string[] => {
        const actionIndex = Math.floor(Math.random() * this.actions.length);
        return this.actions[actionIndex].doAction(this, this.game.player);
    }

}