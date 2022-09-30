const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
let pokemons = require("./mock-pokemon");
const { success } = require("./helper.js");

const app = express();
const port = 3000;

///////// Middleware morgan
app.use(favicon(`${__dirname}/favicon.ico`)).use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello, Express 2! 👋"));

app.get("/api/pokemons/:id", (req, res) => {
    const id = +req.params.id;
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    const message = "un pokémon a bien été trouvé.";
    res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
    const message = "Liste de tous les pokémons dans le pokédex.";
    res.send(success(message, pokemons));
});

app.listen(port, () =>
    console.log(
        `Notre application Node est démarré sur : http://localhost:${port}`
    )
);
