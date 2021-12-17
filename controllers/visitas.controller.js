var visitaService = require('../services/visita.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getvisitas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var visitas = await visitaService.getvisitas({}, page, limit)
        // Return the visitas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: visitas, message: "Succesfully visitas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getvisitasByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    try {
        var visitas = await visitaService.getvisitas(filtro, page, limit)
        // Return the visitas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: visitas, message: "Succesfully visitas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.createvisita = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var visita = {
        nombreHijo: req.body.nombreHijo,
        horarioVisita: req.body.horarioVisita,
        fechaVisita: req.body.fechaVisita,
        Pediatra: req.body.Pediatra,
        Observaciones: req.body.Observaciones,
        diametroCabeza: req.body.diametroCabeza,
        altura: req.body.altura,
        peso: req.body.peso,
        medicamento: req.body.medicamento,
        dosis: req.body.dosis,
        periodo: req.body.periodo,
        estudios: req.body.estudios,
        resultados: req.body.resultados,
        emailUsuario: req.body.emailUsuario,


    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdvisita = await visitaService.createvisita(visita)
        return res.status(201).json({createdvisita, message: "Succesfully Created visita"})
        
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "visita Creation was Unsuccesfull"})
    }
}

exports.updatevisita = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var visita = {
       
        name: req.body.name ? req.body.name : null,
        password: req.body.password ? req.body.password : null,
        email: req.body.email ? req.body.email : null,
        preguntaSeguridad: req.body.preguntaSeguridad ? req.body.preguntaSeguridad : null,
    }
    console.log(visita)
    try {
        var updatedvisita = await visitaService.updatevisita(visita)
        return res.status(200).json({status: 200, data: updatedvisita, message: "Succesfully Updated visita"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removevisita = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await visitaService.deletevisita(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}



    
