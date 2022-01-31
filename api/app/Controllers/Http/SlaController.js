'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with slas
 */
 const Sla = use("App/Models/Sla")
 const Solicitud = use("App/Models/Solicitud")
 const { validate } = use("Validator")
const Request = require('@adonisjs/framework/src/Request')
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
   async index ({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let datos = []
    if (user.roles[0] === 1) {
      datos = (await Sla.query().where({status: 1}).fetch()).toJSON()
    } else {
      datos = (await Sla.query().where({company_id: user.empresa}).fetch()).toJSON()
    }
    let formatearFecha = datos.map(v => {
      return {
        ...v,
        color2: v.color === 'Azul' ? 'blue' : v.color === 'Rojo' ? 'red' : v.color === 'Verde' ? 'green' : v.color === 'Amarillo' ? 'yellow' : v.color === 'Rosado' ? 'pink' : v.color === 'Gris' ? 'grey' : v.color === 'Negro' ? 'black' : v.color === 'Celeste' ? 'blue-3' : v.color === 'Anaranjado' ? 'orange' : v.color === 'Morado' ? 'purple' : 'brown',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')

      }
    })
    response.send(formatearFecha)
  }

  async slaByCompany ({ params, request, response, view }) {
    let datos = (await Sla.query().where({company_id: params.id}).fetch()).toJSON()
    let formatearFecha = datos.map(v => {
      return {
        ...v,
        color2: v.color === 'Azul' ? 'blue' : v.color === 'Rojo' ? 'red' : v.color === 'Verde' ? 'green' : v.color === 'Amarillo' ? 'yellow' : v.color === 'Rosado' ? 'pink' : v.color === 'Gris' ? 'grey' : v.color === 'Negro' ? 'black' : v.color === 'Celeste' ? 'blue-3' : v.color === 'Anaranjado' ? 'orange' : v.color === 'Morado' ? 'purple' : 'brown',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')

      }
    })
    response.send(formatearFecha)
  }

  
  async filterByContracts ({ params, request, response, view, auth }) {
    let datos = (await Sla.query().where(request.get()).fetch()).toJSON()
    let formatData = datos.map(v => {
      return {
        ...v,
        color2: v.color === 'Azul' ? 'blue' : v.color === 'Rojo' ? 'red' : v.color === 'Verde' ? 'green' : v.color === 'Amarillo' ? 'yellow' : v.color === 'Rosado' ? 'pink' : v.color === 'Gris' ? 'grey' : v.color === 'Negro' ? 'black' : v.color === 'Celeste' ? 'blue-3' : v.color === 'Anaranjado' ? 'orange' : v.color === 'Morado' ? 'purple' : 'brown',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')

      }
    })
    response.send(formatData)
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
      let body = requestAll
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
    let datos = (await Sla.query().where({contrato: params.id}).fetch()).toJSON()
    let formatearFecha = datos.map(v => {
      return {
        ...v,
        color2: v.color === 'Azul' ? 'blue' : v.color === 'Rojo' ? 'red' : v.color === 'Verde' ? 'green' : v.color === 'Amarillo' ? 'yellow' : v.color === 'Rosado' ? 'pink' : v.color === 'Gris' ? 'grey' : v.color === 'Negro' ? 'black' : v.color === 'Celeste' ? 'blue-3' : v.color === 'Anaranjado' ? 'orange' : v.color === 'Morado' ? 'purple' : 'brown',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')

      }
    })
    response.send(formatearFecha)
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
    if (((await Solicitud.where({ priority: params.id }).fetch()).toJSON()).length) {
      response.send({
        code: 'Eliminación fallida, esta prioridad esta en uso'
      })
    } else {
      let sla = (await Sla.find(params.id)).delete()
      response.send(sla)
    }
  }
}

module.exports = SlaController
