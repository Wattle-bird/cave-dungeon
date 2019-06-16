export async function delay(ms: number) {
    return new Promise( (resolve) => {
        window.setTimeout( () => resolve(), ms);
    });
}