import { Creature } from "./creature";
import { Game } from '../game';
import { BasicAttackAction } from '../statuses/basicAttackAction';

export class PuppetCreature extends Creature {
    name = "Puppet";
    maxHp = 10;

    constructor(game: Game) {
        super(game);
        this.statuses = [
            new BasicAttackAction(game, 2, 2)
        ];
        this.initStats();
    }
}