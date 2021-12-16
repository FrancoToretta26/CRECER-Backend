var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var VisitaSchema = new mongoose.Schema({
    nombreHijo: String,
    horarioVisita: String,
    fechaVisita: String,
    Pediatra: String,
    Observaciones: String,
    diametroCabeza: String,
    altura: String,
    peso: String,
    medicamento: String,
    dosis: String,
    periodo: String,
    estudios: String,
    resultados: String,
    emailUsuario: String,
})

VisitaSchema.plugin(mongoosePaginate)
const Visita = mongoose.model('Visita', VisitaSchema)

module.exports = Visita;