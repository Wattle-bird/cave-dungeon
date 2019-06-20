import { Game } from './game';
import { Creature } from './creatures/creature';
import { RatCreature } from './creatures/rat';
import { Battle, BattleResult } from './battle';
import { BearCreature } from './creatures/bear';

export class BearHollowDungeon {
    constructor(private game: Game) {}

    get player(): Creature {
        return this.game.player;
    }

    doDungeon = async () => {
        this.game.messageBox.showText('Welcome to the Bear Hollow!');
        let round = 1;
        while (true) {
            this.game.messageBox.showText(`Clearing ${round}`);
            const enemy = this.generateEnemy(round);
            this.game.messageBox.showText(`A wild ${enemy.name} appears!`);
            const battle = new Battle(this.game, enemy);
            const battleResult = await battle.doBattle();
            if (battleResult === BattleResult.LOST) {
                this.game.messageBox.showText(`GAME OVER`);
                break;
            }
            round++;
        }
    }

    generateEnemy = (round: number): Creature => {
        if (Math.random() > ((round - 1) / 10) ) {
            return new RatCreature(this.game);
        } else {
            return new BearCreature(this.game);
        }
    }
}