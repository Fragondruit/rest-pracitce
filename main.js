import CatClient from "./CatClient.ts";

async function main() {
    console.log(await CatClient.getFact());
}

main();
