const { MongoClient } = require("mongodb");

function conectar(){
    return MongoClient.connect(process.env.URL_MONGO);
}

function getColores(){
    return new Promise(async () => {

        let conexion = conectar();

        try{
            let coleccion = conexion.db("colores").collection("colores");

            let  colores = await coleccion.find({}).toArray();

            console.log(colores);

            conexion.close();

        }catch(error){

            return ({error : "error en base de datos"});
        }

    });
}

module.exports = {getColores};