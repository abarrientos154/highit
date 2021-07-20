'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Area extends Model {
    static get fillable() {
        return ['name','department_id']
    }
    static fieldValidationRules() {
        const rules = {
            department_id: "required|string",
            name: "required|string"
        }
        return rules
    }
}

module.exports = Area
