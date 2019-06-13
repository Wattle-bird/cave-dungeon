import { Game } from './game';

export abstract class Creature {
    maxHp = 1;
    currentHp = 0;
    name = 'UNNAMED';
    attackDamage = 2;
    defeated = false;

    constructor(protected game: Game) {}

    initStats = () => {
        this.currentHp = this.maxHp;
    }

    attack(target: Creature) {
        this.game.messageBox.showText(`${this.name} attacks ${target.name}`);
        target.takeDamage(this.attackDamage);
    }

    takeDamage(damage: number) {
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

}