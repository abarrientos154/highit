'use strict'

const Helpers = use('Helpers')
const Solicitud = use("App/Models/Solicitud")
const Category = use("App/Models/Categoria")
// const mkdirp = use('mkdirp')
const { validate } = use("Validator")
// const fs = require('fs')
// var randomize = require('randomatic');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Solicitud
 */
class SolicitudController {
  /**
   * Show a list of all Solicitud.
   * GET Solicitud
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }
  
  async solicitudesCliente ({ params, request, response, view }) {
    let dat = request.all()
    let solicitudes = (await Solicitud.query().where({ status: dat.status, user_id: params.id }).fetch()).toJSON()
    response.send(solicitudes)
  }
  
  async solicitudesConsultor({ params, request, response, view }) {
    let dat = request.all()
    let solicitudes = (await Solicitud.query().where({ status: dat.status, consultor_id: params.id }).fetch()).toJSON()
    response.send(solicitudes)
  }
  
  async solicitudesCompany ({ params, request, response, view }) {
    let dat = request.all()
    let solicitudes = (await Solicitud.query().where({ status: dat.status, company_id: params.id }).fetch()).toJSON()
    response.send(solicitudes)
  }

  async solicitudesByConsultor ({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let dat = request.all()
    let solicitudes = []
    let categorias = (await Category.query().where({ departamento: user.departamento, area: user.area, cargo: user.cargo }).fetch()).toJSON()
    for (var i of categorias) {
      let slts = (await Solicitud.query().where({ status: dat.status, category: i._id }).fetch()).toJSON()
      for (var j of slts) {
        solicitudes.push(j)
      }
    }
    response.send(solicitudes)
  }

  /**
   * Render a form to be used for creating a new Solicitud.
   * GET Solicitud/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new Solicitud.
   * POST Solicitud
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Solicitud.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = requestAll
      const solicitud = await Solicitud.create(body)
      response.send(solicitud)
    }
  }

  /**
   * Display a single Solicitud.
   * GET Solicitud/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing Solicitud.
   * GET Solicitud/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update Solicitud details.
   * PUT or PATCH Solicitud/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let dat = request.all()
    let modificar = await Solicitud.query().where('_id', params.id).update({status: dat.status, consultor_id: dat.consultor_id})
    response.send(modificar)
  }

  /**
   * Delete a Solicitud with id.
   * DELETE Solicitud/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SolicitudController
