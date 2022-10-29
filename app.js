const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
let pokemons = require("./mock-pokemon");
const { success, getUniqueId } = require("./helper.js");

const app = express();
const port = 3000;

///////// Middleware morgan
app.use(favicon(`${__dirname}/favicon.ico`))
    .use(morgan("dev"))
    .use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello, Express 2! 👋"));

app.get("/api/pokemons/:id", (req, res) => {
    const id = +req.params.id;
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    const message = "un pokémon a bien été trouvé.";
    res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
    const message = "Liste de tous les pokémons dans le pokédex.";
    console.log(pokemons.length + 1);
    res.send(success(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{ id, createdAt: new Date() } };
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`;
    res.status(200).json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map((pokemon) => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    const message = `Le pokémon ${pokemonUpdated.name} à bien été modifié.`;
    res.status(200).json(success(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
    pokemons = pokemons.filter((pokemon) => pokemon.id !== id);

    const message = `Le pokémon ${pokemonDeleted.name} à bien été supprimé.`;

    res.status(200).json(success(message, pokemonDeleted));
});

app.listen(port, () =>
    console.log(
        `Notre application Node est démarré sur : http://localhost:${port}`
    )
);
