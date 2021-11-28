'use strict'

/*
|--------------------------------------------------------------------------
| PaisSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Pais = use("App/Models/Pais")
const paisData = [
  {
    id: 1,
    name: 'Brasil'
  },
  {
    id: 2,
    name: 'México'
  },
  {
    id: 3,
    name: 'Estados Unidos'
  }
]
class PaisSeeder {
  async run () {
    for (let i in paisData) {
      let pais = await Pais.findBy('id', paisData[i].id)
      if (!pais) {
        await Pais.create(paisData[i])
      } else {
        pais.id = paisData[i].id
        pais.name = paisData[i].name
        await pais.save()
      }
    }
  }
}

module.exports = PaisSeeder
