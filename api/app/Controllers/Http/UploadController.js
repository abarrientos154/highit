'use strict'

const Conocimiento = use("App/Models/Conocimiento")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const PdfMake = use("pdfmake")
const imageToBase64 = use("image-to-base64")
const fs = require('fs')

/* const { validate } = use("Validator")
var randomize = require('randomatic'); */


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {

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

  async generatePdf({
    request,
    response
  }) {
    var body = request.body
    var actividades = body.actividades
    var info = [
      [
        {
          alignment: 'center',
          style: 'textbold',
          margin: [0, 5, 0, 5],
          text: [
            { style: '', text: 'FECHA' }
          ]
        },
        {
          alignment: 'center',
          style: 'textbold',
          margin: [0, 5, 0, 5],
          text: [
            { style: '', text: 'DESCRIPCIÓN' }
          ]
        },
        {
          alignment: 'center',
          style: 'textbold',
          margin: [0, 5, 0, 5],
          text: [
            { style: '', text: 'SITUACIÓN' }
          ]
        },
        {
          alignment: 'center',
          style: 'textbold',
          margin: [0, 5, 0, 5],
          text: [
            { style: '', text: 'EMPRESA' }
          ]
        },
        {
          alignment: 'center',
          style: 'textbold',
          margin: [0, 5, 0, 5],
          text: [
            { style: '', text: 'CLIENTE' }
          ]
        }
      ]
    ]
    for (const i of actividades) {
      info.push([
        {
          alignment: 'center',
          style: 'textblack',
          margin: [0, 5, 0, 0],
          text: [
            { style: '', text: `${i.dateSlt}` }
          ]
        },
        {
          alignment: 'center',
          style: 'textDescription',
          margin: [0, 2, 0, 2],
          text: [
            { style: '', text: `${i.description}` }
          ]
        },
        {
          alignment: 'center',
          style: 'textblack',
          margin: [0, 5, 0, 0],
          text: [
            { style: '', text: `${i.status === 0 ? 'Sin iniciar' : i.status === 1 ? 'En ejecución' : i.status === 2 ? 'En pausa' : i.status === 3 ? 'Checkout' : i.status === 4 ? 'Por confirmar' : i.status === 5 ? 'Finalizada' : 'Reabierta'}` }
          ]
        },
        {
          alignment: 'center',
          style: 'textblack',
          margin: [0, 5, 0, 0],
          text: [
            { style: '', text: `${i.empresa.name}` }
          ]
        },
        {
          alignment: 'center',
          style: 'textblack',
          margin: [0, 5, 0, 0],
          text: [
            { style: '', text: `${i.cliente.name + ' ' + i.cliente.last_name}` }
          ]
        }
      ])
    }
    if (actividades.filter(v => v.consultor).length) {
      for (let i in info) {
        info[i].push(
          {
            alignment: 'center',
            style: `${actividades[i - 1] ? 'textblack' : 'textbold'}`,
            margin: [0, 5, 0, 5],
            text: `${actividades[i - 1] ? actividades[i - 1].consultor ? actividades[i - 1].consultor.name + ' ' + actividades[i - 1].consultor.last_name : '' : 'CONSULTOR'}`
          }
        )
      }
    }
    if (body.id === 11 || body.id === 12 || body.id === 13 || body.id === 14 || body.id === 15) {
      for (let i in info) {
        info[i].push(
          {
            alignment: 'center',
            style: `${actividades[i - 1] ? 'textblack' : 'textbold'}`,
            margin: [0, 5, 0, 5],
            text: [
              { style: '', text: `${actividades[i - 1] ? body.id === 11 || body.id === 13 ? actividades[i - 1].duration : body.id === 12 ? actividades[i - 1].categoria.nombre : actividades[i - 1].categoria.Departamento.name : body.id === 11 || body.id === 13 ? 'TIEMPO' : body.id === 12 ? 'CATEGORIA' : 'DEPARTAMENTO'}` }
            ]
          }
        )
      }
    }
    let widths = []
    for (let i in info[0]) {
      if (i === 1) { widths.push(200) } else { widths.push('auto') }
    }
    let logo = Helpers.appRoot("public") + `/Desk.jpg`
    logo = await imageToBase64(logo).then(res => {
      return "data:image/jpeg;base64, " + res
    })
    var fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    }
    var printer = new PdfMake(fonts)
    let docDefinition = {
      pageSize: 'letter',
      pageMargins: [40, 7, 40, 7],
      content: [
        {
          image: logo,
          alignment: 'center',
          width: 200,
          margin: [0, 0, 0, 0],
        },
        {
          alignment: 'center',
          style: 'title',
          margin: [0, 0, 0, 10],
          text: body.name
        },
        {
          border: [false, false, false, false],
          style: 'tableDescription',
          table: {
            widths: widths,
            body: info
          },
          layout: {
            hLineColor: function (i, node) {
              return (i !== 1) ? '#636363' : 'black'
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? '#636363' : 'black'
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCC9C8' : '#999999'
            }
          }
        }
      ],
      styles: {
        tableDescription: {
          margin: [4, 4, 50, 4],
        },
        textDescription: {
          fontSize: 7,
          margin: [0, 0, 0, 0],
          color: '#000000'
        },
        textblack: {
          noWrap: true,
          fontSize: 8,
          margin: [0, 0, 0, 0],
          color: '#000000'
        },
        textbold: {
          bold: true,
          fontSize: 9,
          margin: [0, 0, 0, 0],
          color: '#000000'
        },
        title: {
          bold: true,
          fontSize: 20
        }
      }
    }
    var pdfDoc = await printer.createPdfKitDocument(docDefinition)
    var fileName = `${body._id}.pdf`
    mkdirp.sync(`${Helpers.appRoot()}/storage/uploads/pdf`)
    var filePath = `${Helpers.appRoot('storage/uploads/pdf')}/${fileName}`
    pdfDoc.pipe(fs.createWriteStream(filePath))
    pdfDoc.end()
    response.send(fileName)
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

  async newImagen ({ request, response, params }) {
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
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

  async newImagenCompany ({ request, response, params }) {
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/companyFiles')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/companyFiles'), {
          name: params.company_id,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        response.send(params.company_id)
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

  async getFileByDirectoryPdf ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/pdf') + `/${dir}`)
  }
}

module.exports = UploadController
