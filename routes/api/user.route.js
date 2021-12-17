var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var UploadController = require('../../controllers/upload.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.post('/getUsers', UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.put('/updateUser', UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)
router.put('/sendMail', MailController.sendMail)



// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login