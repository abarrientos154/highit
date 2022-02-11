'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Permission = use("App/Models/Permission")
const permissionData = [
  {
    id: 1,
    name: 'Root',
    description: ''
  },
  {
    id: 2,
    name: 'Highit',
    description: ''
  },
  {
    id: 3,
    name: 'Consultor',
    description: ''
  },
  {
    id: 4,
    name: 'Cliente final',
    description: ''
  },
  {
    id: 5,
    name: 'Consultor administrador',
    description: ''
  },
  {
    id: 6,
    name: 'Cliente administrador',
    description: ''
  },
  {
    id: 7,
    name: 'Gerente',
    description: ''
  },
  {
    id: 8,
    name: 'Config principal',
    description: 'Acceso a los siguientes modulos: Contratos, Empresas y Usuarios'
  },
  {
    id: 9,
    name: 'Inventario',
    description: 'Acceso al modulo Equipos'
  },
  {
    id: 10,
    name: 'Conocimientos',
    description: 'Acceso al modulo Bases de conocimiento'
  },
  {
    id: 11,
    name: 'Solicitudes',
    description: 'Acceso al modulo Solicitudes'
  },
  {
    id: 12,
    name: 'HitorialSlt',
    description: 'Acceso al modulo Hitorial de solicitudes'
  },
  {
    id: 13,
    name: 'Notificaciones',
    description: 'Acceso al modulo Notificaciones'
  }
]

class PermissionSeeder {
  async run() {
    for (let i in permissionData) {
      let permission = await Permission.findBy('id', permissionData[i].id)
      if (!permission) {
        await Permission.create(permissionData[i])
      } else {
        permission.name = permissionData[i].name
        permission.id = permissionData[i].id
        permission.description = permissionData[i].description
        await permission.save()
      }
    }
  }
}

module.exports = PermissionSeeder
