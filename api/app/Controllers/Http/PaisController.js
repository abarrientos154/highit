'use strict'

const Pais = use("App/Models/Pais")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
// var randomize = require('randomatic');
const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class PaisController {
  async index ({ request, response, view }) {
    let datos = (await Pais.query().with('estados', 'ciudades').fetch()).toJSON()
    response.send(datos)
  }
  async paisById({ params, response }) {
    const pais = await Pais.find(params.id)
    response.send(pais)
  }
}

module.exports = PaisController
