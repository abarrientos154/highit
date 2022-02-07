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
          width: 150,
          margin: [0, 0, 0, 0],
        },
        {
          alignment: 'center',
          style: 'title',
          margin: [0, -10, 0, 0],
          text: body.name
        },
        {
          alignment: 'center',
          style: 'textFiltro',
          margin: [0, 0, 0, 10],
          text: body.filtro
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              border: [false, false, false, false],
              table: {
                body: body.table
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
            },
            { width: '*', text: '' }
          ]
        }
      ],
      styles: {
        textFiltro: {
          bold: true,
          fontSize: 11
        },
        textDescription: {
          fontSize: 7
        },
        textblack: {
          noWrap: true,
          fontSize: 8
        },
        textbold: {
          bold: true,
          fontSize: 9
        },
        title: {
          bold: true,
          fontSize: 18
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
