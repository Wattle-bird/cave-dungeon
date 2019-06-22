import { Creature } from './creatures/creature';
import { MessageAction } from './messageBox';
import { Game } from './game';
import { Status } from './statuses/status';

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
HP: ${Math.ceil(this.player.currentHp)}/${this.player.maxHp}`
        );
        this.game.messageBox.showText(
`Enemy: ${this.enemy.name}
HP: ${this.enemy.getHpFuzzyText()}`
        );
    }

    playerTurn = async () => {
        const messageActions: MessageAction[] = [];

        for (const action of this.player.statuses) {
            messageActions.push({
                text: action.name,
                value: action
            });
        }

        const chosenAction: Status = await this.game.messageBox.prompt(messageActions);
        chosenAction.doAction(this.player, this.enemy);
    }

    enemyTurn = () => {
        this.enemy.enemyTurn();
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