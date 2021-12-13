'use strict'

const Security = use("App/Models/Security")
// const { validate } = use("Validator")
// const Helpers = use('Helpers')
// const mkdirp = use('mkdirp')
// const fs = require('fs')
// var randomize = require('randomatic');
// const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class SecurityController {
  async index ({ request, response, view }) {
    let datos = (await Security.query().where({}).fetch()).toJSON()
    response.send(datos)
  }
  async show ({ params, response }) {
    const datos = await Security.find(params.id)
    response.send(datos)
  }
}

module.exports = SecurityController
