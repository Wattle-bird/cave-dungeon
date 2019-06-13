import { Creature } from "../creature";
import { Game } from '../game';

export class PuppetCreature extends Creature {
    name = "Puppet";
    maxHp = 10;

    get attackDamage() {
        return 2.5 + Math.random();
    }
    set attackDamage(_) {}

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}