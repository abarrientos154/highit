'use strict'

const Helpers = use('Helpers')
const Company = use("App/Models/Company")
const mkdirp = use('mkdirp')
const { validate } = use("Validator")
const fs = require('fs')
// var randomize = require('randomatic');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class CompanyController {
  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let companys = (await Company.query().where({status: 1}).with('contrato').fetch()).toJSON()
    for (let i of companys) {
      i.contrato = i.contrato.contrato
    }
    response.send(companys)
  }

  async index2 ({ request, response, view }) {
    let companys = (await Company.query().where({status: 2}).fetch()).toJSON()
    response.send(companys)
  }

  async indexuser ({ request, response, view, auth }) {
    let user = (await auth.getUser()).toJSON()
    let companys = (await Company.query().where({company_id: user.empresa}).fetch()).toJSON()
    response.send(companys)
  }

  async companysByCompany ({ params, request, response, view }) {
    let companys = (await Company.query().where({company_id: params.id}).with('contrato').fetch()).toJSON()
    for (let i of companys) {
      i.contrato = i.contrato.contrato
    }
    response.send(companys)
  }

  /**
   * Render a form to be used for creating a new upload.
   * GET uploads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new upload.
   * POST uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Company.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await Company.query().where({ $and: [{ $or: [{ email: dat.email }, { phone: dat.phone }, { name: dat.name }, { businessName: dat.businessName }, { numIdet: dat.numIdet }] }] }).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Datos ya registrados en el sistema!'
      }])
    } else {
      let body = dat
      let company = await Company.create(body)
      let profilePic = request.file('PFiles', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/companyFiles')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/companyFiles'), {
          name: company._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      response.send(company)
    }
  }

  /**
   * Display a single upload.
   * GET uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let company = await Company.find(params.id)
    response.send(company)
  }

  /**
   * Render a form to update an existing upload.
   * GET uploads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update upload details.
   * PUT or PATCH uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Company.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = dat
      if (body.img) {
        let profilePic = request.file('PFiles', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/companyFiles')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/companyFiles'), {
            name: params.id,
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
      }
      delete body.img
      let modificar = await Company.where({_id: params.id}).update(body)
      response.send(modificar)
    }
  }

  async updateEnable ({ params, response, request }) {
    let body = request.all()
    let modificar = await Company.where({_id: params.id}).update(body)
    response.send(modificar)
  }

  /**
   * Delete a upload with id.
   * DELETE uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    fs.unlink(`storage/uploads/companyFiles/${params.id}`, (err) => {
      if (err) throw err
    })
    let companyDestroy = (await Company.find(params.id)).delete()
    response.send(companyDestroy)
  }
}

module.exports = CompanyController
