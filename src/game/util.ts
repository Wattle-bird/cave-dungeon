export async function delay(ms: number) {
    return new Promise( (resolve) => {
        window.setTimeout( () => resolve(), ms);
    });
}

export function pickRandom<T>(list: T[]) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}