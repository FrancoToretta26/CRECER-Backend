// Gettign the Newly created Mongoose Model we just created 
var Vacuna = require('../models/Vacuna.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { vacunaExistente } = require('../controllers/vacuna.controller');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the vacuna List
exports.getvacunas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Vacunas = await Vacuna.paginate(query, options)
        // Return the vacunad list that was retured by the mongoose promise
        return Vacunas;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating vacunas');
    }
}


exports.createvacuna = async function (vacuna) {
    // Creating a new Mongoose Object by using the new keyword
    var newvacuna = new Vacuna({
        nombreHijo: vacuna.nombreHijo,
        fechaVacunacion: vacuna.fechaVacunacion,
        lugar: vacuna.lugar,
        emailUsuario: vacuna.emailUsuario,
        vacuna: vacuna.vacuna,
        vacunaAlternativa: vacuna.vacunaAlternativa,
        dosis: vacuna.dosis
    })


    try {
        console.log('entra al try');
        var vacunaExistente = await Vacuna.findOne({nombreHijo: vacuna.nombreHijo, vacuna: vacuna.vacuna, dosis: vacuna.dosis, emailUsuario: vacuna.emailUsuario})
        // console.log('vacunaexistente', vacunaExistente)
        if(!vacunaExistente){
        var savedVacuna = await newvacuna.save();
        return (savedVacuna);
        }
        else{
            throw Error("Error")  
        }
    
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating vacuna")
    }
}

