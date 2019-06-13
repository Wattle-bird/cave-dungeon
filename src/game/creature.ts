import { Game } from './game';

export abstract class Creature {
    maxHp = 1;
    currentHp = 0;
    name = 'UNNAMED';
    attackDamage = 0;
    attackVariance = 0;
    defeated = false;
    actions: CreatureAction[];


    constructor(protected game: Game) {
        this.actions = [
            {name: 'Attack', action: this.attack}
        ];
    }

    initStats = () => {
        this.currentHp = this.maxHp;
    }

    attack = (target: Creature) => {
        this.game.messageBox.showText(`${this.name} attacks ${target.name}`);
        const damage = this.attackDamage + this.attackVariance * Math.random();
        target.takeDamage(damage);
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

    enemyTurn = (): void => {
        const actionIndex = Math.floor(Math.random() * this.actions.length);
        (this.actions[actionIndex].action)(this.game.player);
    }

}

export interface CreatureAction {
    name: string;
    action: (target: Creature) => void;
}