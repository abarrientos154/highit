'use strict'

// const Helpers = use('Helpers')
const Solicitud = use("App/Models/Solicitud")
const Department = use("App/Models/Department")
const Contrato = use("App/Models/Contrato")
const Hito = use("App/Models/Hito")
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
  async index ({ params, request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let solicitudes = []
    let categorias = (await Category.query().where({ departamento: user.departamento }).fetch()).toJSON()
    for (var i of categorias) {
      let slts = (await Solicitud.query().where({ $and: [{ $or: [{ status: 1 }, { status: 2 }, { status: 3 }, { status: 4 }, { status: 5 }] }, { company_id: params.id, category: i._id }] }).with('cliente').with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
      for (let j of slts) { solicitudes.push(j) }
    }
    for (let i of solicitudes) {
      i.empresa = i.empresa.name
      i.cliente = i.cliente.name + ' ' + i.cliente.last_name
      i.consultor = i.consultor.name + ' ' + i.consultor.last_name
      i.color = i.prioridad.color === 'Azul' ? 'blue' : i.prioridad.color === 'Rojo' ? 'red' : i.prioridad.color === 'Verde' ? 'green' : i.prioridad.color === 'Amarillo' ? 'yellow' : i.prioridad.color === 'Rosado' ? 'pink' : i.prioridad.color === 'Gris' ? 'grey' : i.prioridad.color === 'Negro' ? 'black' : i.prioridad.color === 'Celeste' ? 'blue-3' : i.prioridad.color === 'Anaranjado' ? 'orange' : i.prioridad.color === 'Morado' ? 'purple' : 'brown'
      i.prioridad = i.prioridad.nombre
      i.categoria = i.categoria.nombre
    }
    response.send(solicitudes)
  }
  
  async sltHistory ({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let solicitudes = []
    if (user.roles[0] === 3) {
      solicitudes = (await Solicitud.query().where({ status: 5, consultor_id: user._id }).with('cliente').with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
    } else {
      solicitudes = (await Solicitud.query().where({ status: 5, user_id: user._id }).with('cliente').with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
    }
    for (let i of solicitudes) {
      if (i.equipment) { i.equipo = i.equipo.name }
      i.empresa = i.empresa.name
      i.cliente = i.cliente.name + ' ' + i.cliente.last_name
      i.consultor = i.consultor.name + ' ' + i.consultor.last_name
      i.color = i.prioridad.color === 'Azul' ? 'blue' : i.prioridad.color === 'Rojo' ? 'red' : i.prioridad.color === 'Verde' ? 'green' : i.prioridad.color === 'Amarillo' ? 'yellow' : i.prioridad.color === 'Rosado' ? 'pink' : i.prioridad.color === 'Gris' ? 'grey' : i.prioridad.color === 'Negro' ? 'black' : i.prioridad.color === 'Celeste' ? 'blue-3' : i.prioridad.color === 'Anaranjado' ? 'orange' : i.prioridad.color === 'Morado' ? 'purple' : 'brown'
      i.prioridad = i.prioridad.nombre
      i.categoria = i.categoria.nombre
    }
    response.send(solicitudes)
  }
  
  async solicitudesCliente ({ params, request, response, view }) {
    let solicitudes = (await Solicitud.query().where({ user_id: params.id }).with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
    let statuSlts = []
    for (let i = 0; i < 7; i++) {
      statuSlts.push(solicitudes.filter(v => v.status === i))
    }
    response.send(statuSlts)
  }
  
  async solicitudesConsultor({ params, request, response, view }) {
    let dat = request.all()
    let solicitudes = (await Solicitud.query().where({ status: dat.status, consultor_id: params.id }).fetch()).toJSON()
    response.send(solicitudes)
  }
  
  async solicitudesCompany ({ params, request, response, view }) {
    let solicitudes = (await Solicitud.query().where('company_id', params.id).with('cliente').with('consultor').fetch()).toJSON()
    response.send(solicitudes)
  }

  async solicitudesByConsultor ({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let solicitudes = [[], [], [], [], [], [], []]
    let categorias = (await Category.query().where({ departamento: user.departamento, area: user.area, cargo: user.cargo }).fetch()).toJSON()
    for (var i of categorias) {
      let slts = (await Solicitud.query().where({ category: i._id }).with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
      for (var j of slts) {
        if (j.status === 0) {
          solicitudes[0].push(j)
        } else if (j.consultor_id === user._id) {
          if (j.status === 1) {
            solicitudes[1].push(j)
          } else if (j.status === 2) {
            solicitudes[2].push(j)
          } else if (j.status === 3) {
            solicitudes[3].push(j)
          } else if (j.status === 4) {
            solicitudes[4].push(j)
          } else if (j.status === 5) {
            solicitudes[5].push(j)
          } else if (j.status === 6) {
            solicitudes[6].push(j)
          }
        }
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
    let solicitud = await Solicitud.with('empresa').with('consultor').with('equipo').with('prioridad.Contrato').with('categoria.Departamento').find(params.id)
    solicitud.hitos = (await Hito.query().where({solicitud_id: params.id}).fetch()).toJSON()
    response.send(solicitud)
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
    let modificar = await Solicitud.query().where('_id', params.id).update(dat)
    response.send(modificar)
  }

  async expireSlt ({ params, request, response }) {
    let modificar = await Solicitud.query().where('_id', params.id).update({ expiration: true })
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
