'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conocimiento extends Model {
  static get fillable() {
    return ['name', 'descripcion', 'area', 'departamento' ]
  }

  static fieldValidationRules() {
    const rulesUser = {
      name: "string",
      descripcion: "string",
      area: "string",
      departamento: "string"
    }
    return rulesUser
  }

  static fieldEdit() {
    const rulesUser = {
      name: "string",
      descripcion: "string",
    }
    return rulesUser
  }
}

module.exports = Conocimiento
