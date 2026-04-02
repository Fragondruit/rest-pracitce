function main() {
    fetch("https://meowfacts.herokuapp.com/?count=3", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data.data))
        .catch((error) => console.error(error));
}

main();
