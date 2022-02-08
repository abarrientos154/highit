<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{$t('titulo_moduloIndicadores')}}</div>
      <div class="text-grey text-h6">{{$t('subtitulo_gestionActividades')}}</div>
      <q-select class="full-width" filled v-model="gestionar" :options="gestion" :label="$t('form_selecIndicadores')" multiple map-options emit-value option-label="name" @input="getActividades()">
        <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
          <q-item v-bind="itemProps" v-on="opt.id !== 17 ? itemEvents : ''">
            <q-item-section avatar v-if="opt.id !== 17">
              <q-icon :name="opt.icon" size="40px"/>
            </q-item-section>
            <q-item-section @click="opt.id === 17 ? selectAll() : ''">
              <q-item-label :class="opt.id === 17 ? 'text-center text-bold text-primary' : ''" v-html="opt.name" ></q-item-label>
            </q-item-section>
            <q-item-section side v-if="opt.id !== 17">
              <q-checkbox :value="selected" @input="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="q-mb-lg" v-if="info">
      <div class="q-mb-sm q-px-md">
        <div class="text-h5 text-bold">{{$t('titulo_listGestion')}}</div>
        <div class="text-subtitle1 text-grey-8">{{$t('subtitulo_gestionIndicadores')}}</div>
      </div>
      <q-list class="row q-pa-sm">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pa-sm" v-for="(item, index) in gestionar" :key="index">
          <q-card style="border-radius: 20px;">
            <q-item>
              <q-item-section avatar class="column items-center justify-between">
                <q-icon :name="item.icon" size="75px"/>
                <div v-if="item.actividades && item.actividades.length" class="column q-gutter-xs">
                  <q-btn dense outline rounded icon="description" label="PDF" @click="pdfGenerate(item)" no-caps/>
                  <q-btn dense outline rounded icon="pending" :label="$t('accion_options')" @click="gestionarDatos(item)" no-caps/>
                </div>
              </q-item-section>
              <q-item-section class="column justify-between">
                <q-item-label class="text-bold text-h6">{{item.name}}</q-item-label>
                <div>
                  <q-item-label class="text-subtitle1">{{$t('text_activiRealizadas')}}:</q-item-label>
                  <money v-if="item.id === 15 || item.id === 16" readonly class="q-field__input text-h4 text-grey-7 q-mt-sm" v-model="item.cantidad" suffix=" %"/>
                  <div v-else class="text-h4 text-grey-7">{{item.cantidad}}</div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </q-list>
    </div>

    <q-dialog v-model="gtn">
      <q-card class="q-pa-lg" style="width: 100%; border-radius: 10px;">
        <div class="row justify-center">
          <q-item>
            <q-item-section avatar>
              <q-icon :name="datos.icon" size="100px"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-h6">{{datos.name}}</q-item-label>
              <q-item-label class="text-subtitle1">{{$t('text_activiRealizadas')}}:</q-item-label>
              <money v-if="datos.id === 15 || datos.id === 16" readonly class="q-field__input text-h3 text-grey-7 q-mt-sm" v-model="datos.cantidad" suffix=" %" style="height: auto"/>
              <q-item-label v-else class="text-h3 text-grey-7">{{datos.cantidad}}</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="q-mb-md">
          <div v-if="datos.id === 10 || datos.id === 11 || datos.id === 16" class="q-mb-md">
            <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_selecConsultor')}}</div>
            <q-select dense filled v-model="consultor" :options="consultores" map-options option-label="name" emit-value option-value="_id" @input="filtrar(3)">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <q-avatar size="35px">
                      <q-img :src="baseu + 'perfil_img/' + scope.opt._id" class="full-height"/>
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

          <div v-if="datos.id === 12 || datos.id === 13" class="q-mb-md">
            <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_selecCat')}}</div>
            <q-select dense filled v-model="categoria" :options="categorias" map-options option-label="nombre" emit-value option-value="_id" @input="filtrar(4)"/>
          </div>

          <div v-if="datos.id === 10 || datos.id === 12 || datos.id === 11" class="q-mb-md">
            <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_selecEstadoSlt')}}</div>
            <q-select dense filled v-model="status" :options="datos.status" map-options option-label="name" emit-value option-value="id" @input="filtrar(2)"/>
          </div>

          <div v-if="datos.id === 1 || datos.id === 2 || datos.id === 3 || datos.id === 4 || datos.id === 5 || datos.id === 6 || datos.id === 7 || datos.id === 14 || datos.id === 15" class="q-mb-md">
            <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_selecClient')}}</div>
            <q-select dense filled v-model="cliente" :options="clientes" map-options option-label="name" emit-value option-value="_id" @input="filtrar(5)">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section avatar>
                    <q-avatar size="35px">
                      <q-img :src="baseu + 'company_img/' + scope.opt._id" class="full-height"/>
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

          <div v-if="datos.id !== 10 && datos.id !== 11 && datos.id !== 12 && datos.id !== 13 && datos.id !== 16">
            <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_selecDepart')}}</div>
            <q-select dense filled v-model="depart" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="filtrar(1)"/>
          </div>
        </div>

        <div class="q-mb-md">
          <div class="text-bold text-subtitle1">{{$t('form_tipoGestion')}}</div>
          <div class="row justify-between">
            <q-radio v-model="type" :val="1" :label="$t('option_diaria')" @input="selecType()"/>
            <q-radio v-model="type" :val="2" :label="$t('option_semanal')" @input="selecType()"/>
            <q-radio v-model="type" :val="3" :label="$t('option_mensual')" @input="selecType()"/>
            <q-radio v-model="type" :val="4" :label="$t('option_anual')" @input="selecType()"/>
          </div>
        </div>

        <div v-if="type === 1">
          <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_ingresaFecha')}}</div>
          <q-input dense filled readonly v-model="fecha" :placeholder="$t('formFormat_fecha')" @click="$refs.qDateProxy.show()">
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
          <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_ragoSelec')}}</div>
          <q-input  dense filled readonly v-model="semana" :placeholder="$t('formFormat_fecha') + ' - ' + $t('formFormat_fecha')" @click="$refs.qDateProxy.show()">
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
          <div class="text-bold text-subtitle1 q-mb-sm">{{type === 4 ? $t('option_selecA') : $t('option_selecMes')}}</div>
          <q-input dense filled readonly v-model="fecha" :placeholder="type == 4 ? $t('formFormat_year') : $t('formFormat_mes')" :mask="type == 4 ? '####' : '##'"  @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha" :mask="type == 4 ? 'YYYY' : 'MM'" minimal emit-immediately :default-view="type == 4 ? 'Years' : 'Months'" @input="filtrar()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <q-btn dense outline rounded v-if="(datos.cantidad > 0) || datos.cantidad !== '0min'" class="full-width q-mt-md" icon="description" label="PDF" @click="pdfFilter()" no-caps/>
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
    this.baseu = env.apiUrl
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
            id: 17,
            icon: '',
            name: this.$t('option_selecAll'),
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
      this.$api.get('companys_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.clientes = res
        }
      })
    },
    selectAll () {
      this.gestionar = this.gestion.filter(v => v.id !== 17)
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
            } else if (i.id === 16) {
              let stars = 0
              for (const j of i.actividades) {
                stars = stars + j.rating.number
              }
              i.cantidad = (stars * i.actividades.length) / 100
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
    pdfFilter () {
      const item = { ...this.datos }
      if (this.depart !== null) {
        item.actividades = this.datos.actividades.filter(v => v.categoria.departamento === this.depart)
      }
      if (this.status !== null) {
        item.actividades = this.datos.actividades.filter(v => v.status === this.status)
      }
      if (this.consultor !== null) {
        item.actividades = this.datos.actividades.filter(v => v.consultor_id === this.consultor)
      }
      if (this.categoria !== null) {
        item.actividades = this.datos.actividades.filter(v => v.category === this.categoria)
      }
      if (this.cliente !== null) {
        item.actividades = this.datos.actividades.filter(v => v.empresa_id === this.cliente)
      }
      if (this.fecha !== null) {
        if (this.type === 2) {
          item.actividades = this.datos.actividades.filter(v => moment(v.dateSlt).isBetween(this.fecha.from, this.fecha.to) || moment(v.dateSlt).isSame(this.fecha.from) || moment(v.dateSlt).isSame(this.fecha.to))
          item.filtro = `${this.$t('text_semana')}: ${this.semana}`
        } else {
          item.actividades = this.datos.actividades.filter(v => moment(moment(v.dateSlt).format(this.type === 1 ? 'YYYY-MM-DD' : this.type === 3 ? 'MM' : 'YYYY')).isSame(this.fecha))
          item.filtro = `${this.type === 1 ? this.$t('form_fecha') : this.type === 3 ? this.$t('form_mes') : this.$t('form_año')}: ${this.fecha}`
        }
      }
      this.pdfGenerate(item)
    },
    pdfGenerate (itm) {
      this.$q.loading.show({
        message: this.$t('accion_generandoPdf')
      })
      itm.table = [
        [
          {
            alignment: 'center',
            style: 'textbold',
            margin: [0, 5, 0, 5],
            text: this.$t('form_fecha').toUpperCase()
          },
          {
            alignment: 'center',
            style: 'textbold',
            margin: [0, 5, 0, 5],
            text: this.$t('form_descripcion').toUpperCase()
          },
          {
            alignment: 'center',
            style: 'textbold',
            margin: [0, 5, 0, 5],
            text: this.$t('form_estado').toUpperCase()
          },
          {
            alignment: 'center',
            style: 'textbold',
            margin: [0, 5, 0, 5],
            text: this.$t('form_empresa').toUpperCase()
          },
          {
            alignment: 'center',
            style: 'textbold',
            margin: [0, 5, 0, 5],
            text: this.$t('form_cliente').toUpperCase()
          }
        ]
      ]
      for (const i of itm.actividades) {
        itm.table.push([
          {
            alignment: 'center',
            style: 'textblack',
            margin: [0, 5, 0, 5],
            text: `${i.dateSlt}`
          },
          {
            alignment: 'center',
            style: 'textDescription',
            margin: [0, 2, 0, 2],
            text: `${i.description}`
          },
          {
            alignment: 'center',
            style: 'textblack',
            margin: [0, 5, 0, 5],
            text: `${i.status === 0 ? this.$t('statusSlt_0') : i.status === 1 ? this.$t('statusSlt_1') : i.status === 2 ? this.$t('statusSlt_2') : i.status === 3 ? this.$t('statusSlt_3') : i.status === 4 ? this.$t('statusSlt_4') : i.status === 5 ? this.$t('statusSlt_5') : this.$t('statusSlt_6')}`
          },
          {
            alignment: 'center',
            style: 'textblack',
            margin: [0, 5, 0, 5],
            text: `${i.empresa.name}`
          },
          {
            alignment: 'center',
            style: 'textblack',
            margin: [0, 5, 0, 5],
            text: `${i.cliente.name + ' ' + i.cliente.last_name}`
          }
        ])
      }
      if (itm.actividades.filter(v => v.consultor).length) {
        for (const i in itm.table) {
          itm.table[i].push(
            {
              alignment: 'center',
              style: `${itm.actividades[i - 1] ? 'textblack' : 'textbold'}`,
              margin: [0, 5, 0, 5],
              text: `${itm.actividades[i - 1] ? itm.actividades[i - 1].consultor ? itm.actividades[i - 1].consultor.name + ' ' + itm.actividades[i - 1].consultor.last_name : '' : this.$t('text_consultor').toUpperCase()}`
            }
          )
        }
      }
      if (itm.id === 16) {
        for (const i in itm.table) {
          itm.table[i].push(
            {
              alignment: 'center',
              style: `${itm.actividades[i - 1] ? 'textblack' : 'textbold'}`,
              margin: [0, 5, 0, 5],
              text: `${itm.actividades[i - 1] ? itm.actividades[i - 1].rating ? itm.actividades[i - 1].rating.number : '' : this.$t('text_estrellas').toUpperCase()}`
            },
            {
              alignment: 'center',
              style: `${itm.actividades[i - 1] ? 'textblack' : 'textbold'}`,
              margin: [0, 5, 0, 5],
              text: `${itm.actividades[i - 1] ? itm.actividades[i - 1].rating ? ((itm.actividades[i - 1].rating.number * itm.actividades.filter(v => v.consultor_id === itm.actividades[i - 1].consultor_id).length) / 100) + ' %' : '' : this.$t('text_satisfaccion').toUpperCase()}`
            }
          )
        }
      }
      if (itm.id === 11 || itm.id === 12 || itm.id === 13 || itm.id === 14 || itm.id === 15) {
        for (const i in itm.table) {
          itm.table[i].push(
            {
              alignment: 'center',
              style: `${itm.actividades[i - 1] ? 'textblack' : 'textbold'}`,
              margin: [0, 5, 0, 5],
              text: `${itm.actividades[i - 1] ? itm.id === 11 || itm.id === 13 ? itm.actividades[i - 1].duration : itm.id === 12 ? itm.actividades[i - 1].categoria.nombre : itm.actividades[i - 1].categoria.Departamento.name : itm.id === 11 || itm.id === 13 ? this.$t('form_tiempo').toUpperCase() : itm.id === 12 ? this.$t('form_categoria').toUpperCase() : this.$t('form_departamento').toUpperCase()}`
            }
          )
        }
      }
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
        this.datos.aux = this.datos.actividades.filter(v => this.cliente === null ? v.categoria.departamento === this.depart : v.categoria.departamento === this.depart && v.empresa_id === this.cliente)
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
        } else if (this.datos.id === 16) {
          let stars = 0
          for (const j of this.datos.aux) {
            stars = stars + j.rating.number
          }
          this.datos.cantidad = (stars * this.datos.aux.length) / 100
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
        this.datos.aux = this.datos.actividades.filter(v => this.depart === null ? v.empresa_id === this.cliente : v.empresa_id === this.cliente && v.categoria.departamento === this.depart)
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
          this.semana = this.fecha.from + ' - ' + this.fecha.to
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
            } else if (this.datos.id === 16) {
              let stars = 0
              for (const j of actividades) {
                stars = stars + j.rating.number
              }
              this.datos.cantidad = (stars * actividades.length) / 100
            } else {
              this.datos.cantidad = actividades.length
            }
          } else {
            this.$q.notify({
              message: this.$t('formNotif_superadoRango'),
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
          } else if (this.datos.id === 16) {
            let stars = 0
            for (const j of actividades) {
              stars = stars + j.rating.number
            }
            this.datos.cantidad = (stars * actividades.length) / 100
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
