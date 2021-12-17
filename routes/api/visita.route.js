var express = require('express')
var router = express.Router()
var VisitaController = require('../../controllers/visitas.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET visitas listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/visita.routes');
  });
router.post('/addVisita', VisitaController.createvisita)
router.get('/getvisitas', VisitaController.getvisitas)
router.put('/visitaByMail', VisitaController.getvisitasByMail)
router.put('/updatevisita', VisitaController.updatevisita)



// Export the Router
module.exports = router;



//api/visitas
//api/visitas/registration
//api/visitas/login