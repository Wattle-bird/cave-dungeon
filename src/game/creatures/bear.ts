import { Creature } from './creature';
import { Game } from '../game';
import { Status } from '../statuses/status';
import { BasicAttackAction } from '../statuses/basicAttackAction';
import { Effect } from '../effect';

class FocusStatus implements Status {
    name: 'Attack Boost x1.2';

    constructor(private game: Game) {}

    modifyOutgoingEffect(creature: Creature, effect: Effect) {
        return effect * 1.2;
    }
}

class FocusAction implements Status {
    name: 'Focus';

    constructor(private game: Game) {}

    doAction(user: Creature, _) {
        this.game.messageBox.showText(`${user.name} sharpens its focus. Its attack damage rises!`);
        user.statuses.push(new FocusStatus(this.game));
    }
}

class Accuracy implements Status {
    get name() {
        const percent = Math.round(this.accuracy * 100);
        return `${percent}% Accuracy`;
    }

    accuracy = 0.7;

    constructor(private game: Game, accuracy?: number) {
        this.accuracy = accuracy || this.accuracy;
    }

    modifyOutgoingEffect(creature: Creature, effect: Effect): Effect {
        if (Math.random() > this.accuracy) {
            this.game.messageBox.showText('But it missed!');
            return 0;
        }
        return effect;
    }
}

export class BearCreature extends Creature {
    name = "Bear";
    maxHp = 15;

    constructor(game: Game) {
        super(game);
        this.statuses = [
            new BasicAttackAction(game, 3, 4),
            new FocusAction(game),
            new Accuracy(game)
        ];
        this.initStats();
    }
}