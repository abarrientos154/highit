'use strict'

const Helpers = use('Helpers')
const Hito = use("App/Models/Hito")
// const mkdirp = use('mkdirp')
const { validate } = use("Validator")
/* const fs = require('fs')
var randomize = require('randomatic'); */


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Hito
 */
class HitoController {
  /**
   * Show a list of all Hito.
   * GET Hito
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new Hito.
   * GET Hito/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new Hito.
   * POST Hito
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Hito.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = requestAll
      const nuevo = await Hito.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single Hito.
   * GET Hito/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {
    let hitos = (await Hito.query().where({company_id: params.id}).fetch()).toJSON()
    response.send(hitos)
  }

  async history({
    params,
    request,
    response,
    view
  }) {
    let hitos = (await Hito.query().where({solicitud_id: params.id}).fetch()).toJSON()
    response.send(hitos)
  }

  /**
   * Render a form to update an existing Hito.
   * GET Hito/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update Hito details.
   * PUT or PATCH Hito/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a Hito with id.
   * DELETE Hito/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = HitoController
