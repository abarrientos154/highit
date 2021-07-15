'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pais extends Model {
    static get fillable() {
        return ['name',"ubicacion"]
    }
    static fieldValidationRules() {
        const rules = {
          name: "required|string"
        }
        return rules
    }
    estados () {
        return this.hasMany("App/Models/Estado", "id", "pais_id")
    }
    ciudades () {
        return this.hasMany("App/Models/Ciudad", "id", "estado_id")
    }
}

module.exports = Pais
