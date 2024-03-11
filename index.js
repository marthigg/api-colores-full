require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {json} = require("body-parser");
const {getColores,crearColor,borrarColor} = require("./db");

const server = express();

server.use(cors());

server.use(json());

server.use("/pruebas", express.static("./pruebas"));


server.get("/colores", async (peticion,respuesta) => {
    try{
        let colores = await getColores();

        respuesta.json(colores.map(({_id,r,g,b}) => { return { id : _id,r,g,b } }));

    }catch(error){

        respuesta.status(500);

        respuesta.json(error);
    }
});

server.post("/colores/nuevo", async (peticion,respuesta,siguiente)  => {

    let {r,g,b} = peticion.body;

    let valido = true;

    [r,g,b].forEach( n => valido = valido && n >= 0 && n <= 255);

    if(valido){
        try{

            let colorNuevo = await crearColor({r,g,b});

            return respuesta.json(colorNuevo);

        }catch(error){

            respuesta.status(500);

            return respuesta.json(error);
        }
    }

    siguiente({ error : "faltan parámetros" });

});

server.delete("/colores/borrar/:id([a-f0-9]{24})", async (peticion,respuesta) => {

    try{
        let cantidad = await borrarColor(peticion.params.id);

        return respuesta.json({ resultado : cantidad > 0 ?  "ok" : "ko" });

    }catch(error){

        respuesta.status(500);

        respuesta.json(error);

    }
});

server.use((error,peticion,respuesta,siguiente) =>  {
    respuesta.status(400);
    respuesta.json({  error  : "error en la petición" });
});

server.use((peticion,respuesta) =>  {
    respuesta.status(404);
    respuesta.json({  error  : "recurso no encontrado" });
});


server.listen(process.env.PORT);