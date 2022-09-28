const express = require("express");
let pokemons = require("./mock-pokemon");
const { success } = require("./helper.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello, Express 2! 👋"));

app.get("/api/pokemons/:id", (req, res) => {
    const id = +req.params.id;
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    const message = "un pokémon a bie nété trouvé.";
    res.json(success(message, pokemon));
});
app.get("/api/pokemons", (req, res) => {
    const message = "Liste de tous les pokémons.";
    res.send(success(message, pokemons));
});

app.listen(port, () =>
    console.log(
        `Notre application Node est démarré sur : http://localhost:${port}`
    )
);
