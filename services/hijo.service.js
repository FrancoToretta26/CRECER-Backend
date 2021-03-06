// Gettign the Newly created Mongoose Model we just created 
var Hijo= require('../models/Hijo.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Hijo List
exports.getHijos = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Hijos = await Hijo.paginate(query, options)
        return Hijos
        
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Hijos');
    }
}

exports.createHijo = async function (hijo) {
    console.log("entre al moongose)")
    // Creating a new Mongoose Object by using the new keyword    
    var newHijo = new Hijo({
        name: hijo.name,
        genero: hijo.genero,
        altura: hijo.altura,
        peso: hijo.peso,
        dni: hijo.dni,
        diametroCabeza: hijo.diametroCabeza,
        grupoSanguineo: hijo.grupoSanguineo,
        alergias: hijo.alergias,
        enfermedades: hijo.enfermedades,
        edad: hijo.edad,
        emailUsuario: hijo.emailUsuario,
    })

    try {
        // Saving the Hijo 
        console.log("ENTRE AL TRY")
        var savedHijo = await newHijo.save();
        var token = jwt.sign({
            id: savedHijo._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Hijo")
    }
}



exports.updateHijo = async function (hijo) {
    console.log('entre al controller')
    
    var id = {name:hijo.name}
    console.log('id',id)

    try {
        //Find the old Hijo Object by the Id
        var oldHijo = await Hijo.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Hijo")
    }
    // If no old Hijo Object exists return false
    if (!oldHijo) {
        return false;
    }
    //Edit the Hijo Object
    oldHijo.peso = hijo.peso
    oldHijo.altura = hijo.altura
    oldHijo.diametroCabeza = hijo.diametroCabeza
    try {
        var savedHijo = await oldHijo.save()
        return savedHijo;
    } catch (e) {
        throw Error("And Error occured while updating the Hijo");
    }
}

