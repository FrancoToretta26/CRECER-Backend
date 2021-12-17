var express = require('express')
var router = express.Router()
var VacunaController = require('../../controllers/vacuna.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET Vacunas listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Vacuna.routes');
  });
router.post('/addVacuna', VacunaController.createvacuna)
router.get('/getVacunas', VacunaController.getvacunas)
router.put('/VacunaByMail', VacunaController.getvacunasByMail)



// Export the Router
module.exports = router;



//api/Vacunas
//api/Vacunas/registration
//api/Vacunas/login