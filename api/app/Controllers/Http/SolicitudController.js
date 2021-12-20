'use strict'

// const Helpers = use('Helpers')
const Solicitud = use("App/Models/Solicitud")
const Department = use("App/Models/Department")
const Contrato = use("App/Models/Contrato")
const Hito = use("App/Models/Hito")
const Category = use("App/Models/Categoria")
const moment = require('moment')
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
      for (let j of slts) {
        j.empresa = j.empresa.name
        j.cliente = j.cliente.name + ' ' + j.cliente.last_name
        j.consultor = j.consultor.name + ' ' + j.consultor.last_name
        j.color = j.prioridad.color === 'Azul' ? 'blue' : j.prioridad.color === 'Rojo' ? 'red' : j.prioridad.color === 'Verde' ? 'green' : j.prioridad.color === 'Amarillo' ? 'yellow' : j.prioridad.color === 'Rosado' ? 'pink' : j.prioridad.color === 'Gris' ? 'grey' : j.prioridad.color === 'Negro' ? 'black' : j.prioridad.color === 'Celeste' ? 'blue-3' : j.prioridad.color === 'Anaranjado' ? 'orange' : j.prioridad.color === 'Morado' ? 'purple' : 'brown'
        j.prioridad = j.prioridad.nombre
        j.categoria = j.categoria.nombre
        solicitudes.push(j)
      }
    }
    response.send(solicitudes)
  }
  
  async sltHistory ({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let solicitudes = []
    solicitudes = (await Solicitud.query().where({ $and: [{ $or: [{ user_id: user._id }, { consultor_id: user._id }] }, { status: 5 }] }).with('cliente').with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
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
    let solicitudes = []
    let slts = (await Solicitud.query().where({ user_id: params.id }).with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
    for (let j of slts) {
      j.prioridad.color2 = j.prioridad.color === 'Azul' ? 'blue' : j.prioridad.color === 'Rojo' ? 'red' : j.prioridad.color === 'Verde' ? 'green' : j.prioridad.color === 'Amarillo' ? 'yellow' : j.prioridad.color === 'Rosado' ? 'pink' : j.prioridad.color === 'Gris' ? 'grey' : j.prioridad.color === 'Negro' ? 'black' : j.prioridad.color === 'Celeste' ? 'blue-3' : j.prioridad.color === 'Anaranjado' ? 'orange' : j.prioridad.color === 'Morado' ? 'purple' : 'brown'
    }
    for (let j of slts.filter(v => v.status === 0 && !v.expiration)) {
      if (moment().diff(moment(j.dateSlt + ' ' + j.timeSlt), 'minutes') > j.prioridad.tiempo) {
        j.expiration = true
        await Solicitud.query().where({ _id: j._id }).update({ expiration: true })
      }
    }
    for (let i = 0; i < 7; i++) {
      solicitudes.push(slts.filter(v => v.status === i))
    }
    response.send(solicitudes)
  }
  
  async solicitudesConsultor({ params, request, response, view }) {
    let dat = request.all()
    let solicitudes = (await Solicitud.query().where({ status: dat.status, consultor_id: params.id }).fetch()).toJSON()
    for (let j of solicitudes.filter(v => v.status === 0 && !v.expiration)) {
      if (moment().diff(moment(j.dateSlt + ' ' + j.timeSlt), 'minutes') > j.prioridad.tiempo) {
        j.expiration = true
        await Solicitud.query().where({ _id: j._id }).update({ expiration: true })
      }
    }
    response.send(solicitudes)
  }
  
  async solicitudesCompany ({ params, request, response, view }) {
    let solicitudes = []
    let slts = (await Solicitud.query().where('company_id', params.id).with('cliente').with('consultor').with('prioridad').fetch()).toJSON()
    for (let j of slts.filter(v => v.status === 0 && !v.expiration)) {
      if (moment().diff(moment(j.dateSlt + ' ' + j.timeSlt), 'minutes') > j.prioridad.tiempo) {
        j.expiration = true
        await Solicitud.query().where({ _id: j._id }).update({ expiration: true })
      }
    }
    for (let i = 0; i < 7; i++) {
      solicitudes.push(slts.filter(v => v.status === i))
    }
    response.send(solicitudes)
  }

  async solicitudesByConsultor ({ request, response, view, auth }) {
    const user = (await auth.getUser()).toJSON()
    let solicitudes = [[],[],[],[],[],[],[]]
    let categorias = (await Category.query().where({ departamento: user.departamento, area: user.area, cargo: user.cargo }).fetch()).toJSON()
    for (let i of categorias) {
      let slts = (await Solicitud.query().where({ category: i._id }).with('empresa').with('consultor').with('equipo').with('prioridad').with('categoria').fetch()).toJSON()
      for (let j of slts.filter(v => v.status === 0 && !v.expiration)) {
        if (moment().diff(moment(j.dateSlt + ' ' + j.timeSlt), 'minutes') > j.prioridad.tiempo) {
          j.expiration = true
          await Solicitud.query().where({ _id: j._id }).update({ expiration: true })
        }
      }
      for (let j of slts) {
        j.prioridad.color2 = j.prioridad.color === 'Azul' ? 'blue' : j.prioridad.color === 'Rojo' ? 'red' : j.prioridad.color === 'Verde' ? 'green' : j.prioridad.color === 'Amarillo' ? 'yellow' : j.prioridad.color === 'Rosado' ? 'pink' : j.prioridad.color === 'Gris' ? 'grey' : j.prioridad.color === 'Negro' ? 'black' : j.prioridad.color === 'Celeste' ? 'blue-3' : j.prioridad.color === 'Anaranjado' ? 'orange' : j.prioridad.color === 'Morado' ? 'purple' : 'brown'
        if (j.status === 0) { solicitudes[0].push(j) } else if (j.consultor_id === user._id) {
          if (j.status === 1) { solicitudes[1].push(j) }
          if (j.status === 2) { solicitudes[2].push(j) }
          if (j.status === 3) { solicitudes[3].push(j) }
          if (j.status === 4) { solicitudes[4].push(j) }
          if (j.status === 5) { solicitudes[5].push(j) }
          if (j.status === 6) { solicitudes[6].push(j) }
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
    if (moment().diff(moment(solicitud.dateSlt + ' ' + solicitud.timeSlt), 'minutes') > solicitud.prioridad.tiempo) {
      solicitud.expiration = true
      await Solicitud.query().where({ _id: solicitud._id }).update({ expiration: true })
    }
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
