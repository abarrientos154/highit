'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get fillable() {
    return ['name', 'last_name', 'phone', 'email', 'Dni', 'empresa', 'departamento', 'area' , 'cargo', 'security']
  }

  static fieldValidationRules() {
    const rulesUser = {
      email: 'required|email',
      Dni: 'required',
      name: 'required',
      last_name: 'required',
      phone: 'required',
      empresa: 'required',
      password: 'required|string|max:256'
    }
    return rulesUser
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  department () {
    return this.hasOne("App/Models/Department", "departamento", "_id")
  }

  empresa_user () {
    return this.hasOne("App/Models/Company", "empresa", "_id")
  }

  paisUser () {
    return this.hasOne("App/Models/Pais", "country_id", "_id")
  }

  ciudadUser () {
    return this.hasOne("App/Models/Ciudad", "city_id", "_id")
  }
  // static get objectIDs () { return [ 'country_id','_id', 'city_id' ] }
}

module.exports = User
