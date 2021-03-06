'use strict'

const Notification = use("App/Models/Notification")
const Categoria = use("App/Models/Categoria")
const User = use("App/Models/User")
const Email = use("App/Functions/Email")
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
      const template = `
        <center>
          <img src="https://highit.eiche.cl/header.jpg" style="width: 100%"/>
          <h3>
            <b>
              ${body.description}
            </b>
          </h3>
          <img src="https://highit.eiche.cl/footer.png" style="width: 100%"/>
        </center>
      `
      const categoria = await Categoria.query().where({ _id: body.user_id }).first()
      if (categoria) {
        let users = (await User.query().where({ departamento: categoria.departamento, area: categoria.area, cargo: categoria.cargo }).fetch()).toJSON()
        for (const i of users) {
          await Email.sendMail(i.email, body.name, template)
        }
      } else {
        let user = await User.query().where({ _id: body.user_id }).first()
        if (user) {
          await Email.sendMail(user.email, body.name, template)
        }
      }
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
