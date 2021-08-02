'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with conocimientos
 */
 const Helpers = use('Helpers')
 const Conocimiento = use("App/Models/Conocimiento")
 const mkdirp = use('mkdirp')
 const { validate } = use("Validator")
 var randomize = require('randomatic');
 const fs = require('fs')

class ConocimientoController {
  /**
   * Show a list of all conocimientos.
   * GET conocimientos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    let datos = (await Conocimiento.query().where({}).fetch()).toJSON()
    response.send(datos)
  }

  async conocimientoById({ params, response }) {
    const datos = await Conocimiento.find(params.id)
    response.send(datos)
  }

  /**
   * Render a form to be used for creating a new conocimiento.
   * GET conocimientos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new conocimiento.
   * POST conocimientos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let requestAll = request.all()
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)

    const validation = await validate(dat, Conocimiento.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    }
     else {
      let archivocono = []
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const archivos = request.file('archivos' + i, {})
          if (Helpers.appRoot('storage/uploads/ConocimientoFiles')) {
            await archivos.move(Helpers.appRoot('storage/uploads/ConocimientoFiles'), {
              name: codeFile + '.' + archivos.extname,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          archivocono.push(archivos.fileName)
        }
      }

      let body = dat
      if (archivocono.length > 0) {
        body.archivos = archivocono
        delete body.cantidadArchivos
      }
      body.creador = user._id
      const datos = await Conocimiento.create(body)
      response.send(datos)
   }
 }

  /**
   * Display a single conocimiento.
   * GET conocimientos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const datos = await Conocimiento.find(params.id)
    response.send(datos)
  }

  /**
   * Render a form to update an existing conocimiento.
   * GET conocimientos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update conocimiento details.
   * PUT or PATCH conocimientos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Conocimiento.fieldEdit())
    if (validation.fails()) {
    } else {
      let body = requestAll
      const datos = await Conocimiento.where({_id: params.id}).update(body)
      response.send(datos)
    }
  }

  async editArchivos ({ params, request, response, auth }) {
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      let archivocono = []
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const archivos = request.file('archivos' + i, {})
          if (Helpers.appRoot('storage/uploads/ConocimientoFiles')) {
            await archivos.move(Helpers.appRoot('storage/uploads/ConocimientoFiles'), {
              name: codeFile + '.' + archivos.extname,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          archivocono.push(archivos.fileName)
        }
      }

      let conocimiento = (await Conocimiento.find(params.id)).toJSON()
      for (let j of conocimiento.archivos) {
        await fs.unlinkSync(Helpers.appRoot(`storage/uploads/ConocimientoFiles/${j}`))
      }

      let body = dat
      if (archivocono.length > 0) {
        body.archivos = archivocono
        delete body.cantidadArchivos
      }

      const datos = await Conocimiento.query().where({_id: params.id}).update(body)
      response.send(datos)

   }

  /**
   * Delete a conocimiento with id.
   * DELETE conocimientos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ConocimientoController
