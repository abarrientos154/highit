<template>
  <q-scroll-area :visible="false" class="window-height">
    <div class="row">
      <q-separator vertical class="bg-grey-7"/>
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">HOME PRINCIPAL</div>
        <div class="text-grey-8 text-h6">Pagina de inicio del sitio</div>
      </div>
      <q-separator vertical class="bg-grey-7"/>
    </div>
    <q-separator class="bg-grey-7 q-mb-lg"/>
    <!-- <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Resumen Mensual</div>
        <div class="text-grey-8">Las actividades del mes</div>
      </div>
      <q-scroll-area horizontal style="height: 90px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in resumen" :key="index" style="min-width: 150px;">
            <div class="q-pa-sm">
              <div class="text-subtitle1 text-bold">{{'Nombre SLA 01'}}</div>
              <div class="text-center">
                <div class="text-bold" style="font-size: 10px;">Actividades realizadas {{'07'}}</div>
                <div class="text-bold" style="font-size: 10px;">Actividades pendientes {{'17'}}</div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div> -->
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes sin comenzar</div>
        <div class="text-grey-8">Estas son tus solicitudes aun no tomadas</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in solicitudes" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="column items-end">
              <div :class="`text-caption text-white q-px-lg bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.company_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.date}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{company.name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes pendientes</div>
        <div class="text-grey-8">Estas son tus solicitudes que no están resueltas</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltBegin" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="column items-end">
              <div :class="`text-caption text-white q-px-lg bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.company_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.date}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{company.name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes en espera</div>
        <div class="text-grey-8">Estas son tus solicitudes que no han sido finalizadas</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltProgress" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="column items-end">
              <div :class="`text-caption text-white q-px-lg bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.company_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.date}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{company.name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes en checkout</div>
        <div class="text-grey-8">Estas son tus solicitudes por verificar</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltCheckout" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="column items-end">
              <div :class="`text-caption text-white q-px-lg bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.company_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.date}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{company.name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes por confirmar</div>
        <div class="text-grey-8">Confirma que tus solicitudes han sido finalizadas</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltConfirm" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="column items-end">
              <div :class="`text-caption text-white q-px-lg bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.company_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.date}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{company.name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div>
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Historial de solicitudes</div>
        <div class="text-grey-8">Conose algunas de las solicitudes realizadas</div>
      </div>
      <q-list class="row q-px-sm">
        <div class="col-xs-12 col-sm-6 col-md-6 q-mb-md q-px-sm" v-for="(item, index) in history" :key="index">
          <q-card @click="verSlt(item, index)">
            <div class="row justify-between">
              <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{index + 1}}</div>
              <div :class="`bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md`" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            </div>
            <div class="column items-center" style="margin-top: -10px">
              <q-avatar class="bg-secondary" size="75px">
                <q-img :src="baseu + item.company_id" class="full-height"/>
              </q-avatar>
              <div class="text-center text-subtitle1 text-bold">{{company.name}}</div>
            </div>
            <div class="q-pa-md">
              <div>
                <div class="row">
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Estado</div>
                    <div style="font-size: 10px;">{{item.status === 0 ? 'Sin iniciar' : item.status === 1 ? 'Ejecución' : item.status === 2 ? 'En espera' : item.status === 3 ? 'Checkout' : item.status === 4 ? 'Confirmar' : item.status === 5 ? 'Finalizado' : ''}}</div>
                  </div>
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Usuario asignado</div>
                    <div style="font-size: 10px;">{{'Usuario'}}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Tipo de Contrato</div>
                    <div style="font-size: 10px;">{{contratos.filter(v => v._id === company.typeContract)[0].contrato}}</div>
                  </div>
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Departamento</div>
                    <div style="font-size: 10px;">{{departamentos.filter(v => v._id === categorias.filter(v => v._id === item.category)[0].departamento)[0].name}}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha solicitud:</div>
                  <div style="font-size: 10px;">{{item.dateBegin}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha termino estimada:</div>
                  <div style="font-size: 10px;">{{item.dateEnd}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Tiempo estimado de termino:</div>
                  <div style="font-size: 10px;">{{'20'}}hrs</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-list>
    </div>
    <div v-if="sltEnd.length > 6" class="column items-center">
      <q-btn class="text-white q-py-xs" color="primary" :label="ver ? 'Ver Menos' : 'Ver Mas'" style="width: 80%; border-radius: 5px;" @click="verMas()" no-caps/>
    </div>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">Nº de solicitud:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>
          <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.priorityColor} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{solicitud.priority}}<br>Estado: {{solicitud.status === 0 ? 'Sin iniciar' : solicitud.status === 1 ? 'Ejecución' : solicitud.status === 2 ? 'En espera' : solicitud.status === 3 ? 'Checkout' : solicitud.status === 4 ? 'Confirmar' : solicitud.status === 5 ? 'Finalizado' : ''}}</div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">Datos solicitud</div>
          <div class="text-center text-grey-8">Descripcion de la solicitud</div>
        </div>
        <div class="q-px-sm q-mb-md full-width">
          <div class="row">
            <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
              <q-img :src="baseu + solicitud.company_id" class="full-height"/>
            </q-avatar>
            <div class="q-px-sm q-py-md col column justify-between">
              <div>
                <div class="text-subtitle1 text-bold">{{solicitud.empresa}}</div>
                <div>
                  <div class="text-bold text-caption text-grey-7">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey-7" style="font-size: 10px;">{{solicitud.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey-7 text-caption">Fecha de solicitud:</div>
                  <div class="text-grey-7 text-caption">{{solicitud.date2}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey-7 text-caption">Hora de solicitud:</div>
                  <div class="text-grey-7 text-caption">{{solicitud.time}}hrs</div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-px-sm">
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Tipo de contrato</div>
                <div class="text-grey-7">{{solicitud.contrato}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Usuario asignado</div>
                <div class="text-grey-7">{{''}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Categoria</div>
                <div class="text-grey-7">{{solicitud.category}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Departamento</div>
                <div class="text-grey-7">{{solicitud.department}}</div>
              </div>
            </div>
            <div class="row" v-if="solicitud.status > 0">
              <div class="col">
                <div class="text-bold text-grey-7">Fecha de inicio</div>
                <div class="text-grey-7">{{solicitud.dateBegin}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Hora de inicio</div>
                <div class="text-grey-7">{{solicitud.timeBegin}}hr</div>
              </div>
            </div>
            <div class="row" v-if="solicitud.status === 5">
              <div class="col">
                <div class="text-bold text-grey-7">Fecha estimada de termino</div>
                <div class="text-grey-7">{{solicitud.dateEnd}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Hora estimada de termino</div>
                <div class="text-grey-7">{{solicitud.timeEnd}}hr</div>
              </div>
            </div>
          </div>
          <div v-if="solicitud.hitos.length" class="full-width q-px-sm q-mb-md">
            <div class="q-mb-sm">
              <div class="text-subtitle1 text-bold">Historial de hitos</div>
              <div class="text-grey-8">Descripcion de los comentarios realisados</div>
            </div>
            <q-list>
              <div v-for="(item, index) in solicitud.hitos" :key="index">
                <div class="row justify-between">
                  <div class="text-grey-8 text-bold">{{item.name}}</div>
                  <div class="row">
                    <div class="text-grey-8 q-mr-xs text-bold">Fecha</div>
                    <div class="text-grey-8">{{item.date}}</div>
                  </div>
                </div>
                <div class="text-grey-8">{{item.description}}</div>
              </div>
            </q-list>
          </div>
          <div class="q-px-sm q-mb-md" v-if="solicitud.status === 4">
            <div>
              <div class="text-caption text-grey-8">Nombre de hito</div>
              <q-input dense v-model="form.name" filled placeholder="Nombre del hito" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
            </div>
            <div>
              <div class="text-caption text-grey-8">Descripción del trabajo realizado</div>
              <q-input dense v-model="form.description" filled type="textarea" placeholder="Hasta 500 caracteres" error-message="Este campo es requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
            </div>
          </div>
        </div>
        <div class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" :label="solicitud.status === 4 ? 'Confirmar finalizacion' : 'Cerrar'" @click="solicitud.status === 4 ? saveHito() : slt = !slt" style="width: 70%; border-radius: 5px;" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </q-scroll-area>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      user: {},
      form: {},
      company: {},
      resumen: [],
      slas: [],
      categorias: [],
      departamentos: [],
      contratos: [],
      hitos: [],
      solicitudes: [],
      sltBegin: [],
      sltProgress: [],
      sltCheckout: [],
      sltConfirm: [],
      sltEnd: [],
      history: [],
      solicitud: { hitos: [] },
      slt: false,
      ver: false
    }
  },
  validations: {
    form: {
      status: { required },
      name: { required },
      description: { required }
    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getCompany()
        }
      })
    },
    getCompany () {
      this.$api.get('company/' + this.user.empresa).then(res => {
        if (res) {
          this.company = res
          this.baseu = env.apiUrl + 'company_img/'
          this.getSlAs()
          this.getCategorias()
          this.getDepartamentos()
          this.getContratos()
          this.getHitos()
        }
      })
    },
    getSlAs () {
      this.$api.get('sla_by_contrato/' + this.company.typeContract).then(res => {
        if (res) {
          this.slas = res
          // console.log(this.slas, 'slas')
        }
      })
    },
    getCategorias () {
      this.$api.get(`categorias/${this.company.company_id}`).then(res => {
        if (res) {
          this.categorias = res
          // console.log(this.categorias, 'categorias')
        }
      })
    },
    getDepartamentos () {
      this.$api.get(`departments/${this.company.company_id}`).then(res => {
        if (res) {
          this.departamentos = res
          // console.log(this.departamentos, 'depas')
        }
      })
    },
    getContratos () {
      this.$api.get(`contratos_by_company/${this.company.company_id}`).then(res => {
        if (res) {
          this.contratos = res
          // console.log(this.contratos, 'contratos')
        }
      })
    },
    getHitos () {
      this.$api.get(`hitos_by_company/${this.company.company_id}`).then(res => {
        if (res) {
          this.hitos = res
          this.getSltUser()
          // console.log(this.hitos, 'hitos')
        }
      })
    },
    getSltUser () {
      for (var i = 0; i < 6; i++) {
        this.$api.put('solicitudes_cliente/' + this.user._id, i === 0 ? { status: i } : i === 1 ? { status: i } : i === 2 ? { status: i } : i === 3 ? { status: i } : i === 4 ? { status: i } : i === 5 ? { status: i } : {}).then(res => {
          if (res) {
            // console.log(res, 'resresresresres')
            if (res.length && res[0].status === 0) {
              this.solicitudes = res
            } else if (res.length && res[0].status === 1) {
              this.sltBegin = res
            } else if (res.length && res[0].status === 2) {
              this.sltProgress = res
            } else if (res.length && res[0].status === 3) {
              this.sltCheckout = res
              console.log(this.sltCheckout, 'sltCheckout')
            } else if (res.length && res[0].status === 4) {
              this.sltConfirm = res
            } else if (res.length && res[0].status === 5) {
              this.sltEnd = res
              this.history = this.sltEnd.slice(0, 6)
            }
          }
        })
      }
    },
    verSlt (itm, idx) {
      this.slt = !this.slt
      console.log(itm)
      this.solicitud = { ...itm }
      this.solicitud.empresa = this.company.name
      this.solicitud.priority = this.slas.filter(v => v._id === itm.priority)[0].nombre
      this.solicitud.priorityColor = this.slas.filter(v => v._id === itm.priority)[0].color2
      this.solicitud.category = this.categorias.filter(v => v._id === itm.category)[0].nombre
      this.solicitud.department = this.departamentos.filter(v => v._id === this.categorias.filter(v => v._id === itm.category)[0].departamento)[0].name
      this.solicitud.contrato = this.contratos.filter(v => v._id === this.company.typeContract)[0].contrato
      this.solicitud.hitos = this.hitos.filter(v => v.solicitud_id === itm._id)
      this.solicitud.num = idx + 1
    },
    verMas () {
      this.ver = !this.ver
      if (this.ver) {
        this.history = this.sltHistory
      } else {
        this.history = this.sltHistory.slice(0, 6)
      }
    },
    saveHito () {
      this.$v.form.$touch()
      this.form.status = 5
      if (!this.$v.form.$error) {
        const hoy = new Date()
        this.form.date = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear()
        this.form.company_id = this.company.company_id
        this.form.solicitud_id = this.solicitud._id
        this.$api.post('register_hito', this.form).then(res => {
          if (res) {
            this.$api.put('status_solicitud/' + this.solicitud._id, { status: this.form.status, dateEnd: this.form.date, timeEnd: hoy.getHours() + ':' + hoy.getMinutes() }).then(res => {
              if (res) {
                this.$q.notify({
                  message: 'Solicitud finalizada',
                  color: 'positive'
                })
                this.solicitud = { hitos: [] }
                this.sltConfirm = []
                this.sltEnd = []
                this.history = []
                this.slt = false
                this.getCompany()
              }
            })
            this.form = {}
            this.$v.form.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    }
  }
}
</script>
