import { Creature } from "./creature";
import { Game } from '../game';
import { BasicAttackAction } from '../statuses/basicAttackAction';
import { DebugImmunityStatus } from '../statuses/debug/immunity';
import { DebugDumpSelfAction } from '../statuses/debug/dumpSelf';
import { DebugAnnihilateAction } from '../statuses/debug/annihilate';
import { DebugDumpTargetAction } from '../statuses/debug/dumpTarget';

export class DebugOverseerCreature extends Creature {
    name = 'Overseer';

    constructor(game: Game) {
        super(game);
        this.statuses = [
            new BasicAttackAction(game),
            new DebugImmunityStatus(game),
            new DebugDumpSelfAction(game),
            new DebugDumpTargetAction(game),
            new DebugAnnihilateAction(game),
        ];
        this.initStats();
    }

}