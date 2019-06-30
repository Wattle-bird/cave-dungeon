import { MessageBox, MessageAction } from "src/game/messageBox";
import { Creature } from './creatures/creature';
import { PuppetCreature } from './creatures/puppet';
import { Battle, BattleResult } from './battle';
import { BearCreature } from './creatures/bear';
import { RatCreature } from './creatures/rat';
import { BearHollowDungeon } from './bearHollowDungeon';
import { DebugOverseerCreature } from './creatures/overseer';
import { CrystalCaves } from './crystalCaves';

export class Game {
    player: Creature;
    battle: Battle;

    constructor(public messageBox: MessageBox) {
        (window as any).game = this;
        this.doGame().catch( err => {
            alert(err);
            throw err;
         });
    }

    doGame = async () => {
        this.startupMessage();
        this.initData();
        while (true) {
            await this.doMainMenu();
        }
    }

    doMainMenu = async () => {
        const choices: MessageAction[] = [
            {
                text: 'Challenge the Crystal Caves',
                value: this.doCrystalCaves
            }, {
                text: 'Challenge the Bear Hollow',
                value: this.doBearHollow
            }, {
                text: 'Battle a rat',
                value: this.doBattleRat
            }, {
                text: 'Battle a bear',
                value: this.doBattleBear
            }, {
                text: 'Heal',
                value: this.doHeal
            }, {
                text: 'Debug Mode',
                value: this.doDebugMode
            }
        ];

        const choice = await this.messageBox.prompt(choices);
        await choice();
    }

    startupMessage = () => {
        this.messageBox.showText('Welcome to the game!');
    }

    initData = () => {
        this.player = new PuppetCreature(this);
    }

    doHeal = async () => {
        this.player.currentHp = this.player.maxHp;
        this.messageBox.showText(`${this.player.name} is fully healed`);
    }

    doBattleRat = async () => {
        this.battle = new Battle(this, new RatCreature(this));
        await this.doBattle();
    }

    doBattleBear = async () => {
        this.battle = new Battle(this, new BearCreature(this));
        await this.doBattle();
    }

    doBattle = async () => {
        const result = await this.battle.doBattle();
        if (result === BattleResult.WON) {
            this.messageBox.showText('You won!');
        } else {
            this.messageBox.showText('You lost...');
        }
    }

    doBearHollow = async () => {
        await new BearHollowDungeon(this).doDungeon();
    }

    doDebugMode = async () => {
        this.messageBox.messageDelayMs = 100;
        this.player = new DebugOverseerCreature(this);
    }

    doCrystalCaves = async () => {
        const crystalCaves = new CrystalCaves(this);
        await crystalCaves.doDungeon();
    }
}
