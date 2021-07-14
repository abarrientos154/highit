"use strict";

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
const User = use("App/Models/User")
const Role = use("App/Models/Role")
const { validate } = use("Validator")
const Email = use("App/Functions/Email")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let users = await User.all();
    response.send(users);
  }

  async show({ request, response, auth }) {
    user_id = ((await auth.getUser()).toJSON())._id
    let modelo = {
      accion: 'show',
      modelo: 'User',
      unique_key: { field: '_id', value: user_id }
    }
    let data = await Crud.crud(modelo)
    response.send(data)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async registerProveedor({ request, response }) {
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      const validation = await validate(dat, User.fieldValidationRulesProveedor())
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages())
      } else if (((await User.where({email: dat.email}).fetch()).toJSON()).length) {
        response.unprocessableEntity([{
          message: 'Correo ya registrado en el sistema!'
        }])
      } else {
        let images_ident = []
        for (let i = 0; i < 2; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('IFiles' + i, {
            types: ['image']
          })
          if (Helpers.appRoot('storage/uploads/identificacionFiles')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/identificacionFiles'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images_ident.push(profilePic.fileName)
        }

        let body = dat
        body.estatus = 0 // Estatus para verificacion del Proveedor
        body.roles = [3]
        body.images_ident = images_ident
        body.tienda.calificacion = 0
        const user = await User.create(body)

        const profilePic2 = request.file('PFiles', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/tiendaFiles')) {
          await profilePic2.move(Helpers.appRoot('storage/uploads/tiendaFiles'), {
            name: user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }

        const profilePic3 = request.file('RFiles', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/perfil')) {
          await profilePic3.move(Helpers.appRoot('storage/uploads/perfil'), {
            name: user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        const data = { name: profilePic3.fileName }
        response.send(user)
      }
  }

  async editProveedor({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let body = request.all()
    delete body.tienda.country
    delete body.tienda.city
    let editar = await User.query().where('_id', user._id).update(body)
    response.send(editar)
  }

  async validateEmail({ request, response, params }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!',
        error: true
      }])
    } else {
      response.send({error: false})
    }
  }

  async allUser({ request, response, auth }) {
    let allUsers = (await User.query().where({}).fetch()).toJSON()
    let users = allUsers.filter(v => v.email !== 'admin@triyus.com')
    response.send(users)
  }

  async userLogueado({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    response.send(user)
  }

  async userInfo({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    response.send(user)
  }

  async userById({ params, response }) {
    const user = await User.find(params.id)
    response.send(user)
  }

  async userByRol({ request, params, response }) {
    try {
      let rol = request.all()
      const user = (await User.query().where({roles: rol.rol}).fetch()).toJSON()
      response.send(user)
    } catch (error) {
      console.error('user by rol: ' + error.name + ':' + error.message)
    }
  }

  async userByStatus({ request, params, response }) {
    let rol = request.all()
    const user = (await User.query().where({roles: rol.rol, estatus: 0}).fetch()).toJSON()
    response.send(user)
  }

  async userStatus({ params, request, response }) {
    let dat = request.all()
    let modificar = await User.query().where('_id', params.id).update({estatus: dat.estatus})
    response.send(modificar)
  }

  async update({ request, response, params }) {

  }

  async destroy({ params, request, response }) {
    const { id } = params;
    const user = await User.find(id);
    await user.delete();
  }

  async login({ auth, request }) {
    const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    const user = (await User.findBy('email', email)).toJSON()
    let isUser = false
    token.roles = user.roles.map(roleMap => {
      if (roleMap === 3) {
        isUser = true
      }
      return roleMap
    })
    let userRoles = await Role.whereIn('id', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2)
      })
    })

    token.email = user.email
    token.estatus = user.estatus
    token.full_name = user.full_name ? user.full_name : null
    token.last_name = user.last_name
    let data = {}
    data.TRI_SESSION_INFO = token
    return data
  }

}

module.exports = UserController;
