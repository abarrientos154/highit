'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sla extends Model {
  static get fillable() {
    return ['nombre', 'tiempo','color', 'contrato' ]
  }
  static fieldValidationRules() {
    const rulesUser = {
      nombre: "string",
      tiempo: "number",
      color: "string",
      contrato: "string"
    }
    return rulesUser
  }
  Contrato () {
    return this.hasOne("App/Models/Contrato", "contrato", "_id")
  }
}

module.exports = Sla
