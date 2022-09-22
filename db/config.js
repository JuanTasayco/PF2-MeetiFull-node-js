
const  mongoose = require("mongoose");


const dbConnection = async() => {

    try{

        await mongoose.connect(process.env.BD_CNN);

        console.log("DB ONLINE")

    }catch(error){
        console.log(error);
        throw new Error(); /*  SI LA BASE DE DATOS NO ESTÁ ARRIBA, PERMITE EVITAR QUE ENTRE A  TODO DEL BACKEND, PARA QUÉ ? SI LA BBDD NO PERMITE HACER NADA   */
    }

}


module.exports= {
    dbConnection
}