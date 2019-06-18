import { Creature } from './creature';
import { Game } from '../game';

export class RatCreature extends Creature {
    name = "Rat";
    maxHp = 6;
    attackDamage = 1;
    attackVariance = 1;

    constructor(game: Game) {
        super(game);
        this.actions.push({name: 'Snooze', action: this.snooze});
        this.initStats();
    }

    snooze = (_) => {
        this.game.messageBox.showText(`${this.name} snoozes and snores...`);
    }
}