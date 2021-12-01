'use strict'

const Notification = use("App/Models/Notification")
const { validate } = use("Validator")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NotificationController {
  async index ({ auth, response }) {
    let user = (await auth.getUser()).toJSON()
    let datos = (await Notification.query().where({ user_id: user._id }).fetch()).toJSON()
    response.send(datos)
  }

  async index2 ({ auth, response }) {
    let user = (await auth.getUser()).toJSON()
    let datos = (await Notification.query().where({ user_id: user._id, status: false }).fetch()).toJSON()
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
