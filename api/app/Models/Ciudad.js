'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ciudad extends Model {
    static get fillable() {
        return ['name','estado_id']
    }
    static fieldValidationRules() {
        const rules = {
          estado_id: "required|string",
          name: "required|string"
        }
        return rules
    }
}

module.exports = Ciudad
