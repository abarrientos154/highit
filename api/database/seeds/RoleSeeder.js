'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use("App/Models/Role")
const roleData = [
  {
    id: 1,
    name: 'root',
    description: 'Rol de Administrador de HIGHIT',
    permissions: [1, 8, 13]
  },
  {
    id: 2,
    name: 'Highit',
    description: 'Rol de Usuario de HIGHIT',
    permissions: [2, 8, 9, 10, 13]
  },
  {
    id: 3,
    name: 'Consultor',
    description: 'Rol de Usuario consultor de HIGHIT',
    permissions: [3, 10, 12, 13]
  },
  {
    id: 4,
    name: 'Cliente final',
    description: 'Rol de Cliente final de HIGHIT',
    permissions: [4, 9, 11, 12, 13]
  },
  {
    id: 5,
    name: 'Consultor administrador',
    description: 'Rol de Usuario consultor administrador de HIGHIT',
    permissions: [5, 13]
  },
  {
    id: 6,
    name: 'Cliente administrador',
    description: 'Rol de Usuario cliente administrador de HIGHIT',
    permissions: [6, 9, 11, 12, 13]
  },
  {
    id: 7,
    name: 'Gerente',
    description: 'Rol de Usuario gerente de HIGHIT',
    permissions: [7, 13]
  }
]

class RoleSeeder {
  async run() {
    for (let i in roleData) {
      let role = await Role.findBy('id', roleData[i].id)
      if (!role) {
        await Role.create(roleData[i])
      } else {
        role.name = roleData[i].name
        role.id = roleData[i].id
        role.description = roleData[i].description
        role.permissions = roleData[i].permissions
        await role.save()
      }
    }
  }
}

module.exports = RoleSeeder
