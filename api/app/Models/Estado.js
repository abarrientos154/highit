'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Estado extends Model {
    static get fillable() {
        return ['name','pais_id']
    }
    static fieldValidationRules() {
        const rules = {
          pais_id: "required|string",
          name: "required|string"
        }
        return rules
    }
}

module.exports = Estado
