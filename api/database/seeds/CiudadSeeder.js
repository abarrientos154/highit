'use strict'

/*
|--------------------------------------------------------------------------
| CiudadSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Ciudad = use("App/Models/Ciudad")
const ciudadData = [
  {
    id: 1,
    estado_id: 1,
    name: 'Ciudad1'
  },
  {
    id: 2,
    estado_id: 1,
    name: 'Ciudad2'
  },
  {
    id: 3,
    estado_id: 2,
    name: 'Ciudad1'
  },
  {
    id: 4,
    estado_id: 3,
    name: 'Ciudad1'
  },
  {
    id: 5,
    estado_id: 3,
    name: 'Ciudad2'
  },
  {
    id: 6,
    estado_id: 3,
    name: 'Ciudad3'
  },
  {
    id: 7,
    estado_id: 4,
    name: 'Ciudad1'
  },
  {
    id: 8,
    estado_id: 4,
    name: 'Ciudad2'
  },
  {
    id: 9,
    estado_id: 5,
    name: 'Ciudad1'
  },
  {
    id: 10,
    estado_id: 5,
    name: 'Ciudad2'
  },
  {
    id: 11,
    estado_id: 5,
    name: 'Ciudad3'
  },
  {
    id: 12,
    estado_id: 5,
    name: 'Ciudad4'
  }
]
class CiudadSeeder {
  async run () {
    // await Ciudad.query().delete()
    for (let i in ciudadData) {
      let ciudad = await Ciudad.findBy('id', ciudadData[i].id)
      if (!ciudad) {
        await Ciudad.create(ciudadData[i])
      } else {
        ciudad.estado_id = ciudadData[i].estado_id
        ciudad.name = ciudadData[i].name
        await ciudad.save()
      }
    }
    console.log('Finished Ciudad')
  }
}

module.exports = CiudadSeeder
