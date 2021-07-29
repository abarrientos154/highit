'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {

  static get fillableEditUser() {
    return ['name', 'last_name', 'phone', 'email', 'Dni', 'empresa', 'departamento', 'area' , 'cargo']
  }
  static get fillable() {
    return ['name','last_name','phone', 'email', 'Dni', 'password', 'empresa', 'departamento', 'area' , 'cargo']
  }

  static fieldValidationRules() {
    const rulesUser = {
      email: 'required|email',
      Dni: 'required',
      name: 'required',
      last_name: 'required',
      phone: 'required',
      password: 'required|string|max:256'
    }
    return rulesUser
  }

  static fieldejemplo() {
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

  static fieldejemplo2(datos) {
    const rulesUser = {
      email: 'required|email',
      Dni: 'required',
      name: 'required',
      last_name: 'required',
      phone: 'required',
      password: 'required|string|max:256',
      empresa_creador:'string'
      /* empresa: 'string',  rol 4

      departamento: 'string', rol 3
      area: 'string',
      cargo: 'string' */
    }
    if (datos.roles === 3) {
      console.log('rol 3')
      rulesUser.departamento = 'required'
      rulesUser.area = 'required'
      rulesUser.cargo = 'required'
    } else {
      console.log('rol 4')
      rulesUser.empresa = 'required'
    }

    return rulesUser
  }

  static fieldValidationRulesProveedor() {
    const rulesUser = {
      email: 'required|email',
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

  paisUser () {
    return this.hasOne("App/Models/Pais", "country_id", "_id")
  }

  ciudadUser () {
    return this.hasOne("App/Models/Ciudad", "city_id", "_id")
  }
  // static get objectIDs () { return [ 'country_id','_id', 'city_id' ] }
}

module.exports = User
