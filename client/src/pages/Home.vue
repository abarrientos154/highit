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
        <div class="text-h6 text-bold">Resumen Mensual</div>
        <div class="text-grey-8">Las actividades del mes</div>
      </div>
      <q-scroll-area horizontal style="height: 90px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in 6" :key="index" style="min-width: 150px;">
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
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes sin comenzar</div>
        <div class="text-grey-8">Estas son tus solicitudes aun no tomadas</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in 4" :key="index" style="width: 425px;">
            <div class="column items-end">
              <div class="text-caption text-white q-px-lg bg-red q-mr-md row items-center" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{'Nombre SLA 01'}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="''" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{'Nombre Empresa'}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{'Descripcion'}}</div>
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
          <q-card class="q-mx-sm" v-for="(item, index) in 4" :key="index" style="width: 425px;">
            <div class="column items-end">
              <div class="text-caption text-white q-px-lg bg-blue-5 q-mr-md row items-center" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{'Nombre SLA 01'}}</div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="''" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{'dd/mm/aaaa'}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{'Nombre Empresa'}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{'Descripcion'}}</div>
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
          <q-card>
            <div class="row justify-between">
              <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{'001'}}</div>
              <div class="bg-red q-mr-md" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            </div>
            <div class="column items-center" style="margin-top: -10px">
              <q-avatar class="bg-secondary" size="75px">
                <q-img :src="''" class="full-height"/>
              </q-avatar>
              <div class="text-center text-subtitle1 text-bold">{{'Nombre Empresa'}}</div>
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
    <div class="column items-center">
      <q-btn class="text-white q-py-xs" color="primary" :label="ver ? 'Ver Menos' : 'Ver Mas'" style="width: 80%; border-radius: 5px;" @click="verMas()" no-caps/>
    </div>
  </q-scroll-area>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      history: [],
      historySlt: [],
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
          this.getHistorySlt()
        }
      })
    },
    getHistorySlt () {
      this.$api.get('' + this.user.empresa).then(res => {
        if (res) {
          this.historySlt = res
          this.history = this.historySlt.slice(0, 6)
          console.log(this.historySlt, 'historySlt')
        }
      })
    },
    verMas () {
      if (this.ver) {
        this.history = this.historySlt
      } else {
        this.history = this.historySlt.slice(0, 6)
      }
    }
  }
}
</script>
