require("dotenv").config();
const express = require("express");
const {getColores} = require("./db");

const server = express();


server.get("/colores", async (peticion,respuesta) => {
    try{
        let colores = await getColores();

        respuesta.json(colores);

    }catch(error){

        respuesta.status(500);

        respuesta.json(error);
    }
});

server.post("/colores/crear", (peticion,respuesta)  => {
    respuesta.send("...post");
});

server.delete("/colores/borrar/:id", (peticion,respuesta) => {
    respuesta.send("..delete");
});

server.listen(process.env.PORT);