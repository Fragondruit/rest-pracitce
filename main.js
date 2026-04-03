import CatClient from "./CatClient.ts";

async function main() {
    // console.log(await CatClient.getBulkFacts(4));
    await CatClient.getImage('Generate a cat.');
}

main();

// fetch(`https://meowfacts.herokuapp.com/?count=1`, {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
// }).then((response) => response.text())
//     .then((data) => console.log(data));

