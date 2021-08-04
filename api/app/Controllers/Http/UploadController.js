'use strict'

const Helpers = use('Helpers')
const Conocimiento = use("App/Models/Conocimiento")

/* const mkdirp = use('mkdirp')
const { validate } = use("Validator")
const fs = require('fs')
var randomize = require('randomatic'); */


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  async getLogo ({ request, response, auth }) {
    response.download(Helpers.appRoot('public/logo.png'))
  }

  async getarchivo ({ request, response, params }) {
    let conocimiento = (await Conocimiento.find(params.id)).toJSON()
    response.attachment(
      Helpers.appRoot('storage/uploads/ConocimientoFiles/' + conocimiento.archivos[parseInt(params.file)])
    )
  }

  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new upload.
   * GET uploads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new upload.
   * POST uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {}

  /**
   * Display a single upload.
   * GET uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing upload.
   * GET uploads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update upload details.
   * PUT or PATCH uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  async newimagen ({ request, response, params }) {
    // let user = (await auth.getUser()).toJSON()
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    // console.log(user, 'asd')
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/perfil')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/perfil'), {
          name: params.user_id,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        response.send(params.user_id)
      }
    }
  }

  /**
   * Delete a upload with id.
   * DELETE uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}

  async getFileByDirectoryPerfil ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/perfil') + `/${dir}`)
  }

  async getFileByDirectoryCompany ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/companyFiles') + `/${dir}`)
  }
}

module.exports = UploadController
