import { Creature } from '../creature';
import { Game } from '../game';

export class RatCreature extends Creature {
    maxHp = 3;
    name = "Rat";

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}