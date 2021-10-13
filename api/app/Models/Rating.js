'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rating extends Model {
    static get fillable() {
        return ['number','solicitud_id']
    }
    static fieldValidationRules() {
        const rules = {
            solicitud_id: "required",
            number: "required"
        }
        return rules
    }
}

module.exports = Rating
