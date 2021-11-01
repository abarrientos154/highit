'use strict'

const Helpers = use('Helpers')
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
 * Resourceful controller for interacting with charges
 */
class ChargeController {
  /**
   * Show a list of all charges.
   * GET charges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let charges = (await Charge.query().where({company_id: user.empresa}).fetch()).toJSON()
    response.send(charges)
  }

  /**
   * Render a form to be used for creating a new charges.
   * GET charges/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new charges.
   * POST charges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Charge.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = requestAll
      const nuevo = await Charge.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single charges.
   * GET charges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show ({ params, request, response, view }) {
    let datos = (await Charge.query().where({area_id: params.id}).fetch()).toJSON()
    response.send(datos)
}

  /**
   * Render a form to update an existing charges.
   * GET charges/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update charges details.
   * PUT or PATCH charges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a charges with id.
   * DELETE charges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    if (((await User.where({ cargo: params.id }).fetch()).toJSON()).length || ((await Categoria.where({ cargo: params.id }).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Eliminación fallida, este cargo esta en uso'
      }])
    } else {
      let eliminar = (await Charge.find(params.id)).delete()
      response.send(eliminar)
    }
  }
}

module.exports = ChargeController
