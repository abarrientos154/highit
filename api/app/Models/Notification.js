'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
    static get fillable() {
        return ['user_id']
    }
    static fieldValidationRules() {
        const rules = {
          user_id: "required"
        }
        return rules
    }
}

module.exports = Notification
