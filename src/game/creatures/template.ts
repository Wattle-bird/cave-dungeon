import { Creature } from "./creature";
import { Game } from '../game';

class TemplateCreature extends Creature {
    name = 'TODO';
    // maxHp = TODO

    constructor(game: Game) {
        super(game);
        this.statuses = [
            // TODO
            // new BasicAttackAction(game)
        ];
        this.initStats();
    }

}