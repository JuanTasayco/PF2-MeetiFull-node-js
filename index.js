const express = require("express"); //importar se usa require
const cors = require("cors");
const  path = require("path");

const { dbConnection } = require("./db/config");
require("dotenv").config(); // TOMA CONFIGURACION POR DEFECTO CUANDO CARGA DEL ARCHIVO ENV



const app = express();

dbConnection(); // CONEXION A LA BASE DE DATOS EN INDEX.JS


app.use(express.static("public"));

app.use(cors()); // si sabemos que dominio tenemos lo podemos definir aquí ayudando a la protección
app.use(express.json());  // RESPETAR EL ORDEN DEBEN ESTAR ANTES QUE LA DEFINICION DE RUTAS

app.use("/api/auth", require("./routes/auth"))      //CUANDO ALGUIEN HAGA UNA PETICION A ESTA DIRECCION
//CONFIGURAR CORS


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"))
})



app.listen(process.env.PORT, () => { // escuchar información a un puerto específico y el callback (el hosting me da el puerto a disposición)
    console.log(`Servidor corriendo en un puerto ${process.env.PORT}`)
})


