var VacunaService = require('../services/vacuna.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getvacunas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var vacunas = await VacunaService.getvacunas({}, page, limit)
        // Return the vacunas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: vacunas, message: "Succesfully vacunas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getvacunasByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {emailUsuario: req.body.emailUsuario}
    try {
        var Vacunas = await VacunaService.getvacunas(filtro, page, limit)
        // Return the vacunas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({Vacunas, message: "Succesfully vacunas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.createvacuna = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var vacuna = {
        nombreHijo: req.body.nombreHijo,
        fechaVacunacion: req.body.fechaVacunacion,
        lugar: req.body.lugar,
        vacuna: req.body.vacuna,
        dosis: req.body.dosis,
        emailUsuario: req.body.emailUsuario
    

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdvacuna = await VacunaService.createvacuna(vacuna)
        return res.status(201).json({createdvacuna, message: "Succesfully Created vacuna"})
        
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "vacuna Creation was Unsuccesfull"})
    }
}

