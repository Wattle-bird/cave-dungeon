import { MessageBox } from "src/game/messageBox";
import { Creature } from './creature';
import { PuppetCreature } from './creatures/puppet';
import { RatCreature } from './creatures/rat';
import { Battle, BattleResult } from './battle';

export class Game {
    player: Creature;
    battle: Battle;

    constructor(public messageBox: MessageBox) {
        this.doGame().catch( err => alert(err) );
    }

    doGame = async () => {
        this.startupMessage();
        this.initData();
        this.battle = new Battle(this, new RatCreature(this));
        const result = await this.battle.doBattle();
        if (result === BattleResult.WON) {
            this.messageBox.showText('You won!');
        } else {
            this.messageBox.showText('You lost...');
        }
    }


    startupMessage = () => {
        this.messageBox.showText('Welcome to the game!');
    }

    initData = () => {
        this.player = new PuppetCreature(this);
    }

}
