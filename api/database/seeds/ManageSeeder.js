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
        name: 'indicador_slts0'
    },
    {
        id: 2,
        status: 1,
        icon: 'cached',
        name: 'indicador_slts1'
    },
    {
        id: 3,
        status: 2,
        icon: 'schedule',
        name: 'indicador_slts2'
    },
    {
        id: 4,
        status: 3,
        icon: 'published_with_changes',
        name: 'indicador_slts3'
    },
    {
        id: 5,
        status: 4,
        icon: 'done',
        name: 'indicador_slts4'
    },
    {
        id: 6,
        status: 5,
        icon: 'done_all',
        name: 'indicador_slts5'
    },
    {
        id: 7,
        status: 6,
        icon: 'open_in_browser',
        name: 'indicador_slts6'
    },
    {
        id: 8,
        status: [{ id: 0, name: 'statusSlt_0' }, { id: 1, name: 'statusSlt_1' }, { id: 2, name: 'statusSlt_2' }, { id: 3, name: 'statusSlt_3' }, { id: 4, name: 'statusSlt_4' }, { id: 6, name: 'statusSlt_6' }, { id: 7, name: 'statusSlt_7' }, { id: 8, name: 'statusSlt_8' }],
        icon: 'assignment',
        name: 'indicador_sltsAbiertas'
    },
    {
        id: 9,
        status: [{ id: 0, name: 'statusSlt_0' }, { id: 1, name: 'statusSlt_1' }, { id: 2, name: 'statusSlt_2' }, { id: 3, name: 'statusSlt_3' }, { id: 4, name: 'statusSlt_4' }, { id: 5, name: 'statusSlt_5' }, { id: 6, name: 'statusSlt_6' }, { id: 7, name: 'statusSlt_7' }, { id: 8, name: 'statusSlt_8' }],
        icon: 'data_usage',
        name: 'indicador_sltsAbiertasCerradas'
    },
    {
        id: 10,
        status: [{ id: 1, name: 'statusSlt_1' }, { id: 2, name: 'statusSlt_2' }, { id: 3, name: 'statusSlt_3' }, { id: 4, name: 'statusSlt_4' }, { id: 5, name: 'statusSlt_5' }, { id: 6, name: 'statusSlt_6' }, { id: 7, name: 'statusSlt_7' }, { id: 8, name: 'statusSlt_8' }],
        icon: 'assignment_ind',
        name: 'indicador_sltsConsultor'
    },
    {
        id: 11,
        status: 5,
        icon: 'pending_actions',
        name: 'indicador_sltsTiempoConsultor'
    },
    {
        id: 12,
        status: [{ id: 0, name: 'statusSlt_0' }, { id: 1, name: 'statusSlt_1' }, { id: 2, name: 'statusSlt_2' }, { id: 3, name: 'statusSlt_3' }, { id: 4, name: 'statusSlt_4' }, { id: 5, name: 'statusSlt_5' }, { id: 6, name: 'statusSlt_6' }, { id: 7, name: 'statusSlt_7' }, { id: 8, name: 'statusSlt_8' }],
        icon: 'category',
        name: 'indicador_sltsCategoria'
    },
    {
        id: 13,
        status: 5,
        icon: 'timelapse',
        name: 'indicador_sltsTiempoCategoria'
    },
    {
        id: 14,
        status: [{ id: 1, name: 'statusSlt_1' }, { id: 2, name: 'statusSlt_2' }, { id: 3, name: 'statusSlt_3' }, { id: 4, name: 'statusSlt_4' }, { id: 5, name: 'statusSlt_5' }, { id: 6, name: 'statusSlt_6' }, { id: 7, name: 'statusSlt_7' }, { id: 8, name: 'statusSlt_8' }],
        icon: 'alarm_on',
        name: 'indicador_sltsPrioridad'
    },
    {
        id: 15,
        status: [{ id: 0, name: 'statusSlt_0' }, { id: 1, name: 'statusSlt_1' }, { id: 2, name: 'statusSlt_2' }, { id: 3, name: 'statusSlt_3' }, { id: 4, name: 'statusSlt_4' }, { id: 5, name: 'statusSlt_5' }, { id: 6, name: 'statusSlt_6' }, { id: 7, name: 'statusSlt_7' }, { id: 8, name: 'statusSlt_8' }],
        icon: 'running_with_errors',
        name: 'indicador_sltsPorcentajePrioridad'
    },
    {
        id: 16,
        status: 5,
        icon: 'star_half',
        name: 'indicador_sltsSatisfaccion'
    },
    {
        id: 17,
        status: 7,
        icon: 'open_in_browser',
        name: 'indicador_sltsReasignar'
    },
    {
        id: 18,
        status: 8,
        icon: 'open_in_browser',
        name: 'indicador_sltsRechazReasignar'
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