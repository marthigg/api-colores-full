require("dotenv").config();
const express = require("express");

const server = express();


server.get("/colores", (peticion,respuesta) => {
    respuesta.send("...get");
});

server.post("/colores/crear", (peticion,respuesta)  => {
    respuesta.send("...post");
});

server.delete("/colores/borrar/:id", (peticion,respuesta) => {
    respuesta.send("..delete");
});

server.listen(process.env.PORT);