'use strict'

const Estado = use("App/Models/Estado")
// const { validate } = use("Validator")
// const Helpers = use('Helpers')
// const mkdirp = use('mkdirp')
// const fs = require('fs')
// var randomize = require('randomatic');
// const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class EstadoController {
  async index ({ params, request, response, view }) {
    let estados = (await Estado.query().where({ pais_id: parseInt(params.id) }).fetch()).toJSON()
    response.send(estados)
  }
  async estadoById({ params, response }) {
    const estado = await Estado.find(params.id)
    response.send(estado)
  }
}

module.exports = EstadoController
