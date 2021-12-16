var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var VacunaSchema = new mongoose.Schema({
    nombreHijo: String,
    vacuna: String,
    lugar: String,
    fechaVacunacion: Date,
    dosis: String,
    vacunaAlternativa: String,
    emailUsuario: String,
})

VacunaSchema.plugin(mongoosePaginate)
const Vacuna = mongoose.model('Vacuna', VacunaSchema)

module.exports = Vacuna;