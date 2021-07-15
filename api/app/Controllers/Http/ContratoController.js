'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contratoes
 */

 const Contrato = use("App/Models/Contrato")
 const { validate } = use("Validator")
 const moment = require('moment')

class ContratoController {
  /**
   * Show a list of all contratoes.
   * GET contratoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let contratos = (await Contrato.all()).toJSON()
    let formatearFecha = contratos.map(v => {
      return {
        ...v,
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }

  /**
   * Render a form to be used for creating a new contrato.
   * GET contratoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new contrato.
   * POST contratoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Contrato.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(Contrato.fillable)
      const nuevo = await Contrato.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single contrato.
   * GET contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing contrato.
   * GET contratoes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update contrato details.
   * PUT or PATCH contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async update ({ params, request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Contrato.fieldValidationRules())
    if (validation.fails()) {
    } else {
      let body = request.only(Contrato.fillable)
      const contrato = await Contrato.where({_id: params.id}).update(body)
      response.send(contrato)
    }
  }

  /**
   * Delete a contrato with id.
   * DELETE contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    let contrato = (await Contrato.find(params.id)).delete()
    response.send(contrato)
  }
}

module.exports = ContratoController
