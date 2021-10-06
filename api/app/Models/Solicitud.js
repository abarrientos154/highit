'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Solicitud extends Model {
    static get fillable() {
        return ['name']
    }
    static fieldValidationRules() {
        const rules = {
          description: "required|string",
          priority: "required",
          category: "required",
          date: "required|string"
        }
        return rules
    }

    empresa () {
      return this.hasOne("App/Models/Company", "empresa_id", "_id")
    }

    cliente () {
      return this.hasOne("App/Models/User", "user_id", "_id")
    }

    consultor () {
      return this.hasOne("App/Models/User", "consultor_id", "_id")
    }

    equipo () {
      return this.hasOne("App/Models/Equipo", "equipment", "_id")
    }

    prioridad () {
      return this.hasOne("App/Models/Sla", "priority", "_id")
    }

    categoria () {
      return this.hasOne("App/Models/Categoria", "category", "_id")
    }
}

module.exports = Solicitud
