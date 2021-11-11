'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categorias
 */
 const Categoria = use("App/Models/Categoria")
 const Solicitud = use("App/Models/Solicitud")
 const { validate } = use("Validator")
 const moment = require('moment')

class CategoriaController {
  /**
   * Show a list of all categorias.
   * GET categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view, auth }) {
    let user = (await auth.getUser()).toJSON()
    let datos = (await Categoria.query().where({company_id: user.empresa}).with('Area').with('Departamento').with('Cargo').fetch()).toJSON()
    let formatData = datos.map(v => {
      return {
        ...v,
        departamentoName: v.Departamento.name
      }
    })
    response.send(formatData)
  }

  /**
   * Render a form to be used for creating a new categoria.
   * GET categorias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new categoria.
   * POST categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Categoria.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = requestAll
      const nuevo = await Categoria.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single categoria.
   * GET categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let datos = (await Categoria.query().where({company_id: params.id}).fetch()).toJSON()
    response.send(datos)
  }

  async categoriesDepartment ({ params, request, response, view, auth }) {
    let user = (await auth.getUser()).toJSON()
    let datos = (await Categoria.query().where({company_id: user.empresa, departamento: params.id}).fetch()).toJSON()
    response.send(datos)
  }

  /**
   * Render a form to update an existing categoria.
   * GET categorias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update categoria details.
   * PUT or PATCH categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a categoria with id.
   * DELETE categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    if (((await Solicitud.where({ category: params.id }).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Eliminación fallida, esta categoria esta en uso'
      }])
    } else {
      let eliminar = (await Categoria.find(params.id)).delete()
      response.send(eliminar)
    }
  }
}

module.exports = CategoriaController
