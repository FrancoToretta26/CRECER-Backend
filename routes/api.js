/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var hijos = require('./api/hijo.route')
var visitas = require('./api/visita.route')
var vacunas = require('./api/vacuna.route')

router.use('/users', users);
router.use('/hijos', hijos);
router.use('/visitas', visitas)
router.use('/vacunas', vacunas)

module.exports = router;
