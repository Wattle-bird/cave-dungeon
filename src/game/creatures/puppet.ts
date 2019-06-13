import { Creature } from "../creature";
import { Game } from '../game';

export class PuppetCreature extends Creature {
    name = "Puppet";
    maxHp = 10;

    attackDamage = 2;
    attackVariance = 2;

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}