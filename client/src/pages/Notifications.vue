<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{$t('titulo_moduloNotificaciones')}}</div>
      <div class="text-grey text-h6">{{$t('subtitulo_moduloNotificaciones')}}</div>
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
        <div v-if="itm.solicitud_id">
          <div class="row q-px-lg items-center justify-end full-width">
            <div :class="`text-caption q-px-lg text-center text-white bg-${datos.color} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{datos.prioridad ? datos.prioridad.nombre : ''}}<br>{{$t('form_estado') + ': ' + (datos.status === 0 ? $t('statusSlt_0') : datos.status === 1 ? $t('statusSlt_1') : datos.status === 2 ? $t('statusSlt_2') : datos.status === 3 ? $t('statusSlt_3') : datos.status === 4 ? $t('statusSlt_4') : datos.status === 5 ? $t('statusSlt_5') : $t('statusSlt_6'))}}</div>
          </div>
          <div class="q-mb-lg q-mt-md">
            <div class="text-center text-h6 text-bold">{{$t('text_datosSolicitud')}}</div>
            <div class="text-center text-grey-8">{{$t('text_descripcionSlt')}}</div>
          </div>
          <div class="q-px-sm q-mb-md full-width">
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
                <q-img :src="datos.empresa ? baseu + 'company_img/' + datos.empresa._id : 'noimg.png'" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col column justify-between">
                <div>
                  <div class="text-subtitle1 text-bold">{{datos.empresa ? datos.empresa.name : $t('form_empresa')}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey-7">{{$t('form_descripcion')}}</div>
                    <q-scroll-area style="height: 60px;">
                      <div class="text-grey-7" style="font-size: 10px;">{{datos.description}}</div>
                    </q-scroll-area>
                  </div>
                </div>
                <div>
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey-7 text-caption">{{$t('form_fechaSlt')}}</div>
                    <div class="text-grey-7 text-caption">{{datos.dateSlt}}</div>
                  </div>
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey-7 text-caption">{{$t('form_HoraSlt')}}</div>
                    <div class="text-grey-7 text-caption">{{datos.timeSlt}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="q-px-sm">
              <div class="row justify-center" v-if="datos.equipo">
                <div class="text-subtitle1 text-bold text-grey-7 q-mr-xs">{{$t('form_equipo')}}:</div>
                <div class="text-subtitle1 text-grey-7">{{datos.equipo ? datos.equipo.name : ''}}</div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('form_contrato')}}</div>
                  <div class="text-grey-7">{{datos.prioridad && datos.prioridad.Contrato ? datos.prioridad.Contrato.contrato : ''}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="datos.consultor">
                  <div class="text-bold text-grey-7">{{$t('rol3')}}</div>
                  <div class="text-grey-7">{{datos.consultor ? datos.consultor.name + ' ' + datos.consultor.last_name  : ''}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('form_categoria')}}</div>
                  <div class="text-grey-7">{{datos.categoria ? datos.categoria.nombre : ''}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('form_departamento')}}</div>
                  <div class="text-grey-7">{{datos.categoria && datos.categoria.Departamento ? datos.categoria.Departamento.name : ''}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="datos.status > 0">
                  <div class="text-bold text-grey-7">{{$t('form_fechaInicio')}}</div>
                  <div class="text-grey-7">{{datos.dateBegin}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="datos.status > 0">
                  <div class="text-bold text-grey-7">{{$t('form_HoraInicio')}}</div>
                  <div class="text-grey-7">{{datos.timeBegin}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="datos.status === 5">
                  <div class="text-bold text-grey-7">{{$t('form_fechaFin')}}</div>
                  <div class="text-grey-7">{{datos.dateEnd}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="datos.status === 5">
                  <div class="text-bold text-grey-7">{{$t('form_HoraFin')}}</div>
                  <div class="text-grey-7">{{datos.timeEnd}}</div>
                </div>
              </div>
            </div>
            <div v-if="datos.hitos && datos.hitos.length" class="full-width q-px-sm q-mb-md">
              <div class="q-mb-sm">
                <div class="text-subtitle1 text-bold">{{$t('text_historialHitos')}}</div>
                <div class="text-grey-8">{{$t('text_descripcionComent')}}</div>
              </div>
              <q-list>
                <div v-for="(item, index) in datos.hitos" :key="index">
                  <div class="row justify-between">
                    <div class="text-grey-8 text-bold">{{item.name}}</div>
                    <div class="row">
                      <div class="text-grey-8 q-mr-xs text-bold">{{$t('form_fecha')}}</div>
                      <div class="text-grey-8">{{item.date + ' ' + item.time}}</div>
                    </div>
                  </div>
                  <div class="text-grey-8">{{item.description}}</div>
                </div>
              </q-list>
            </div>
          </div>
          <div class="full-width column items-center q-mb-lg">
            <q-btn class="text-white q-py-xs" color="primary" :label="$t('accion_cerrarVentana')" @click="ver = !ver" style="width: 70%; border-radius: 5px;" no-caps/>
          </div>
        </div>
        <div v-else-if="itm.userAdd_id" class="q-pa-lg full-width">
          <div class="column items-center">
            <q-avatar size="170px">
              <q-img :src="baseu + 'perfil_img/' + datos._id" class="full-height"/>
            </q-avatar>
            <div class="q-py-md text-center">
              <div class="text-h5 text-bold">{{datos.name + ' ' + datos.last_name}}</div>
              <div class="text-h6 text-grey-7">{{datos.email}}</div>
              <div class="text-bold text-grey-7">{{datos.phone}}</div>
            </div>
          </div>
          <div class="q-px-sm">
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_tipoUsuario')}}</div>
                <div class="text-grey-7">{{datos.roles === 3 ? $t('rol3') : datos.roles === 4 ? $t('rol4') : datos.roles === 5 ? $t('rol5') : datos.roles === 6 ? $t('rol6') : $t('rol7')}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_numDocumento')}}</div>
                <div class="text-grey-7">{{datos.Dni}}</div>
              </div>
            </div>
          </div>
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
      itm: {},
      ver: false,
      notifications: [],
      datos: {}
    }
  },
  mounted () {
    this.baseu = env.apiUrl
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
      this.itm = itm
      if (itm.solicitud_id) {
        this.$api.get('solicitud/' + itm.solicitud_id).then(res => {
          if (res) {
            this.datos = res
            if (this.datos.prioridad) {
              this.datos.color = this.datos.prioridad.color === 'Azul' ? 'blue' : this.datos.prioridad.color === 'Rojo' ? 'red' : this.datos.prioridad.color === 'Verde' ? 'green' : this.datos.prioridad.color === 'Amarillo' ? 'yellow' : this.datos.prioridad.color === 'Rosado' ? 'pink' : this.datos.prioridad.color === 'Gris' ? 'grey' : this.datos.prioridad.color === 'Negro' ? 'black' : this.datos.prioridad.color === 'Celeste' ? 'blue-3' : this.datos.prioridad.color === 'Anaranjado' ? 'orange' : this.datos.prioridad.color === 'Morado' ? 'purple' : 'brown'
            }
            this.ver = true
          }
        })
      } else if (itm.userAdd_id) {
        this.$api.get('datauser/' + itm.userAdd_id).then(res => {
          if (res) {
            this.datos = res
            this.datos.roles = this.datos.roles[0]
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
