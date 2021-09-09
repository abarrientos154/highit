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
    permissions: [1]
  },
  {
    id: 2,
    name: 'User',
    description: 'Rol de Usuario de HIGHIT',
    permissions: [1]
  },
  {
    id: 3,
    name: 'consultor',
    description: 'Rol de Usuario consultor de HIGHIT',
    permissions: [1]
  },
  {
    id: 4,
    name: 'Userend',
    description: 'Rol de Cliente final de HIGHIT',
    permissions: [1]
  },
  {
    id: 5,
    name: 'consultor administrador',
    description: 'Rol de Usuario consultor administrador de HIGHIT',
    permissions: [1]
  },
  {
    id: 6,
    name: 'Cliente administrador',
    description: 'Rol de Usuario cliente administrador de HIGHIT',
    permissions: [1]
  },
  {
    id: 7,
    name: 'Gerente',
    description: 'Rol de Usuario gerente de HIGHIT',
    permissions: [1]
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
    console.log('Finished Role')
  }
}

module.exports = RoleSeeder
