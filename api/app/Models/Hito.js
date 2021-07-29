'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hito extends Model {
    static get fillable() {
        return ['name','solicitud_id']
    }
    static fieldValidationRules() {
        const rules = {
            solicitud_id: "required|string",
            name: "required|string"
        }
        return rules
    }
}

module.exports = Hito
