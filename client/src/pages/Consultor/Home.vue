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
    </div>
    <div v-if="sltHistory.length > 6" class="column items-center">
      <q-btn class="text-white q-py-xs" color="primary" :label="ver ? 'Ver Menos' : 'Ver Mas'" style="width: 80%; border-radius: 5px;" @click="verMas()" no-caps/>
    </div>
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
      history: [],
      sltHistory: [],
      ver: false
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
          // this.getSlAs()
          this.getCompany()
          this.getSltHistory()
        }
      })
    },
    getCompany () {
      this.$api.get('company/' + this.user.empresa).then(res => {
        if (res) {
          this.company = res
          this.baseu = env.apiUrl + 'company_img/' + this.company._id
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
    verMas () {
      if (this.ver) {
        this.history = this.sltHistory
      } else {
        this.history = this.sltHistory.slice(0, 6)
      }
      this.ver = !this.ver
    }
  }
}
</script>
