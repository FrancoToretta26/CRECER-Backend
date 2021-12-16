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
exports.getHijosByName = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {emailUsuario: req.body.emailUsuario}
    console.log(filtro)
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
    console.log("llegue al controller",req.body)
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
        dni: req.body.dni,
        edad: req.body.edad,
        vacunas: req.body.vacunas,
        controlesMedicos: req.body.controlesMedicos,
        emailUsuario: req.body.emailUsuario,



    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHijo = await Hijoservice.createHijo(Hijo)
        console.log("entre al try")
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
    console.log('entre a Hijo en controller', Hijo)
    try {
        var updatedHijo = await Hijoservice.updateHijo(Hijo)
        return res.status(200).json({status: 200, data: updatedHijo, message: "Succesfully Updated Hijo"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.updateVacuna = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Hijo = {
       
        name: req.body.name ? req.body.name : null,
        vacunas: req.body.vacunas ? req.body.vacunas : null,
    }
    console.log(Hijo)
    try {
        var updatedHijo = await Hijoservice.updateVacuna(Hijo)
        return res.status(200).json({status: 200, data: updatedHijo, message: "Succesfully Updated Hijo"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.nombresHijos = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.emailUsuario) {
        return res.status(400).json({status: 400., message: "Email be present"})
    }

    
    var Hijo = {
       
        emailUsuario: req.body.emailUsuario ? req.body.emailUsuario : null,
    }
    try {
        var nombresHijos = await Hijoservice.nombresHijos(Hijo)
        return res.status(200).json({status: 200, data: nombresHijos, message: "Succesfully Hijo Buscado"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeHijo = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await Hijoservice.deleteHijo(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.loginHijo = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var Hijo = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginHijo = await Hijoservice.loginHijo(Hijo);
        return res.status(201).json({loginHijo, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid Hijoname or password"})
    }
}

exports.guardarImagenHijo = async function (req, res, next) {

    console.log("ImgHijo",req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({status: 400., message: "Mail must be present"})
    }

    let HijoImg = {
        email: req.body.email,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (HijoImg.nombreImagen!=='')
        {
            var newHijoImg = await HijoImgService.createHijoImg(HijoImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getImagenHijoByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var HijosImg = await HijoImgService.getImagenesByHijo(filtro, page, limit)
        // Return the Hijos list with the appropriate HTTP password Code and Message.
        console.log("HijoByDni",HijosImg)
        if (HijosImg.total===0)
            return res.status(201).json({status: 201, data: HijosImg, message: "No existe Mail"});
        else
            return res.status(200).json({status: 200, data: HijosImg, message: "Succesfully Hijos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}
    
    
