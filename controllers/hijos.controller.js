var Hijoservice = require('../services/hijo.service');
var HijoImgService =require('../services/UserImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHijos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Hijos = await Hijoservice.getHijos({}, page, limit)
        // Return the Hijos list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Hijos, message: "Succesfully Hijos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getHijosByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {emailUsuario: req.body.emailUsuario}
    try {
        var Hijos = await Hijoservice.getHijos(filtro, page, limit)
        // Return the Hijos list with the appropriate HTTP password Code and Message.
        return res.status(200).json({Hijos, message: "Succesfully Hijos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createHijo = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Hijo = {
        
        name: req.body.name,
        genero: req.body.genero,
        altura: req.body.altura,
        peso: req.body.peso,
        dni: req.body.dni,
        diametroCabeza: req.body.diametroCabeza,
        grupoSanguineo: req.body.grupoSanguineo,
        alergias: req.body.alergias,
        enfermedades: req.body.enfermedades,
        edad: req.body.edad,
        emailUsuario: req.body.emailUsuario,



    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHijo = await Hijoservice.createHijo(Hijo)
        return res.status(201).json({createdHijo, message: "Succesfully Created Hijo"})
        
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Hijo Creation was Unsuccesfull"})
    }
}

exports.updateHijo = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Hijo = {
       
        name: req.body.name ? req.body.name : null,
        peso: req.body.peso ? req.body.peso : null,
        altura: req.body.altura ? req.body.altura : null,
        diametroCabeza: req.body.diametroCabeza ? req.body.diametroCabeza : null,
    }
    try {
        var updatedHijo = await Hijoservice.updateHijo(Hijo)
        return res.status(200).json({status: 200, data: updatedHijo, message: "Succesfully Updated Hijo"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


