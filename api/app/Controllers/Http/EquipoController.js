'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with equipos
 */
 const Equipo = use("App/Models/Equipo")
 const { validate } = use("Validator")

class EquipoController {
  /**
   * Show a list of all equipos.
   * GET equipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    let datos = (await Equipo.query().where({}).with('Empresa').fetch()).toJSON()
    response.send(datos)
  }

  async equipos_consultor ({ request, response, view, auth }) {
    let user = (await auth.getUser()).toJSON()
    console.log(user, 'wacha')
    let datos = (await Equipo.query().where({empresa: user.empresa}).with('Empresa').fetch()).toJSON()
    response.send(datos)
  }

  async equipos_cliente ({ request, response, view, auth }) {
    let user = (await auth.getUser()).toJSON()
    let datos = (await Equipo.query().where({cliente: user._id}).with('Empresa').fetch()).toJSON()
    response.send(datos)
  }

  /**
   * Render a form to be used for creating a new equipo.
   * GET equipos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new equipo.
   * POST equipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Equipo.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(Equipo.fillable)
      const datos = await Equipo.create(body)
      response.send(datos)
    }
  }

  /**
   * Display a single equipo.
   * GET equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, response }) {
    const datos = await Equipo.find(params.id)
    response.send(datos)
  }

  /**
   * Render a form to update an existing equipo.
   * GET equipos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update equipo details.
   * PUT or PATCH equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async update ({ params, response, request }) {
    let body = request.only(Equipo.fillableEdit)
    await Equipo.query().where({ _id: params.id }).update(body)
    response.send(body)
  }

  async asignarEquipo ({ params, response, request }) {
    let body = request.all()
    const datos = await Equipo.query().where({ _id: params.id }).update(body)
    response.send(datos)
  }

  /**
   * Delete a equipo with id.
   * DELETE equipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    let datos = (await Equipo.find(params.id)).delete()
    response.send(datos)
  }
}

module.exports = EquipoController
