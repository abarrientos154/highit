'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Charge extends Model {
    static get fillable() {
        return ['name','area_id']
    }
    static fieldValidationRules() {
        const rules = {
            area_id: "required|string",
            name: "required|string"
        }
        return rules
    }
}

module.exports = Charge
