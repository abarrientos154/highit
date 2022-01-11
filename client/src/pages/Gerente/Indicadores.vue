<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">INDICADORES</div>
      <div class="text-grey text-h6">Gestión de las actividades realizadas por otros usuarios</div>
      <q-select class="full-width" filled v-model="gestionar" :options="gestion" label="Selecciona los indicadores que deseas gestionar" multiple map-options emit-value option-label="name" @input="getActividades()">
        <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
          <q-item v-bind="itemProps" v-on="opt.id !== 16 ? itemEvents : ''">
            <q-item-section avatar v-if="opt.id !== 16">
              <q-icon :name="opt.icon" size="40px"/>
            </q-item-section>
            <q-item-section @click="opt.id === 16 ? selectAll() : ''">
              <q-item-label :class="opt.id === 16 ? 'text-center text-bold text-primary' : ''" v-html="opt.name" ></q-item-label>
            </q-item-section>
            <q-item-section side v-if="opt.id !== 16">
              <q-checkbox :value="selected" @input="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="q-mb-lg" v-if="info">
      <div class="q-mb-sm q-px-md">
        <div class="text-h5 text-bold">Listado de gestión</div>
        <div class="text-subtitle1 text-grey-8">Gestión de los indicadores selecionados</div>
      </div>
      <q-list class="row q-pa-sm">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pa-sm" v-for="(item, index) in gestionar" :key="index">
          <q-card style="border-radius: 20px;">
            <q-item>
              <q-item-section avatar class="column items-center justify-between">
                <q-icon :name="item.icon" size="75px"/>
                <div v-if="item.actividades && item.actividades.length" class="column q-gutter-xs">
                  <q-btn dense outline rounded icon="description" label="PDF" @click="pdfGenerate(item)" no-caps/>
                  <q-btn dense outline rounded icon="pending" label="Opciones" @click="gestionarDatos(item)" no-caps/>
                </div>
              </q-item-section>
              <q-item-section class="column justify-between">
                <q-item-label class="text-bold text-h6">{{item.name}}</q-item-label>
                <div>
                  <q-item-label class="text-subtitle1">Actividades realizadas:</q-item-label>
                  <money v-if="item.id === 15" readonly class="q-field__input text-h4 text-grey-7 q-mt-sm" v-model="item.cantidad" suffix=" %"/>
                  <div v-else class="text-h4 text-grey-7">{{item.cantidad}}</div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </q-list>
    </div>

    <q-dialog v-model="gtn">
      <q-card style="width: 100%; border-radius: 10px;">
        <div class="q-pa-lg">
          <div class="row justify-center">
            <q-item>
              <q-item-section avatar>
                <q-icon :name="datos.icon" size="100px"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-h6">{{datos.name}}</q-item-label>
                <q-item-label class="text-subtitle1">Actividades realizadas:</q-item-label>
                <money v-if="datos.id === 15" readonly class="q-field__input text-h3 text-grey-7 q-mt-sm" v-model="datos.cantidad" suffix=" %" style="height: auto"/>
                <q-item-label v-else class="text-h3 text-grey-7">{{datos.cantidad}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div v-if="datos.id === 10 || datos.id === 11 || datos.id === 12 || datos.id === 13">
            <div v-if="datos.id === 10 || datos.id === 11" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Selecciona un Consultor</div>
              <q-select dense filled v-model="consultor" :options="consultores" map-options option-label="name" emit-value option-value="_id" @input="filtrar(3)">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                      <q-avatar size="35px">
                        <q-img :src="baseu + scope.opt._id" class="full-height"/>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="scope.opt.name"/>
                      <q-item-label class="text-grey-7">{{scope.opt.email}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div v-else-if="datos.id === 12 || datos.id === 13" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione una categoria</div>
              <q-select dense filled v-model="categoria" :options="categorias" map-options option-label="nombre" emit-value option-value="_id" @input="filtrar(4)"/>
            </div>
            <div v-if="datos.id === 10 || datos.id === 12" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un estado de solicitudes</div>
              <q-select dense filled v-model="status" :options="datos.status" map-options option-label="name" emit-value option-value="id" @input="filtrar(2)"/>
            </div>
          </div>
          <div v-else class="q-mb-md">
            <div v-if="datos.id === 1 || datos.id === 2 || datos.id === 3 || datos.id === 4 || datos.id === 5 || datos.id === 6 || datos.id === 7 || datos.id === 14 || datos.id === 15" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Selecciona un Cliente</div>
              <q-select dense filled v-model="cliente" :options="clientes" map-options option-label="name" emit-value option-value="_id" @input="filtrar(5)">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section avatar>
                      <q-avatar size="35px">
                        <q-img :src="baseu + scope.opt._id" class="full-height"/>
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="scope.opt.name"/>
                      <q-item-label class="text-grey-7">{{scope.opt.email}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div>
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un departamento</div>
              <q-select dense filled v-model="depart" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="filtrar(1)"/>
            </div>
          </div>
          <div class="q-mb-md">
            <div class="text-bold text-subtitle1">Tipo de gestion</div>
            <div class="row justify-between">
              <q-radio v-model="type" :val="1" label="Diaria" @input="selecType()"/>
              <q-radio v-model="type" :val="2" label="Semanal" @input="selecType()"/>
              <q-radio v-model="type" :val="3" label="Mensual" @input="selecType()"/>
              <q-radio v-model="type" :val="4" label="Anual" @input="selecType()"/>
            </div>
          </div>
          <div v-if="type === 1">
            <div class="text-bold text-subtitle1 q-mb-sm">Ingresar fecha</div>
            <q-input dense filled readonly v-model="fecha" placeholder="AAAA-MM-DD" @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha" mask="YYYY-MM-DD" @input="filtrar()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div v-if="type === 2">
            <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un rango de 7 dias o menos</div>
            <q-input  dense filled readonly v-model="semana" placeholder="AAAA-MM-DD ... AAAA-MM-DD" @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha" mask="YYYY-MM-DD" range @input="filtrar()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div v-if="type === 3 || type === 4">
            <div class="text-bold text-subtitle1 q-mb-sm">{{type === 4 ? 'Seleccione un año' : 'Seleccione un mes'}}</div>
            <q-input dense filled readonly v-model="fecha" :placeholder="type == 4 ? 'AAAA' : 'MM'" :mask="type == 4 ? '####' : '##'"  @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fecha" :mask="type == 4 ? 'YYYY' : 'MM'" minimal emit-immediately :default-view="type == 4 ? 'Years' : 'Months'" @input="filtrar()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import { Money } from 'v-money'
import * as moment from 'moment'
import env from '../../env'
export default {
  components: { Money },
  data () {
    return {
      baseu: '',
      baseuPdf: '',
      type: 0,
      info: false,
      datos: {},
      gtn: false,
      fecha: null,
      semana: '',
      user: {},
      gestion: [],
      gestionar: [],
      categorias: [],
      departamentos: [],
      consultores: [],
      clientes: [],
      depart: null,
      status: null,
      consultor: null,
      cliente: null,
      categoria: null
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'perfil_img/'
    this.baseuPdf = env.apiUrl + 'file_pdf/'
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getGestion()
          this.getCategorias()
          this.getDepartamentos()
          this.getConsultores()
          this.getClientes()
        }
        this.$q.loading.hide()
      })
    },
    getGestion () {
      this.$api.get('gestion').then(res => {
        if (res) {
          this.gestion = res
          this.gestion.push({
            id: 16,
            icon: '',
            name: 'Seleccionar todo',
            actividades: []
          })
        }
      })
    },
    getCategorias () {
      this.$api.get('categorias/' + this.user.empresa).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    getConsultores () {
      this.$api.get('user_consultor/' + this.user.empresa).then(res => {
        if (res) {
          this.consultores = res
        }
      })
    },
    getClientes () {
      this.$api.get('users_clientes/' + this.user.empresa).then(res => {
        if (res) {
          this.clientes = res
        }
      })
    },
    selectAll () {
      this.gestionar = this.gestion.filter(v => v.id !== 16)
      this.getActividades()
    },
    getActividades () {
      this.$api.get('solicitudes_company/' + this.user.empresa).then(res => {
        if (res) {
          for (const i of this.gestionar) {
            i.actividades = []
            if (i.id === 8 || i.id === 9 || i.id === 10 || i.id === 12 || i.id === 14 || i.id === 15) {
              for (const j of i.status) {
                const actividades = res[j.id]
                for (const v of actividades) { i.actividades.push(v) }
              }
              i.aux = i.actividades
            } else {
              i.actividades = res[i.status]
              i.aux = i.actividades
            }
            if (i.id === 9) {
              const abiertas = i.actividades.filter(v => v.status !== 5).length
              const cerradas = i.actividades.filter(v => v.status === 5).length
              i.cantidad = abiertas + ' / ' + cerradas
            } else if (i.id === 11 || i.id === 13) {
              let dias = 0
              let horas = 0
              let minutos = 0
              for (const j of i.actividades) {
                minutos = minutos + moment(j.dateEnd + ' ' + j.timeEnd).diff(moment(j.dateBegin + ' ' + j.timeBegin), 'minutes')
              }
              while (minutos >= 60) {
                minutos = minutos - 60
                horas = horas + 1
                while (horas >= 24) {
                  horas = horas - 24
                  dias = dias + 1
                }
              }
              i.cantidad = (dias > 0 ? dias + 'd : ' : '') + (horas > 0 ? horas + 'hr : ' : '') + minutos + 'min'
            } else if (i.id === 14) {
              i.actividades = i.actividades.filter(v => !v.expiration)
              i.aux = i.actividades
              i.cantidad = i.actividades.length
            } else if (i.id === 15) {
              i.cantidad = (i.actividades.filter(v => !v.expiration).length / i.actividades.length) * 100
            } else {
              i.cantidad = i.actividades.length
            }
          }
          this.info = true
        }
      })
    },
    gestionarDatos (itm) {
      this.datos = { ...itm }
      this.type = 1
      this.semana = ''
      this.depart = null
      this.fecha = null
      this.consultor = null
      this.cliente = null
      this.categoria = null
      this.status = null
      this.gtn = !this.gtn
    },
    selecType () {
      this.semana = ''
      this.fecha = null
    },
    pdfGenerate (itm) {
      this.$q.loading.show({
        message: 'Generando archivo'
      })
      this.$api.post('generate_pdf', itm).then(res => {
        if (res) {
          console.log(res)
          const vm = this
          setTimeout(function () {
            openURL(vm.baseuPdf + res)
            vm.$q.loading.hide()
          }, 5000)
        } else { this.$q.loading.hide() }
      })
    },
    filtrar (filtro) {
      let actividades = []
      if (filtro === 1) {
        this.datos.aux = this.datos.actividades.filter(v => this.cliente === null ? v.categoria.departamento === this.depart : v.categoria.departamento === this.depart && v.user_id === this.cliente)
        if (this.datos.id === 9) {
          this.datos.cantidad = this.datos.aux.filter(v => v.status !== 5).length + ' / ' + actividades.filter(v => v.status === 5).length
        } else if (this.datos.id === 15) {
          this.datos.cantidad = (this.datos.aux.filter(v => !v.expiration).length / this.datos.aux.length) * 100
        } else {
          this.datos.cantidad = this.datos.aux.length
        }
        this.semana = ''
        this.fecha = null
      } else if (filtro === 2) {
        this.datos.aux = this.datos.actividades.filter(v => this.consultor === null ? v.status === this.status : v.status === this.status && v.consultor_id === this.consultor)
        this.datos.cantidad = this.datos.aux.length
        this.fecha = null
        this.semana = ''
      } else if (filtro === 3) {
        this.datos.aux = this.datos.actividades.filter(v => this.status === null ? v.consultor_id === this.consultor : v.consultor_id === this.consultor && v.status === this.status)
        if (this.datos.id === 11) {
          let dias = 0
          let horas = 0
          let minutos = 0
          for (const j of this.datos.aux) {
            minutos = minutos + moment(j.dateEnd + ' ' + j.timeEnd).diff(moment(j.dateBegin + ' ' + j.timeBegin), 'minutes')
          }
          while (minutos >= 60) {
            minutos = minutos - 60
            horas = horas + 1
            while (horas >= 24) {
              horas = horas - 24
              dias = dias + 1
            }
          }
          this.datos.cantidad = (dias > 0 ? dias + 'd : ' : '') + (horas > 0 ? horas + 'hr : ' : '') + minutos + 'min'
        } else {
          this.datos.cantidad = this.datos.aux.length
        }
        this.fecha = null
        this.semana = ''
      } else if (filtro === 4) {
        this.datos.aux = this.datos.actividades.filter(v => this.status === null ? v.category === this.categoria : v.category === this.categoria && v.status === this.status)
        if (this.datos.id === 13) {
          let dias = 0
          let horas = 0
          let minutos = 0
          for (const j of this.datos.aux) {
            minutos = minutos + moment(j.dateEnd + ' ' + j.timeEnd).diff(moment(j.dateBegin + ' ' + j.timeBegin), 'minutes')
          }
          while (minutos >= 60) {
            minutos = minutos - 60
            horas = horas + 1
            while (horas >= 24) {
              horas = horas - 24
              dias = dias + 1
            }
          }
          this.datos.cantidad = (dias > 0 ? dias + 'd : ' : '') + (horas > 0 ? horas + 'hr : ' : '') + minutos + 'min'
        } else {
          this.datos.cantidad = this.datos.aux.length
        }
        this.fecha = null
        this.semana = ''
      } else if (filtro === 5) {
        this.datos.aux = this.datos.actividades.filter(v => this.depart === null ? v.user_id === this.cliente : v.user_id === this.cliente && v.categoria.departamento === this.depart)
        if (this.datos.id === 15) {
          this.datos.cantidad = (this.datos.aux.filter(v => !v.expiration).length / this.datos.aux.length) * 100
        } else {
          this.datos.cantidad = this.datos.aux.length
        }
        this.fecha = null
        this.semana = ''
      } else {
        this.$refs.qDateProxy.hide()
        if (this.type === 2) {
          this.semana = this.fecha.from + ' ... ' + this.fecha.to
          if (moment(this.fecha.to).diff(this.fecha.from, 'days') + 1 <= 7) {
            actividades = this.datos.aux.filter(v => moment(v.dateSlt).isBetween(this.fecha.from, this.fecha.to) || moment(v.dateSlt).isSame(this.fecha.from) || moment(v.dateSlt).isSame(this.fecha.to))
            if (this.datos.id === 9) {
              this.datos.cantidad = actividades.filter(v => v.status !== 5).length + ' / ' + actividades.filter(v => v.status === 5).length
            } else if (this.datos.id === 11 || this.datos.id === 13) {
              let dias = 0
              let horas = 0
              let minutos = 0
              for (const j of actividades) {
                minutos = minutos + moment(j.dateEnd + ' ' + j.timeEnd).diff(moment(j.dateBegin + ' ' + j.timeBegin), 'minutes')
              }
              while (minutos >= 60) {
                minutos = minutos - 60
                horas = horas + 1
                while (horas >= 24) {
                  horas = horas - 24
                  dias = dias + 1
                }
              }
              this.datos.cantidad = (dias > 0 ? dias + 'd : ' : '') + (horas > 0 ? horas + 'hr : ' : '') + minutos + 'min'
            } else if (this.datos.id === 15) {
              this.datos.cantidad = (actividades.filter(v => !v.expiration).length / actividades.length) * 100
            } else {
              this.datos.cantidad = actividades.length
            }
          } else {
            this.$q.notify({
              message: 'Has superado el rango de dias que tiene una semana',
              color: 'negative'
            })
            this.semana = ''
            this.fecha = null
          }
        } else {
          actividades = this.datos.aux.filter(v => moment(moment(v.dateSlt).format(this.type === 1 ? 'YYYY-MM-DD' : this.type === 3 ? 'MM' : 'YYYY')).isSame(this.fecha))
          if (this.datos.id === 9) {
            this.datos.cantidad = actividades.filter(v => v.status !== 5).length + ' / ' + actividades.filter(v => v.status === 5).length
          } else if (this.datos.id === 11 || this.datos.id === 13) {
            let dias = 0
            let horas = 0
            let minutos = 0
            for (const j of actividades) {
              minutos = minutos + moment(j.dateEnd + ' ' + j.timeEnd).diff(moment(j.dateBegin + ' ' + j.timeBegin), 'minutes')
            }
            while (minutos >= 60) {
              minutos = minutos - 60
              horas = horas + 1
              while (horas >= 24) {
                horas = horas - 24
                dias = dias + 1
              }
            }
            this.datos.cantidad = (dias > 0 ? dias + 'd : ' : '') + (horas > 0 ? horas + 'hr : ' : '') + minutos + 'min'
          } else if (this.datos.id === 15) {
            this.datos.cantidad = (actividades.filter(v => !v.expiration).length / actividades.length) * 100
          } else {
            this.datos.cantidad = actividades.length
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
