export class Effect {
    damage = 0;
    withDamage(damage: number) {
        this.damage = damage;
        return this;
     }
}