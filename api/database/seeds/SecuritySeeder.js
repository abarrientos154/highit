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
const Security = use("App/Models/Security")
const securityData = [
  {
    id: 1,
    name: 'Fecha de nacimiento:'
  },
  {
    id: 2,
    name: 'El nombre de mi mamá es:'
  },
  {
    id: 3,
    name: 'Ciudad natal:'
  }
]
class SecuritySeeder {
  async run () {
    for (let i in securityData) {
      let security = await Security.findBy('id', securityData[i].id)
      if (!security) {
        await Security.create(securityData[i])
      } else {
        security.id = securityData[i].id
        security.name = securityData[i].name
        await security.save()
      }
    }
  }
}

module.exports = SecuritySeeder
