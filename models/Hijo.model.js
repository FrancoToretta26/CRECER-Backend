var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HijoSchema = new mongoose.Schema({
    name: String,
    edad: String,
    dni: String,
    genero: String,
    altura: String,
    peso: String,
    diametroCabeza: String,
    grupoSanguineo: String,
    alergias: String,
    enfermedades: String,
    emailUsuario: String,


})

HijoSchema.plugin(mongoosePaginate)
const Hijo = mongoose.model('Hijo', HijoSchema)

module.exports = Hijo;