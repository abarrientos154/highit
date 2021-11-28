'use strict'

/*
|--------------------------------------------------------------------------
| EstadoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Estado = use("App/Models/Estado")
const estadoData = [
  {
    id: 1,
    pais_id: 1,
    name: 'Rondonia'
  },
  {
    id: 2,
    pais_id: 1,
    name: 'Acre'
  },
  {
    id: 3,
    pais_id: 1,
    name: 'Amazonas'
  },
  {
    id: 4,
    pais_id: 1,
    name: 'Roraima'
  },
  {
    id: 5,
    pais_id: 1,
    name: 'Pará'
  },
  {
    id: 6,
    pais_id: 1,
    name: 'Amapá'
  },
  {
    id: 7,
    pais_id: 1,
    name: 'Tocantins'
  },
  {
    id: 8,
    pais_id: 1,
    name: 'Maranhao'
  },
  {
    id: 9,
    pais_id: 1,
    name: 'Piauí'
  },
  {
    id: 10,
    pais_id: 1,
    name: 'Ceará'
  },
  {
    id: 11,
    pais_id: 1,
    name: 'Rio Grande do Norte'
  },
  {
    id: 12,
    pais_id: 1,
    name: 'Paraíba'
  },
  {
    id: 13,
    pais_id: 1,
    name: 'Pernambuco'
  },
  {
    id: 14,
    pais_id: 1,
    name: 'Alagoas'
  },
  {
    id: 15,
    pais_id: 1,
    name: 'Sergipe'
  },
  {
    id: 16,
    pais_id: 1,
    name: 'Bahia'
  },
  {
    id: 17,
    pais_id: 1,
    name: 'Minas Gerais'
  },
  {
    id: 18,
    pais_id: 1,
    name: 'Espirito Santo'
  },
  {
    id: 19,
    pais_id: 1,
    name: 'Rio de Janeiro'
  },
  {
    id: 20,
    pais_id: 1,
    name: 'Sao Paulo'
  },
  {
    id: 21,
    pais_id: 1,
    name: 'Paraná'
  },
  {
    id: 22,
    pais_id: 1,
    name: 'Santa Catarina'
  },
  {
    id: 23,
    pais_id: 1,
    name: 'Rio Grande do Sul'
  },
  {
    id: 24,
    pais_id: 1,
    name: 'Mato Grosso do Sul'
  },
  {
    id: 25,
    pais_id: 1,
    name: 'Mato Grosso'
  },
  {
    id: 26,
    pais_id: 1,
    name: 'Goiás'
  },
  {
    id: 27,
    pais_id: 1,
    name: 'Distrito Federal'
  },
  {
    id: 28,
    pais_id: 2,
    name: 'Aguascalientes'
  },
  {
    id: 29,
    pais_id: 2,
    name: 'Baja California'
  },
  {
    id: 30,
    pais_id: 2,
    name: 'Baja California Sur'
  },
  {
    id: 31,
    pais_id: 2,
    name: 'Campeche'
  },
  {
    id: 32,
    pais_id: 2,
    name: 'Chiapas'
  },
  {
    id: 33,
    pais_id: 2,
    name: 'Chihuahua'
  },
  {
    id: 34,
    pais_id: 2,
    name: 'Ciudad de México'
  },
  {
    id: 35,
    pais_id: 2,
    name: 'Coahulia'
  },
  {
    id: 36,
    pais_id: 2,
    name: 'Colima'
  },
  {
    id: 37,
    pais_id: 2,
    name: 'Durango'
  },
  {
    id: 38,
    pais_id: 2,
    name: 'Guanajuato'
  },
  {
    id: 39,
    pais_id: 2,
    name: 'Guerrero'
  },
  {
    id: 40,
    pais_id: 2,
    name: 'Hidalgo'
  },
  {
    id: 41,
    pais_id: 2,
    name: 'Jalisco'
  },
  {
    id: 42,
    pais_id: 2,
    name: 'Estado de México'
  },
  {
    id: 43,
    pais_id: 2,
    name: 'Michoacan'
  },
  {
    id: 44,
    pais_id: 2,
    name: 'Morelos'
  },
  {
    id: 45,
    pais_id: 2,
    name: 'Nayarit'
  },
  {
    id: 46,
    pais_id: 2,
    name: 'Nuevo León'
  },
  {
    id: 47,
    pais_id: 2,
    name: 'Oaxaca'
  },
  {
    id: 48,
    pais_id: 2,
    name: 'Puebla'
  },
  {
    id: 49,
    pais_id: 2,
    name: 'Queretaro'
  },
  {
    id: 50,
    pais_id: 2,
    name: 'Quintana Roo'
  },
  {
    id: 51,
    pais_id: 2,
    name: 'San Luis Potosí'
  },
  {
    id: 52,
    pais_id: 2,
    name: 'Sinaloa'
  },
  {
    id: 53,
    pais_id: 2,
    name: 'Sonora'
  },
  {
    id: 54,
    pais_id: 2,
    name: 'Tabasco'
  },
  {
    id: 55,
    pais_id: 2,
    name: 'Tamaulipas'
  },
  {
    id: 56,
    pais_id: 2,
    name: 'Tlaxcala'
  },
  {
    id: 57,
    pais_id: 2,
    name: 'Veracruz'
  },
  {
    id: 58,
    pais_id: 2,
    name: 'Yucatán'
  },
  {
    id: 59,
    pais_id: 2,
    name: 'Zacatecas'
  },
  {
    id: 60,
    pais_id: 3,
    name: 'Alabama'
  },
  {
    id: 61,
    pais_id: 3,
    name: 'Alaska'
  },
  {
    id: 62,
    pais_id: 3,
    name: 'Arizona'
  },
  {
    id: 63,
    pais_id: 3,
    name: 'Arkansas'
  },
  {
    id: 64,
    pais_id: 3,
    name: 'California'
  },
  {
    id: 65,
    pais_id: 3,
    name: 'Colorado'
  },
  {
    id: 66,
    pais_id: 3,
    name: 'Connecticut'
  },
  {
    id: 67,
    pais_id: 3,
    name: 'Delaware'
  },
  {
    id: 68,
    pais_id: 3,
    name: 'District of Columbia'
  },
  {
    id: 69,
    pais_id: 3,
    name: 'Florida'
  },
  {
    id: 70,
    pais_id: 3,
    name: 'Georgia'
  },
  {
    id: 71,
    pais_id: 3,
    name: 'Hawaii'
  },
  {
    id: 72,
    pais_id: 3,
    name: 'Idaho'
  },
  {
    id: 73,
    pais_id: 3,
    name: 'Illinois'
  },
  {
    id: 74,
    pais_id: 3,
    name: 'Indiana'
  },
  {
    id: 75,
    pais_id: 3,
    name: 'Iowa'
  },
  {
    id: 76,
    pais_id: 3,
    name: 'Kansas'
  },
  {
    id: 77,
    pais_id: 3,
    name: 'Kentucky'
  },
  {
    id: 78,
    pais_id: 3,
    name: 'Louisiana'
  },
  {
    id: 79,
    pais_id: 3,
    name: 'Maine'
  },
  {
    id: 80,
    pais_id: 3,
    name: 'Maryland'
  },
  {
    id: 81,
    pais_id: 3,
    name: 'Massachusetts'
  },
  {
    id: 82,
    pais_id: 3,
    name: 'Michigan'
  },
  {
    id: 83,
    pais_id: 3,
    name: 'Minnesota'
  },
  {
    id: 84,
    pais_id: 3,
    name: 'Mississippi'
  },
  {
    id: 85,
    pais_id: 3,
    name: 'Missouri'
  },
  {
    id: 86,
    pais_id: 3,
    name: 'Montana'
  },
  {
    id: 87,
    pais_id: 3,
    name: 'Nebraska'
  },
  {
    id: 88,
    pais_id: 3,
    name: 'Nevada'
  },
  {
    id: 89,
    pais_id: 3,
    name: 'New Hampshire'
  },
  {
    id: 90,
    pais_id: 3,
    name: 'New Jersey'
  },
  {
    id: 91,
    pais_id: 3,
    name: 'New Mexico'
  },
  {
    id: 92,
    pais_id: 3,
    name: 'New York'
  },
  {
    id: 93,
    pais_id: 3,
    name: 'North Carolina'
  },
  {
    id: 94,
    pais_id: 3,
    name: 'North Dakota'
  },
  {
    id: 95,
    pais_id: 3,
    name: 'Ohio'
  },
  {
    id: 96,
    pais_id: 3,
    name: 'Oklahoma'
  },
  {
    id: 97,
    pais_id: 3,
    name: 'Oregon'
  },
  {
    id: 98,
    pais_id: 3,
    name: 'Pennsylvania'
  },
  {
    id: 99,
    pais_id: 3,
    name: 'Puerto Rico'
  },
  {
    id: 100,
    pais_id: 3,
    name: 'Rhode Island'
  },
  {
    id: 101,
    pais_id: 3,
    name: 'South Carolina'
  },
  {
    id: 102,
    pais_id: 3,
    name: 'South Dakota'
  },
  {
    id: 103,
    pais_id: 3,
    name: 'Tennessee'
  },
  {
    id: 104,
    pais_id: 3,
    name: 'Texas'
  },
  {
    id: 105,
    pais_id: 3,
    name: 'Utah'
  },
  {
    id: 106,
    pais_id: 3,
    name: 'Vermont'
  },
  {
    id: 107,
    pais_id: 3,
    name: 'Virginia'
  },
  {
    id: 108,
    pais_id: 3,
    name: 'Washington'
  },
  {
    id: 109,
    pais_id: 3,
    name: 'West Virginia'
  },
  {
    id: 110,
    pais_id: 3,
    name: 'Wisconsin'
  },
  {
    id: 111,
    pais_id: 3,
    name: 'Wyoming'
  }
]
class EstadoSeeder {
  async run () {
    // await Ciudad.query().delete()
    for (let i in estadoData) {
      let estado = await Estado.findBy('id', estadoData[i].id)
      if (!estado) {
        await Estado.create(estadoData[i])
      } else {
        estado.id = estadoData[i].id
        estado.pais_id = estadoData[i].pais_id
        estado.name = estadoData[i].name
        await estado.save()
      }
    }
  }
}

module.exports = EstadoSeeder
