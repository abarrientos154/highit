'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contrato extends Model {
  static get fillable() {
    return ['contrato']
  }
  static fieldValidationRules() {
    const rulesUser = {
      contrato: "string"
    }
    return rulesUser
  }
}

module.exports = Contrato
