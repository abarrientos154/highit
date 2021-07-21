'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
  static get fillable() {
    return ['departamento' , 'nombre', 'area', 'cargo']
  }
  static fieldValidationRules() {
    const rulesUser = {
      departamento: "required",
      nombre: "required",
      area: "required",
      cargo: "required"
    }
    return rulesUser
  }
}

module.exports = Categoria
