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
    icon: 'update',
    name: 'Solicitudes sin Consultor asignado'
  },
  {
    id: 2,
    status: 1,
    icon: 'cached',
    name: 'Solicitudes en ejecucion'
  },
  {
    id: 3,
    status: 2,
    icon: 'schedule',
    name: 'Solicitudes en espera'
  },
  {
    id: 4,
    status: 3,
    icon: 'published_with_changes',
    name: 'Solicitudes en checkout'
  },
  {
    id: 5,
    status: 4,
    icon: 'done',
    name: 'Solicitudes por confirmar'
  },
  {
    id: 6,
    status: 5,
    icon: 'done_all',
    name: 'Solicitudes finalizadas'
  },
  {
    id: 7,
    status: [{ id: 0, name: 'Sin inicciar' }, { id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }],
    icon: 'assignment',
    name: 'Solicitudes abiertas'
  },
  {
    id: 8,
    status: [{ id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 5, name: 'Finalizadas' }],
    icon: 'folder_shared',
    name: 'Total de solicitudes por Consultor'
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
  }
}

module.exports = ManageSeeder