var express = require('express')
var router = express.Router()
var HijoController = require('../../controllers/hijos.controller');
var UploadController = require('../../controllers/upload.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET Hijos listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Hijo.routes');
  });
router.post('/agregarHijo', HijoController.createHijo)
router.get('/',Authorization, HijoController.getHijos)
router.put('/HijoByName', HijoController.getHijosByName)
router.put('/', Authorization, HijoController.updateHijo)
router.put('/updateHijo', HijoController.updateHijo)




// Export the Router
module.exports = router;



//api/Hijos
//api/Hijos/registration
//api/Hijos/login