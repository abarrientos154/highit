'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {
    static get fillable() {
        return ['name','company_id']
    }
    static fieldValidationRules() {
        const rules = {
            company_id: "required|string",
            name: "required|string"
        }
        return rules
    }
}

module.exports = Department
