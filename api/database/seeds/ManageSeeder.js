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
const manageData = [{
        id: 1,
        status: 0,
        icon: 'update',
        name: 'Solicitudes sin Consultor asignado'
    },
    {
        id: 2,
        status: 1,
        icon: 'cached',
        name: 'Solicitudes en ejecución'
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
        status: 6,
        icon: 'open_in_browser',
        name: 'Solicitudes reabiertas'
    },
    {
        id: 7,
        status: 6,
        icon: 'open_in_browser',
        name: 'Solicitudes reabiertas'
    },
    {
        id: 7,
        status: 7,
        icon: 'open_in_browser',
        name: 'Solicitudes en reasignación'
    },
    {
        id: 7,
        status: 8,
        icon: 'open_in_browser',
        name: 'Solicitudes con reasignación rechasada'
    },
    {
        id: 8,
        status: [{ id: 0, name: 'Sin inicciar' }, { id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 6, name: 'Reabiertas' }, { id: 7, name: 'En reasignación' }],
        icon: 'assignment',
        name: 'Solicitudes abiertas'
    },
    {
        id: 9,
        status: [{ id: 0, name: 'Sin inicciar' }, { id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 6, name: 'Reabiertas' }, { id: 5, name: 'Finalizadas' }, { id: 7, name: 'En reasignación' }, { id: 8, name: 'Reasignación rechasada' }],
        icon: 'data_usage',
        name: 'Solicitudes abiertas/cerradas'
    },
    {
        id: 10,
        status: [{ id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 5, name: 'Finalizadas' }, { id: 6, name: 'Reabiertas' }, { id: 7, name: 'En reasignación' }, { id: 8, name: 'Reasignación rechasada' }],
        icon: 'assignment_ind',
        name: 'Solicitudes por Consultor'
    },
    {
        id: 11,
        status: 5,
        icon: 'pending_actions',
        name: 'Tiempo de atención por consultor'
    },
    {
        id: 12,
        status: [{ id: 0, name: 'Sin inicciar' }, { id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 6, name: 'Reabiertas' }, { id: 5, name: 'Finalizadas' }, { id: 7, name: 'En reasignación' }, { id: 8, name: 'Reasignación rechasada' }],
        icon: 'category',
        name: 'Solicitides por categoria'
    },
    {
        id: 13,
        status: 5,
        icon: 'timelapse',
        name: 'Tiempo de atención por categoria'
    },
    {
        id: 14,
        status: [{ id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 5, name: 'Finalizadas' }, { id: 6, name: 'Reabiertas' }, { id: 7, name: 'En reasignación' }, { id: 8, name: 'Reasignación rechasada' }],
        icon: 'alarm_on',
        name: 'Solicitudes con su prioridad cumplida'
    },
    {
        id: 15,
        status: [{ id: 0, name: 'Sin inicciar' }, { id: 1, name: 'En ejecucion' }, { id: 2, name: 'En espera' }, { id: 3, name: 'En checkout' }, { id: 4, name: 'Por confirmar' }, { id: 5, name: 'Finalizadas' }, { id: 6, name: 'Reabiertas' }, { id: 7, name: 'En reasignación' }, { id: 8, name: 'Reasignación rechasada' }],
        icon: 'running_with_errors',
        name: 'Porcentaje de cumplimiento de las prioridades'
    },
    {
        id: 16,
        status: 5,
        icon: 'star_half',
        name: 'Procentaje de satisfacción'
    }
]
class ManageSeeder {
    async run() {
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