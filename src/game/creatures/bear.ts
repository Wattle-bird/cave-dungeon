import { Creature } from './creature';
import { Game } from '../game';

export class BearCreature extends Creature {
    name = "Bear";
    maxHp = 15;
    attackDamage = 3;
    attackVariance = 4;

    constructor(game: Game) {
        super(game);
        this.actions.push({name: 'Focus', action: this.focus});
        this.initStats();
    }

    focus = (_) => {
        this.game.messageBox.showText(`${this.name} sharpens its focus. Its attack damage rises!`);
        this.attackDamage += 1;
    }
}