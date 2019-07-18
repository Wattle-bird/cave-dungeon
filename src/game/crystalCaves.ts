import { Game } from "./game";
import { RatCreature } from './creatures/rat';
import { Creature } from './creatures/creature';
import { Battle, BattleResult } from './battle';

////////////////////////////////////
// TODO DELETE THIS
////////////////////////////////////

export class CrystalCaves {
    readonly INTRO =
`Welcome to the Crystal Caves!
TODO more intro`;

    constructor(private game: Game) {}

    doDungeon = async () => {
        this.game.messageBox.showText(this.INTRO);
        // TODO init character

        await this.doGroup1Room();
        await this.doGroup1Room();
        await this.doGroup1Room();
    }

    private doGroup1Room = async () => {
        this.game.messageBox.showText('You find yourself in a small cavern,\nwith the odd speck of sparkle in the walls');
        const enemy = this.generateGroup1Enemy();
        this.game.messageBox.showText(`${enemy.name} appears!`);

        this.game.battle = new Battle(this.game, enemy);
        const result = await this.game.battle.doBattle();
        if (result === BattleResult.LOST) {
            return BattleResult.LOST;
        }
        // TODO reward
    }

    private generateGroup1Enemy = (): Creature => {
        // TODO
        return new RatCreature(this.game);
    }
}