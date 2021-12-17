// Gettign the Newly created Mongoose Model we just created 
var Visita = require('../models/Visita.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the visita List
exports.getvisitas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var visitas = await visita.paginate(query, options)
        // Return the visitad list that was retured by the mongoose promise
        return visitas;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating visitas');
    }
}


exports.createvisita = async function (visita) {
    // Creating a new Mongoose Object by using the new keyword
    console.log('v')
    var newvisita = new Visita({
        nombreHijo: visita.nombreHijo,
        horarioVisita: visita.horarioVisita,
        fechaVisita: visita.fechaVisita,
        Pediatra: visita.Pediatra,
        Observaciones: visita.Observaciones,
        diametroCabeza: visita.diametroCabeza,
        altura: visita.altura,
        peso: visita.peso,
        medicamento: visita.medicamento,
        dosis: visita.dosis,
        periodo: visita.periodo,
        estudios: visita.estudios,
        resultados: visita.resultados,
        emailUsuario: visita.emailUsuario,
    })
    console.log('newvisita',newvisita)


    try {
        // Saving the visita 
        console.log('newvisita',newvisita)
        var savedvisita = await newvisita.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating visita")
    }
}


exports.updatevisita = async function (visita) {
    
    var id = {name :visita.name}

    try {
        //Find the old visita Object by the Id
        var oldvisita = await visita.findOne(id);
        console.log(oldvisita)
    } catch (e) {
        throw Error("Error occured while Finding the visita")
    }
    // If no old visita Object exists return false
    if (!oldvisita) {
        return false;
    }
    //Edit the visita Object
    var hashedPassword = bcrypt.hashSync(visita.password, 8);
    oldvisita.name = visita.name
    oldvisita.email = visita.email
    oldvisita.password = hashedPassword
    oldvisita.preguntaSeguridad = visita.preguntaSeguridad
    try {
        var savedvisita = await oldvisita.save()
        return savedvisita;
    } catch (e) {
        throw Error("And Error occured while updating the visita");
    }
}


exports.deletevisita = async function (id) {

    // Delete the visita
    try {
        var deleted = await visita.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("visita Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the visita")
    }
}

