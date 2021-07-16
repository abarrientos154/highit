'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
  static get fillable() {
    return ['email']
  }
  static fieldValidationRules() {
    const rulesUser = {
      email: "string"
    }
    return rulesUser
  }
}

module.exports = Company
