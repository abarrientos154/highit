'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contratoes
 */

 const Contrato = use("App/Models/Contrato")
 const Sla = use("App/Models/Sla")
 const Company = use("App/Models/Company")
 const Solicitud = use("App/Models/Solicitud")
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
    let contratos = (await Contrato.query().where({status: 1}).fetch()).toJSON()
    let formatearFecha = contratos.map(v => {
      return {
        ...v,
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }

  async contratosByCompany ({ params, request, response, view }) {
    let contratos = (await Contrato.query().where({company_id: params.id}).fetch()).toJSON()
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
      let body = requestAll
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
      let body = requestAll
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
    if (((await Company.where({ typeContract: params.id }).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Eliminación fallida, este contrato esta en uso'
      }])
    } else {
      /* let eliminar = true
      const slasByContrato = (await Sla.query().where({ contrato: params.id }).fetch()).toJSON()
      for (let i of slasByContrato) {
        if (((await Solicitud.where({ priority: i._id }).fetch()).toJSON()).length) {
          eliminar = false
        }
      }
      if (eliminar) {
        for (let i of slasByContrato) { (await Sla.find(i._id)).delete() }
        let contrato = (await Contrato.find(params.id)).delete()
        response.send(contrato)
      } else {
        response.unprocessableEntity([{
          message: 'Eliminación fallida, prioridades del contrato en uso'
        }])
      } */
      const slasByContrato = (await Sla.query().where({ contrato: params.id }).fetch()).toJSON()
      for (let i of slasByContrato) { (await Sla.find(i._id)).delete() }
      let contrato = (await Contrato.find(params.id)).delete()
      response.send(contrato)
    }
  }
}

module.exports = ContratoController
