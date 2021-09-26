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

    consultor () {
      return this.hasOne("App/Models/User", "consultor_id", "_id")
    }
}

module.exports = Solicitud
