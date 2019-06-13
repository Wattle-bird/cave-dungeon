import { Creature } from '../creature';
import { Game } from '../game';

export class RatCreature extends Creature {
    name = "Rat";
    maxHp = 6;
    attackDamage = 1;

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}