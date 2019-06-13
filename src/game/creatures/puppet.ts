import { Creature } from "../creature";
import { Game } from '../game';

export class PuppetCreature extends Creature {
    maxHp = 5;
    name = "Puppet";

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}