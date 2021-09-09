'use strict'

/*
|--------------------------------------------------------------------------
| ManageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Manage = use("App/Models/Manage")
const manageData = [
  {
    id: 1,
    status: 0,
    icon: 'analytics',
    name: 'Solicitudes sin iniciar'
  },
  {
    id: 2,
    status: 1,
    icon: 'analytics',
    name: 'Solicitudes en ejecucion'
  },
  {
    id: 3,
    status: 2,
    icon: 'analytics',
    name: 'Solicitudes en espera'
  },
  {
    id: 4,
    status: 3,
    icon: 'analytics',
    name: 'Solicitudes en checkout'
  },
  {
    id: 5,
    status: 4,
    icon: 'analytics',
    name: 'Solicitudes por confirmar'
  },
  {
    id: 6,
    status: 5,
    icon: 'analytics',
    name: 'Solicitudes finalizadas'
  }
]
class ManageSeeder {
  async run () {
    for (let i in manageData) {
      let manage = await Manage.findBy('id', manageData[i].id)
      if (!manage) {
        await Manage.create(manageData[i])
      } else {
        manage.status = manageData[i].status
        manage.icon = manageData[i].icon
        manage.name = manageData[i].name
        await manage.save()
      }
    }
    console.log('Finished Manage')
  }
}

module.exports = ManageSeeder
