"use strict";

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
const User = use("App/Models/User")
const Role = use("App/Models/Role")
const { validate } = use("Validator")
const Email = use("App/Functions/Email")
const Hash = use('Hash')

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

  async updateUser ({ params, response, request }) {
    let body = request.only(User.fillable)
    if (((await User.where({ $and: [{ $or: [{ email: body.email }, { phone: body.phone }, { Dni: body.Dni }] }] }).fetch()).toJSON()).filter(v => v._id !== params.id).length) {
      response.send({
        code: 'Datos ya registrados en el sistema!'
      })
    } else {
      await User.query().where({ _id: params.id }).update(body)
      response.send(body)
    }
  }

  async index({ request, response, view, auth }) {
    let user = (await auth.getUser()).toJSON()
    if (user.roles[0] === 1) {
      let users = (await User.query().where({ roles: 2 }).fetch()).toJSON()
      response.send(users);
    } else {
      let users = (await User.query().where({ $and: [ {$or:[  { roles: [3] }, { roles: [4] }, { roles: [5] }, { roles: [6] }, { roles: [7] }]}, { empresa_creador: user.empresa } ] }).fetch()).toJSON()
      let formatearDatos = users.map(v => {
        return {
          ...v,
          tipo_usuario: v.roles[0] === 3 ? 'Consultor' : v.roles[0] === 4 ? 'Cliente Final' : v.roles[0] === 5 ? 'Consultor Administrador' : v.roles[0] === 6 ? 'Cliente Administrador' : 'Gerente'
        }
      })
      response.send(formatearDatos);
    }
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

  async userLogueado({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    response.send(user)
  }
  
  async userEmail({ params, response }) {
    const user = (await User.query().where({email: params.email}).with('empresa_user').fetch()).toJSON()
    response.send(user)
  }

  async userById({ params, response }) {
    const user = await User.find(params.id)
    response.send(user)
  }

  async userConsultor({ request, params, response }) {
    try {
      let user = (await User.query().where({roles: 3, company: params.id}).with('department').fetch()).toJSON()
      for (let i of user) {
        i.department = i.department.name
      }
      response.send(user)
    } catch (error) {
      console.error('user by rol: ' + error.name + ':' + error.message)
    }
  }

  async userCliente({ request, params, response }) {
    try {
      const user = (await User.query().where({roles: 4, empresa: params.id}).fetch()).toJSON()
      response.send(user)
    } catch (error) {
      console.error('user by rol: ' + error.name + ':' + error.message)
    }
  }

  async usersClientes({ request, params, response }) {
    try {
      const user = (await User.query().where({ $and: [{ $or: [{ roles: 4 }, { roles: 6 }] }, { company: params.id }] }).fetch()).toJSON()
      response.send(user)
    } catch (error) {
      console.error('user by rol: ' + error.name + ':' + error.message)
    }
  }

  async update({ request, response, params }) {
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
    data.HIGHIT_SESSION_INFO = token
    return data
  }


  async registerUser({ request, response }) {
    let dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)

    const validation = await validate(dat, User.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({ $and: [{ $or: [{ email: dat.email }, { phone: dat.phone }, { Dni: dat.Dni }] }] }).fetch()).toJSON()).length) {
      response.send({
        code: 'Datos ya registrados en el sistema!'
      })
    } else {
      let body = dat
      const rol = body.roles
      body.roles = [rol]

      const user = await User.create(body)
      const profilePic = request.file('perfil', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/perfil')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/perfil'), {
          name: user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      response.send(user)
    }
  }

  async changePassword ({ request, response, params }) {
    // get currently authenticated user
    const user = await User.find(params.id)

    // verify if current password matches
    let verifyPassword = false
    if (request.input('password')) {
      verifyPassword = await Hash.verify(request.input('password'), user.password)
    } else if (request.input('answer') && request.input('answer2')) {
      if (request.input('answer') === user.security.answer && request.input('answer2') === user.security.answer2) {
        verifyPassword = true
      }
    }

    // display appropriate message
    if (!verifyPassword) {
      response.unprocessableEntity([{
        message: request.input('password') ? 'Contraseña actual incorrecta' : 'Respuestas invalidas'
      }])
    } else {
      user.password = request.input('newPassword')
      await user.save()
      response.send(user)
    }
  }

  async destroy({ params, request, response }) {
    const { id } = params;
    const user = await User.find(id);
    await user.delete();
    response.send(user)
  }
}

module.exports = UserController;
