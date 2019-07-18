import { Game } from './game';
import { Creature } from './creatures/creature';
import { RatCreature } from './creatures/rat';
import { Battle, BattleResult } from './battle';
import { BearCreature } from './creatures/bear';
import { MessageAction } from './messageBox';
import { Status } from './statuses/status';
import { pickRandom } from './util';
import { AttackBoost1p2Status } from './statuses/attackBoost1p2';

export class BearHollowDungeon {
    constructor(private game: Game) {}

    get player(): Creature {
        return this.game.player;
    }

    doDungeon = async () => {
        this.game.messageBox.showText('Welcome to the Bear Hollow!');
        let round = 1;
        while (true) {
            if (await this.promptDoBoss()) {
                const bossResult = await this.doBossRoom();
                if (bossResult === BattleResult.LOST) {
                    this.game.messageBox.showText(`GAME OVER`);
                    break;
                }
                this.game.messageBox.showText(`YOU WIN!`);
                this.game.messageBox.showText(`Won in ${round} rooms`);
                break;
            }

            const battleResult = await this.doRoom(round);
            if (battleResult === BattleResult.LOST) {
                this.game.messageBox.showText(`GAME OVER`);
                break;
            }

            await this.doReward(round);
            round++;
        }
    }

    promptDoBoss = async (): Promise<boolean> => {
        this.game.messageBox.showText('Battle the boss?');
        const options: MessageAction[] = [
            {text: 'Yes', value: true},
            {text: 'No', value: false}
        ];
        return await this.game.messageBox.prompt(options);
    }

    doRoom = async (round: number): Promise<BattleResult> => {
        this.game.messageBox.showText(`Clearing ${round}`);
        const enemy = this.generateEnemy(round);
        this.game.messageBox.showText(`A wild ${enemy.name} appears!`);
        const battle = new Battle(this.game, enemy);
        return await battle.doBattle();
    }

    generateEnemy = (round: number): Creature => {
        // TODO do something with round number
        return new RatCreature(this.game);
    }

    doReward = async (round: number) => {
        const status = this.generateReward(round);
        this.game.messageBox.showText(`You got ${status.name}!`);
        this.player.statuses.push(status);
    }

    generateReward = (round: number): Status => {
        // TODO add more
        return pickRandom([
            new AttackBoost1p2Status(this.game)
        ]);
    }

    doBossRoom = async (): Promise<BattleResult> => {
        this.game.messageBox.showText(`Boss fight!`);
        const enemy = this.generateBoss();
        this.game.messageBox.showText(`A wild ${enemy.name} appears!`);
        const battle = new Battle(this.game, enemy);
        return await battle.doBattle();
    }

    generateBoss = (): Creature => {
        return new BearCreature(this.game);
    }


}