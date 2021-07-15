'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with slas
 */
 const Sla = use("App/Models/Sla")
 const { validate } = use("Validator")
 const moment = require('moment')

class SlaController {
  /**
   * Show a list of all slas.
   * GET slas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    let datos = (await Sla.all()).toJSON()
    let formatearFecha = datos.map(v => {
      return {
        ...v,
        color2: v.color === 'Azul' ? 'blue' : v.color === 'Rojo' ? 'red' : 'green',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')

      }
    })
    response.send(formatearFecha)
  }

  /**
   * Render a form to be used for creating a new sla.
   * GET slas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sla.
   * POST slas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Sla.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(Sla.fillable)
      const nuevo = await Sla.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single sla.
   * GET slas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sla.
   * GET slas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sla details.
   * PUT or PATCH slas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sla with id.
   * DELETE slas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async destroy ({ params, request, response }) {
    let sla = (await Sla.find(params.id)).delete()
    response.send(sla)
  }
}

module.exports = SlaController
