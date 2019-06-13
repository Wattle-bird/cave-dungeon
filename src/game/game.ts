import { MessageAction, MessageBox } from "src/game/messageBox";
import { Creature, CreatureAction } from './creature';
import { PuppetCreature } from './creatures/puppet';
import { RatCreature } from './creatures/rat';

export class Game {
    player: Creature;
    enemy: Creature;

    constructor(public messageBox: MessageBox) {
        this.startupMessage();
        this.initData();
        this.mainLoop().catch( err => alert(err) );
    }

    mainLoop = async () => {
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
    }

    playerTurn = async () => {
        const messageActions: MessageAction[] = [];

        for (const action of this.player.actions) {
            messageActions.push({
                text: action.name,
                callback: () => action.action(this.enemy)
            });
        }

        await this.messageBox.prompt(messageActions);
    }

    enemyTurn = () => {
        this.enemy.enemyTurn();
    }

    battleFinished = () => {
        return this.player.defeated || this.enemy.defeated;
    }

    startupMessage = () => {
        this.messageBox.showText('Welcome to the game!');
    }

    statusMessage = () => {
        this.messageBox.showText(
`You: ${this.player.name}
HP: ${Math.floor(this.player.currentHp)}/${this.player.maxHp}`
        );
        this.messageBox.showText(
`Enemy: ${this.enemy.name}
HP: ${this.enemy.getHpFuzzyText()}`
        );
    }

    initData = () => {
        this.player = new PuppetCreature(this);
        this.enemy = new RatCreature(this);
    }

}
