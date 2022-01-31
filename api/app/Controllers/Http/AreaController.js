'use strict'

const Helpers = use('Helpers')
const Area = use("App/Models/Area")
const Charge = use("App/Models/Charge")
const User = use("App/Models/User")
const Categoria = use("App/Models/Categoria")
const mkdirp = use('mkdirp')
const { validate } = use("Validator")
const fs = require('fs')
// var randomize = require('randomatic');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Area
 */
class AreaController {
  /**
   * Show a list of all Area.
   * GET Area
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let areas = (await Area.query().where({company_id: user.empresa}).fetch()).toJSON()
    response.send(areas)
  }

  /**
   * Render a form to be used for creating a new Area.
   * GET Area/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new Area.
   * POST Area
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Area.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = requestAll
      const nuevo = await Area.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single Area.
   * GET Area/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
      let datos = (await Area.query().where({department_id: params.id}).fetch()).toJSON()
      response.send(datos)
  }

  /**
   * Render a form to update an existing Area.
   * GET Area/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update Area details.
   * PUT or PATCH Area/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a Area with id.
   * DELETE Area/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    if (((await User.where({ area: params.id }).fetch()).toJSON()).length || ((await Categoria.where({ area: params.id }).fetch()).toJSON()).length) {
      response.send({
        code: 'Eliminación fallida, esta area esta en uso'
      })
    } else {
      const chargesByArea = (await Charge.query().where({area_id: params.id}).fetch()).toJSON()
      for (let i of chargesByArea) {
        (await Charge.find(i._id)).delete()
      }
      let eliminar = (await Area.find(params.id)).delete()
      response.send(eliminar)
    }
  }
}

module.exports = AreaController
