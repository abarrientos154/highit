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
    name: 'Super Admin',
    description: 'Rol de Súper Administrador de PETFRIENLY',
    permissions: [1]
  },
  {
    id: 2,
    name: 'Cliente',
    description: 'Rol de Cliente de PETFRIENLY',
    permissions: [1]
  },
  {
    id: 3,
    name: 'Proveedor',
    description: 'Rol de Proveedor de PETFRIENLY',
    permissions: [1]
  },
  {
    id: 4,
    name: 'Hospedador',
    description: 'Rol de Hospedador de PETFRIENLY',
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
