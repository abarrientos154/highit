'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {
    static get fillable() {
        return ['name','empresa_id']
    }
    static fieldValidationRules() {
        const rules = {
            empresa_id: "required|string",
            name: "required|string"
        }
        return rules
    }
}

module.exports = Department
