import { Game } from '../game';
import { Status } from '../statuses/status';
import { BasicAttackAction } from '../statuses/basicAttackAction';
import { Effect } from '../effect';
import { pickRandom } from '../util';

export abstract class Creature {
    maxHp = 1;
    currentHp = 0;
    abstract name: string;
    statuses: Status[];

    get defeated() {
        return this.currentHp <= 0;
    }

    constructor(public game: Game) {
        this.statuses = [new BasicAttackAction(game)];
    }

    initStats = () => {
        this.currentHp = this.maxHp;
    }

    recieveEffect = (effect: Effect) => {
        // modifiers
        const modifiers = this.statuses.filter(status => !!status.modifyIncomingEffect);
        for (const modifier of modifiers) {
            effect = modifier.modifyIncomingEffect(effect, this);
        }

        this.recieveEffectDamage(effect);
    }

    recieveEffectDamage = (effect: Effect) => {
        const damage = effect.damage;
        const roundedDamage = Math.round(damage);
        this.game.messageBox.showText(`${this.name} takes ${roundedDamage} damage`);
        this.currentHp -= roundedDamage;

        if (this.currentHp <= 0) {
            this.game.messageBox.showText(`${this.name} is defeated!`);
            this.currentHp = 0;
        }

    }

    getHpFuzzyText = (): string => {
        const fullness = this.currentHp / this.maxHp;
        const percentage = Math.ceil(fullness * 10) * 10;
        return `${percentage}%`;
    }

    sendEffect = (effect: Effect, target: Creature) => {
        const modifiers = this.statuses.filter(status => !!status.modifyOutgoingEffect);
        for (const modifier of modifiers) {
            effect = modifier.modifyOutgoingEffect(effect, this);
        }
        target.recieveEffect(effect);
    }

    doAfterTurn = () => {
        const statuses = this.statuses.filter(s => !!s.doAfterTurn);
        for (const status of statuses) {
            status.doAfterTurn(this);
        }
    }

    enemyTurn = () => {
        const actions = this.statuses.filter(status => !!status.doAction);
        pickRandom(actions).doAction(this, this.game.player);
    }

}
