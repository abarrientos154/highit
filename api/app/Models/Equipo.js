'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipo extends Model {
  static get fillable() {
    return ['name', 'descripcion', 'empresa', 'empresa_creador']
  }

  static get fillableEdit() {
    return ['name', 'descripcion', 'empresa']
  }
  static fieldValidationRules() {
    const rulesUser = {
      name: "string",
      descripcion: "string",
      empresa: "string",
      empresa_creador: "string",
    }
    return rulesUser
  }
  Empresa () {
    return this.hasOne('App/Models/Company', 'empresa', '_id')
  }
}

module.exports = Equipo
