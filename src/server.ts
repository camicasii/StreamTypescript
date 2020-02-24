import { App } from "./app";
async function main(){
    const app = new App();
    //await app.listen()
    await app.listen();
}

main();