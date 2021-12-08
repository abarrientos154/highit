'use strict'

const Notification = use("App/Models/Notification")
const Categoria = use("App/Models/Categoria")
const { validate } = use("Validator")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NotificationController {
  async index ({ auth, response }) {
    let user = (await auth.getUser()).toJSON()
    let datos = []
    if (user.roles[0] === 3) {
      let categorias = (await Categoria.query().where({ departamento: user.departamento, area: user.area, cargo: user.cargo }).fetch()).toJSON()
      for (const i of categorias) {
        const ntf = (await Notification.query().where({ $or: [{ user_id: user._id }, { user_id: i._id }] }).fetch()).toJSON()
        for (const j of ntf) { datos.push(j) }
      }
    } else {
      datos = (await Notification.query().where({ user_id: user._id }).fetch()).toJSON()
    }
    response.send(datos)
  }

  async store({ request, response }) {
    let body = request.all()
    const validation = await validate(body, Notification.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const nuevo = await Notification.create(body)
      response.send(nuevo)
    }
  }

  async update ({ params, response, request }) {
    let body = request.all()
    let modificar = await Notification.query().where({ _id: params.id }).update(body)
    response.send(modificar)
  }
}

module.exports = NotificationController
