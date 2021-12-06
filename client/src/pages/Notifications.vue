<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">NOTIFICACIONES</div>
      <div class="text-grey text-h6">Historial de notificaciones, donde te matenemos informado</div>
    </div>

    <div class="q-mb-lg">
      <q-list class="q-px-lg">
        <q-card :class="`q-mb-md ${!item.status ? 'sinVer' : ''}`" v-for="(item, index) in notifications" :key="index" style="width: 100%; border-radius: 20px;">
          <q-item clickable @click="verNotification(item)">
            <q-item-section avatar>
              <q-icon :name="item.icon" size="100px"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-bold">{{item.name}}</q-item-label>
              <q-item-label class="text-subtitle1 text-grey-7" lines="3">{{item.description}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </q-list>
    </div>

    <q-dialog v-model="ver">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-end full-width">
          <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.color} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{solicitud.prioridad ? solicitud.prioridad.nombre : 'Prioridad'}}<br>Estado: {{solicitud.status === 0 ? 'Sin iniciar' : solicitud.status === 1 ? 'Ejecución' : solicitud.status === 2 ? 'En espera' : solicitud.status === 3 ? 'Checkout' : solicitud.status === 4 ? 'Confirmar' : solicitud.status === 5 ? 'Finalizado' : 'Reabierta'}}</div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">Datos solicitud</div>
          <div class="text-center text-grey-8">Descripcion de la solicitud</div>
        </div>
        <div class="q-px-sm q-mb-md full-width">
          <div class="row">
            <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
              <q-img :src="solicitud.empresa ? baseu + solicitud.empresa._id : 'noimg.png'" class="full-height"/>
            </q-avatar>
            <div class="q-px-sm q-py-md col column justify-between">
              <div>
                <div class="text-subtitle1 text-bold">{{solicitud.empresa ? solicitud.empresa.name : 'Empresa'}}</div>
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
                  <div class="text-grey-7 text-caption">{{solicitud.dateSlt}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey-7 text-caption">Hora de solicitud:</div>
                  <div class="text-grey-7 text-caption">{{solicitud.timeSlt}}hrs</div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-px-sm">
            <div class="row justify-center" v-if="solicitud.equipo">
              <div class="text-subtitle1 text-bold text-grey-7 q-mr-xs">Equipo:</div>
              <div class="text-subtitle1 text-grey-7">{{solicitud.equipo ? solicitud.equipo.name : ''}}</div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">Tipo de contrato</div>
                <div class="text-grey-7">{{solicitud.prioridad && solicitud.prioridad.Contrato ? solicitud.prioridad.Contrato.contrato : ''}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.consultor">
                <div class="text-bold text-grey-7">Usuario asignado</div>
                <div class="text-grey-7">{{solicitud.consultor ? solicitud.consultor.name + ' ' + solicitud.consultor.last_name  : ''}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">Categoria</div>
                <div class="text-grey-7">{{solicitud.categoria ? solicitud.categoria.nombre : ''}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">Departamento</div>
                <div class="text-grey-7">{{solicitud.categoria && solicitud.categoria.Departamento ? solicitud.categoria.Departamento.name : ''}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">Fecha de inicio</div>
                <div class="text-grey-7">{{solicitud.dateBegin}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">Hora de inicio</div>
                <div class="text-grey-7">{{solicitud.timeBegin}}hr</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status === 5">
                <div class="text-bold text-grey-7">Fecha estimada de termino</div>
                <div class="text-grey-7">{{solicitud.dateEnd}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status === 5">
                <div class="text-bold text-grey-7">Hora estimada de termino</div>
                <div class="text-grey-7">{{solicitud.timeEnd}}hr</div>
              </div>
            </div>
          </div>
          <div v-if="solicitud.hitos && solicitud.hitos.length" class="full-width q-px-sm q-mb-md">
            <div class="q-mb-sm">
              <div class="text-subtitle1 text-bold">Historial de actividades</div>
              <div class="text-grey-8">Descripcion de los comentarios realisados</div>
            </div>
            <q-list>
              <div v-for="(item, index) in solicitud.hitos" :key="index">
                <div class="row justify-between">
                  <div class="text-grey-8 text-bold">{{item.name}}</div>
                  <div class="row">
                    <div class="text-grey-8 q-mr-xs text-bold">Fecha</div>
                    <div class="text-grey-8">{{item.date + ' ' + item.time}}hr</div>
                  </div>
                </div>
                <div class="text-grey-8">{{item.description}}</div>
              </div>
            </q-list>
          </div>
        </div>
        <div class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" label="Cerrar Ventana" @click="ver = !ver" style="width: 70%; border-radius: 5px;" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      baseu: '',
      ver: false,
      notifications: [],
      solicitud: {}
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'company_img/'
    this.getNotifications()
  },
  methods: {
    getNotifications () {
      this.$q.loading.show()
      this.$api.get('notifications').then(res => {
        if (res) {
          this.notifications = res.reverse()
        }
        this.$q.loading.hide()
      })
    },
    verNotification (itm) {
      if (itm.solicitud_id) {
        this.$api.get('solicitud/' + itm.solicitud_id).then(res => {
          if (res) {
            this.solicitud = res
            if (this.solicitud.prioridad) {
              this.solicitud.color = this.solicitud.prioridad.color === 'Azul' ? 'blue' : this.solicitud.prioridad.color === 'Rojo' ? 'red' : this.solicitud.prioridad.color === 'Verde' ? 'green' : this.solicitud.prioridad.color === 'Amarillo' ? 'yellow' : this.solicitud.prioridad.color === 'Rosado' ? 'pink' : this.solicitud.prioridad.color === 'Gris' ? 'grey' : this.solicitud.prioridad.color === 'Negro' ? 'black' : this.solicitud.prioridad.color === 'Celeste' ? 'blue-3' : this.solicitud.prioridad.color === 'Anaranjado' ? 'orange' : this.solicitud.prioridad.color === 'Morado' ? 'purple' : 'brown'
            }
            console.log(res)
            this.ver = true
          }
        })
      }
      if (!itm.status) {
        this.$api.put('update_notification/' + itm._id, { status: true })
        itm.status = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sinVer {
  border-right: 10px solid red;
}
</style>
