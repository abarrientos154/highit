'use strict'

const Helpers = use('Helpers')
const Department = use("App/Models/Department")
const Area = use("App/Models/Area")
const Charge = use("App/Models/Charge")
// const mkdirp = use('mkdirp')
const { validate } = use("Validator")
// const fs = require('fs')
// var randomize = require('randomatic');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Department
 */
class DepartmentController {
  /**
   * Show a list of all Department.
   * GET Department
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let departments = (await Department.all()).toJSON()
    response.send(departments)
  }

  /**
   * Render a form to be used for creating a new Department.
   * GET Department/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new Department.
   * POST Department
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(requestAll, Department.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = requestAll
      const nuevo = await Department.create(body)
      response.send(nuevo)
    }
  }

  /**
   * Display a single Department.
   * GET Department/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing Department.
   * GET Department/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update Department details.
   * PUT or PATCH Department/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a Department with id.
   * DELETE Department/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const areasByDepartment = (await Area.query().where({department_id: params.id}).fetch()).toJSON()
    for (let i of areasByDepartment) {
      const chargesByArea = (await Charge.query().where({area_id: i._id}).fetch()).toJSON()
      for (let j of chargesByArea) {
        (await Charge.find(j._id)).delete()
      }
      (await Area.find(i._id)).delete()
    }
    let eliminar = (await Department.find(params.id)).delete()
    response.send(eliminar)
  }
}

module.exports = DepartmentController