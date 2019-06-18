import { Creature } from './creatures/creature';
import { MessageAction } from './messageBox';
import { Game } from './game';
import { BattleAction } from './battleActions/battleAction';

export enum BattleResult {
    WON,
    LOST
}

export class Battle {
    constructor(public game: Game, public enemy: Creature) {}

    get player() {
        return this.game.player;
    }

    doBattle = async (): Promise<BattleResult> => {
        while (true) {
            this.statusMessage();
            await this.playerTurn();
            if (this.battleFinished()) {
                break;
            }
            this.enemyTurn();
            if (this.battleFinished()) {
                break;
            }
        }
        return this.getBattleResult();
    }

    statusMessage = () => {
        this.game.messageBox.showText(
`You: ${this.player.name}
HP: ${Math.floor(this.player.currentHp)}/${this.player.maxHp}`
        );
        this.game.messageBox.showText(
`Enemy: ${this.enemy.name}
HP: ${this.enemy.getHpFuzzyText()}`
        );
    }

    playerTurn = async () => {
        const messageActions: MessageAction[] = [];

        for (const action of this.player.actions) {
            messageActions.push({
                text: action.name,
                value: action
            });
        }

        const chosen: BattleAction = await this.game.messageBox.prompt(messageActions);
        const textLines = chosen.doAction(this.player, this.enemy);

        for (const line of textLines) {
            this.game.messageBox.showText(line);
        }
    }

    enemyTurn = () => {
        const textLines = this.enemy.enemyTurn();

        for (const line of textLines) {
            this.game.messageBox.showText(line);
        }
    }

    battleFinished = () => {
        return this.player.defeated || this.enemy.defeated;
    }

    getBattleResult = () => {
        if (this.player.currentHp <= 0) {
            return BattleResult.LOST;
        }
        if (this.enemy.currentHp <= 0) {
            return BattleResult.WON;
        }
        throw new Error('Battle ended with neither win nor loss');
    }

}