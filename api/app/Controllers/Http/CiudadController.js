'use strict'

const Ciudad = use("App/Models/Ciudad")
// const { validate } = use("Validator")
// const Helpers = use('Helpers')
// const mkdirp = use('mkdirp')
// const fs = require('fs')
// var randomize = require('randomatic');
// const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CiudadController {
  async index ({ params, request, response, view }) {
    let ciudades = (await Ciudad.query().where({ estado_id: parseInt(params.id) }).fetch()).toJSON()
    response.send(ciudades)
  }
  async ciudadById({ params, response }) {
    const ciudad = await Ciudad.find(params.id)
    response.send(ciudad)
  }
}

module.exports = CiudadController
