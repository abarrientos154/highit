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
    name_es: 'Fecha de nacimiento:',
    name_en: 'Date of birth:',
    name_pt: 'Data de nascimento:'
  },
  {
    id: 2,
    name_es: 'El nombre de mi mamá es:',
    name_en: 'My mom´s name is:',
    name_pt: 'O nome da minha mãe é:'
  },
  {
    id: 3,
    name_es: 'Ciudad natal:',
    name_en: 'Native city:',
    name_pt: 'Cidade natal:'
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
        security.name_es = securityData[i].name_es
        security.name_en = securityData[i].name_en
        security.name_pt = securityData[i].name_pt
        await security.save()
      }
    }
  }
}

module.exports = SecuritySeeder
