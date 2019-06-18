import { Creature } from "./creature";
import { Game } from '../game';
import { BasicAttackAction } from '../battleActions/basicAttackAction';

export class PuppetCreature extends Creature {
    name = "Puppet";
    maxHp = 10;
    actions = [
        new BasicAttackAction(2, 2)
    ];

    constructor(game: Game) {
        super(game);
        this.initStats();
    }
}