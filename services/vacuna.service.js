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

exports.getPreguntaSeguridad = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var vacunas = await vacuna.paginate(query, options)
        // Return the vacunad list that was retured by the mongoose promise
        return vacunas;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating vacunas');
    }
}

exports.createvacuna = async function (vacuna) {
    // Creating a new Mongoose Object by using the new keyword
    console.log('v')
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
        vacunaExistente = await Vacuna.findOne({nombreHijo: vacuna.nombreHijo, vacuna: vacuna.vacuna, dosis: vacuna.dosis, emailUsuario: vacuna.emailUsuario})
        if(!vacunaExistente){
        var savedVacuna = await newvacuna.save();
        return (savedVacuna);
    }
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating vacuna")
    }
}


exports.updatevacuna = async function (vacuna) {
    
    var id = {name :vacuna.name}

    try {
        //Find the old vacuna Object by the Id
        var oldvacuna = await vacuna.findOne(id);
        console.log(oldvacuna)
    } catch (e) {
        throw Error("Error occured while Finding the vacuna")
    }
    // If no old vacuna Object exists return false
    if (!oldvacuna) {
        return false;
    }
    //Edit the vacuna Object
    var hashedPassword = bcrypt.hashSync(vacuna.password, 8);
    oldvacuna.name = vacuna.name
    oldvacuna.email = vacuna.email
    oldvacuna.password = hashedPassword
    oldvacuna.preguntaSeguridad = vacuna.preguntaSeguridad
    try {
        var savedvacuna = await oldvacuna.save()
        return savedvacuna;
    } catch (e) {
        throw Error("And Error occured while updating the vacuna");
    }
}


exports.deletevacuna = async function (id) {

    // Delete the vacuna
    try {
        var deleted = await vacuna.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("vacuna Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the vacuna")
    }
}

