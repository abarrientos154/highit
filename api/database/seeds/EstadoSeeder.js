'use strict'

/*
|--------------------------------------------------------------------------
| EstadoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Estado = use("App/Models/Estado")
const estadoData = [
  {
    id: 1,
    pais_id: 1,
    name: 'Estado1'
  },
  {
    id: 2,
    pais_id: 1,
    name: 'Estado2'
  },
  {
    id: 3,
    pais_id: 2,
    name: 'Estado1'
  },
  {
    id: 4,
    pais_id: 2,
    name: 'Estado2'
  },
  {
    id: 5,
    pais_id: 2,
    name: 'Estado3'
  }
]
class EstadoSeeder {
  async run () {
    // await Ciudad.query().delete()
    for (let i in estadoData) {
      let estado = await Estado.findBy('id', estadoData[i].id)
      if (!estado) {
        await Estado.create(estadoData[i])
      } else {
        estado.pais_id = estadoData[i].pais_id
        estado.name = estadoData[i].name
        await estado.save()
      }
    }
  }
}

module.exports = EstadoSeeder
