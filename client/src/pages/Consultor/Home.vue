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
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes sin iniciar</div>
        <div class="text-grey-8">Listado de actividades de tu departamento sin trabajar</div>
      </div>
      <q-list class="q-px-md">
        <q-card class="q-mb-md full-width" v-for="(item, index) in solicitudes" :key="index" @click="verStl(item, index)">
          <div class="row q-px-lg items-center justify-between">
            <div class="row">
              <div class="q-mr-xs">Nº de solicitud:</div>
              <div class="text-bold">{{index + 1}}</div>
            </div>
            <div :class="`text-caption q-px-lg text-white bg-${slas.filter(v => v._id === item.priority)[0].color2} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
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
              <div class="text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.company_id)[0].name}}</div>
              <div>
                <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                <q-scroll-area style="height: 60px;">
                  <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                </q-scroll-area>
              </div>
            </div>
          </div>
        </q-card>
      </q-list>
      <div v-if="sltAll.length > 2" class="column items-center">
        <q-btn class="text-white q-py-xs" color="primary" :label="ver ? 'Ver Menos' : 'Ver Mas'" style="width: 80%; border-radius: 5px;" @click="verMas(1)" no-caps/>
      </div>
    </div>
    <div>
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Historial de solicitudes</div>
        <div class="text-grey-8">Conose algunas de las solicitudes realizadas</div>
      </div>
      <q-list class="row q-px-sm">
        <div class="col-xs-12 col-sm-6 col-md-6 q-mb-md q-px-sm" v-for="(item, index) in history" :key="index">
          <q-card>
            <div class="row justify-between">
              <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{'001'}}</div>
              <div class="bg-red q-mr-md" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            </div>
            <div class="column items-center" style="margin-top: -10px">
              <q-avatar class="bg-secondary" size="75px">
                <q-img :src="baseu" class="full-height"/>
              </q-avatar>
              <div class="text-center text-subtitle1 text-bold">{{company.name}}</div>
            </div>
            <div class="q-pa-md">
              <div>
                <div class="row">
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Estado</div>
                    <div style="font-size: 10px;">{{'En espera'}}</div>
                  </div>
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Usuario asignado</div>
                    <div style="font-size: 10px;">{{'Usuario'}}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Tipo de Contrato</div>
                    <div style="font-size: 10px;">{{'Contrato 01'}}</div>
                  </div>
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Departamento</div>
                    <div style="font-size: 10px;">{{'Departamento 01'}}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha solicitud:</div>
                  <div style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha termino estimada:</div>
                  <div style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Tiempo estimado de termino:</div>
                  <div style="font-size: 10px;">{{'10min'}}</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-list>
      <div v-if="sltHistory.length > 6" class="column items-center">
        <q-btn class="text-white q-py-xs" color="primary" :label="ver2 ? 'Ver Menos' : 'Ver Mas'" style="width: 80%; border-radius: 5px;" @click="verMas(2)" no-caps/>
      </div>
    </div>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">Nº de solicitud:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>
          <div :class="`text-caption q-px-lg text-white bg-${slt ? slas.filter(v => v._id === solicitud.priority)[0].color2 : 'red'} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slt ? slas.filter(v => v._id === solicitud.priority)[0].nombre : ''}}</div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">Tomar solicitud</div>
          <div class="text-center text-grey-8">Modifica el estado de la solicitud</div>
        </div>
        <div class="q-px-sm q-mb-md full-width">
          <div class="row">
            <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
              <q-img :src="baseu + solicitud.company_id" class="full-height"/>
            </q-avatar>
            <div class="q-px-sm q-py-md col column justify-between">
              <div>
                <div class="text-subtitle1 text-bold">{{slt ? empresas.filter(v => v._id === solicitud.company_id)[0].name : ''}}</div>
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
                  <div class="text-grey-7 text-caption">{{solicitud.date}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey-7 text-caption">Hora de solicitud:</div>
                  <div class="text-grey-7 text-caption">{{'20:30hrs'}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-px-sm">
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Tipo de contrato</div>
                <div class="text-grey-7">{{'En espera'}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Usuario asignado</div>
                <div class="text-grey-7">{{'Usuario'}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Categoria</div>
                <div class="text-grey-7">{{'Contrato 01'}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Departamento</div>
                <div class="text-grey-7">{{'Departamento 01'}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Fecha de inicio</div>
                <div class="text-grey-7">{{'Contrato 01'}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Hora de inicio</div>
                <div class="text-grey-7">{{'Departamento 01'}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Fecha estimada de termino</div>
                <div class="text-grey-7">{{'Contrato 01'}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Hora estimada de termino</div>
                <div class="text-grey-7">{{'Departamento 01'}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" label="Tomar solicitud" style="width: 70%; border-radius: 5px;" @click="acceptRequest(solicitud)" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </q-scroll-area>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      user: {},
      company: {},
      empresas: [],
      solicitud: {},
      solicitudes: [],
      sltAll: [],
      history: [],
      sltHistory: [],
      slt: false,
      ver: false,
      ver2: false
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'company_img/'
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getSlAs()
          this.getEmpresas()
        }
      })
    },
    getEmpresas () {
      this.$api.get('companys_by_company/' + this.user.company).then(res => {
        if (res) {
          this.empresas = res
          console.log(this.empresas)
        }
      })
    },
    getSlAs () {
      this.$api.get('sla_by_company/' + this.user.company).then(res => {
        if (res) {
          this.slas = res
          this.getSlt()
          this.getSltHistory()
          console.log(this.slas, 'slas')
        }
      })
    },
    getSlt () {
      this.$api.put('solicitudes_by_department/' + this.user.departamento, { status: 0 }).then(res => {
        if (res) {
          this.sltAll = res
          this.solicitudes = this.sltAll.slice(0, 2)
        }
      })
    },
    getSltHistory () {
      this.$api.put('solicitudes_company/' + this.user.empresa, { status: 3 }).then(res => {
        if (res) {
          this.sltHistory = res
          this.history = this.sltHistory.slice(0, 6)
          // console.log(this.sltHistory, 'historySlt')
        }
      })
    },
    verStl (itm, idx) {
      this.slt = !this.slt
      this.solicitud = itm
      this.solicitud.num = idx + 1
    },
    acceptRequest () {
      this.$api.put('accept_solicitud/' + this.solicitud._id, { status: 1, consultor_id: this.user._id }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Solicitud aceptada',
            color: 'positive'
          })
          this.solicitud = {}
          this.slt = false
          this.getSlt()
        }
      })
    },
    verMas (idx) {
      if (idx === 1) {
        this.ver = !this.ver
        if (this.ver) {
          this.solicitudes = this.sltAll
        } else {
          this.solicitudes = this.sltAll.slice(0, 2)
        }
      } else {
        this.ver2 = !this.ver2
        if (this.ver2) {
          this.history = this.sltHistory
        } else {
          this.history = this.sltHistory.slice(0, 6)
        }
        this.ver2 = !this.ver2
      }
    }
  }
}
</script>
