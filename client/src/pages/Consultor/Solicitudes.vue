<template>
  <div>
    <div class="q-pa-md q-mb-lg">
      <div class="text-h4 text-bold">{{$t('titulo_moduloSolicitudes')}}</div>
      <div class="text-grey text-h6">{{$t('subtitulo_listSltEstado')}}</div>
    </div>
    <ListaSlt ref="lista" @ver="verSlt($event), reasign = false" @reasignar="verSlt($event), reasign = true"/>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>

          <div class="row">
            <div v-if="solicitud.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            <div v-if="solicitud.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.prioridad ? solicitud.prioridad.color2 : 'red'} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              {{solicitud.prioridad ? solicitud.prioridad.nombre : $t('form_prioridad')}}<br>{{$t('form_estado')}}: {{solicitud.status === 0 ? $t('statusSlt_0') : solicitud.status === 1 ? $t('statusSlt_1') : solicitud.status === 2 || (solicitud.reasign && solicitud.reasign.status === 2) ? $t('statusSlt_2') : solicitud.status === 3 || (solicitud.reasign && solicitud.reasign.status === 3) ? $t('statusSlt_3') : solicitud.status === 4 ? $t('statusSlt_4') : solicitud.status === 5 ? $t('statusSlt_5') : solicitud.status === 5 || (solicitud.reasign && solicitud.reasign.status === 5) ? $t('statusSlt_6') : ''}}
            </div>
          </div>
        </div>

        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">{{reasign ? $t('text_reasignacion') : solicitud.status === 0 && solicitud.sltBegin === 0 ? $t('text_tomarSlt') : solicitud.status === 1 || solicitud.status === 2 ||solicitud.status === 3 ? $t('text_cambiarEstado') : $t('text_datosSolicitud')}}</div>
          <div class="text-center text-grey-8">{{$t('text_modificaEstadoSlt')}}</div>
        </div>

        <div class="q-px-sm q-mb-md full-width">
          <div class="row">
            <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
              <q-img :src="solicitud.empresa ? baseu + solicitud.empresa._id : 'noimg.png'" class="full-height"/>
            </q-avatar>

            <div class="q-px-sm q-py-md col column justify-between">
              <div>
                <div class="text-subtitle1 text-bold">{{solicitud.empresa ? solicitud.empresa.name : $t('form_empresa')}}</div>
                <div>
                  <div class="text-bold text-caption text-grey-7">{{$t('text_servicioDescription')}}:</div>

                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey-7" style="font-size: 10px;">{{solicitud.description}}</div>
                  </q-scroll-area>
                </div>
              </div>

              <div>
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey-7 text-caption">{{$t('form_fechaSlt')}}:</div>
                  <div class="text-grey-7 text-caption">{{solicitud.date}}</div>
                </div>

                <div class="row">
                  <div class="text-bold q-mr-xs text-grey-7 text-caption">{{$t('form_HoraSlt')}}:</div>
                  <div class="text-grey-7 text-caption">{{solicitud.time}}hr</div>
                </div>
              </div>
            </div>
          </div>

          <div class="q-px-sm">
            <div v-if="solicitud.scheduled" class="row justify-center q-mb-sm">
              <div class="text-bold text-grey-7 text-subtitle1 q-mr-xs">{{$t('text_agendadaSlt')}}</div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">{{$t('form_tipoContrato')}}</div>
                <div class="text-grey-7">{{solicitud.contrato}}</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">{{$t('titulo_userAsignado')}}</div>
                <div class="text-grey-7">{{user.name + ' ' + user.last_name}}</div>
              </div>

              <div v-if="solicitud.equipment" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">{{$t('form_equipo')}}</div>
                <div class="text-grey-7">{{solicitud.equipo ? solicitud.equipo.name : ''}}</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">{{$t('form_categoria')}}</div>
                <div class="text-grey-7">{{solicitud.categoria ? solicitud.categoria.nombre : ''}}</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">{{$t('form_departamento')}}</div>
                <div class="text-grey-7">{{solicitud.department}}</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">{{$t('titulo_fechaHoraExp')}}</div>
                <div class="text-grey-7">{{solicitud.expirationDate}}hr</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">{{$t('form_fechaInicio')}}</div>
                <div class="text-grey-7">{{solicitud.dateBegin}}</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">{{$t('form_HoraInicio')}}</div>
                <div class="text-grey-7">{{solicitud.timeBegin}}hr</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status === 5">
                <div class="text-bold text-grey-7">{{$t('titulo_fechaEstimadaTermino')}}</div>
                <div class="text-grey-7">{{solicitud.dateEnd}}</div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status === 5">
                <div class="text-bold text-grey-7">{{$t('titulo_horaEstimadaTermino')}}</div>
                <div class="text-grey-7">{{solicitud.timeEnd}}</div>
              </div>
            </div>
          </div>

          <div v-if="solicitud.hitos && solicitud.hitos.length" class="full-width q-px-sm q-mb-md">
            <div class="q-mb-sm">
              <div class="text-subtitle1 text-bold">{{$t('text_historialHitos')}}</div>
              <div class="text-grey-8">{{$t('text_descripcionComent')}}</div>
            </div>

            <q-list>
              <div class="q-mb-xs" v-for="(item, index) in solicitud.hitos" :key="index">
                <div class="row justify-between">
                  <div class="text-grey-8 text-bold">{{item.name}}</div>

                  <div class="row">
                    <div class="text-grey-8 q-mr-xs text-bold">{{$t('form_fecha')}}</div>
                    <div class="text-grey-8">{{item.date + ' ' + item.time}}</div>
                  </div>
                </div>

                <div class="text-grey-8 ellipsis-2-lines">{{item.description}}</div>
              </div>
            </q-list>
          </div>

          <div class="q-px-sm q-my-md" v-if="(solicitud.status > 0 && solicitud.status < 4) || solicitud.status === 6 || (solicitud.status === 8 && reasign)">
            <div v-if="reasign === false">
              <div class="text-caption text-grey-8">{{$t('form_cambiaEstadoSlt')}}</div>
              <q-select dense filled v-model="form.status" :options="solicitud.estados" map-options option-label="name" emit-value option-value="status" :error="$v.form.status.$error" @blur="$v.form.status.$touch()"/>
            </div>

            <div v-else>
              <div class="text-caption text-grey-8">{{$t('form_selecCat')}}</div>
              <q-select dense filled v-model="form.category" :options="categorias" map-options option-label="nombre" emit-value option-value="_id" :error="$v.form.category.$error" @blur="$v.form.category.$touch()"/>

              <div class="text-caption text-grey-8">{{$t('form_selecConsultor')}}</div>
              <q-select dense filled v-model="form.consultor_id" :options="form.category ? consultores.filter(v => v._id !== user._id && v.departamento === categorias.find(v => v._id === form.category).departamento && v.area === categorias.find(v => v._id === form.category).area && v.cargo === categorias.find(v => v._id === form.category).cargo) : []" map-options option-label="name" emit-value option-value="_id" :error="$v.form.consultor_id.$error" @blur="$v.form.consultor_id.$touch()"/>
            </div>

            <div v-if="reasign === false">
              <div class="text-caption text-grey-8">{{$t('form_nombreActivi')}}</div>
              <q-input dense v-model="form.name" filled :placeholder="$t('form_nombre')" :error-message="$t('formError_campo')" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
            </div>

            <div>
              <div class="text-caption text-grey-8">{{reasign === false ? $t('form_descripcionTrabajo') : $t('text_motivo')}}</div>
              <q-input dense v-model="form.description" filled type="textarea" :placeholder="$t('form_numCaracteres')" :error-message="$t('formError_campo')" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
            </div>
          </div>
        </div>

        <div class="full-width row items-center q-px-lg q-mb-lg" v-if="(solicitud.status === 7 && solicitud.reasign && solicitud.reasign.consultor_id !== user._id)">
          <q-btn class="col text-white q-py-xs q-mr-lg" color="primary" :label="$t('accion_rechazar')" @click="statusRequest(8)" style="border-radius: 5px;" no-caps/>
          <q-btn class="col text-white q-py-xs" color="primary" :label="$t('accion_aceptar')" @click="statusRequest(solicitud.reasign.status)" style="border-radius: 5px;" no-caps/>
        </div>

        <div v-else class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" :label="reasign ? $t('accion_solicitar') : solicitud.status === 8 ? $t('accion_reanudar') : solicitud.status === 0 && solicitud.sltBegin === 0 ? $t('accion_iniciarAtencion') : (solicitud.status > 0 && solicitud.status < 4) || solicitud.status === 6 ? $t('text_cambiarEstado') : $t('accion_cerrarVentana')" style="width: 70%; border-radius: 5px;" @click="reasign ? saveHito() : solicitud.status === 8 ? statusRequest(solicitud.reasign.status) :  solicitud.status === 0 && solicitud.sltBegin === 0 ? statusRequest(1) : (solicitud.status > 0 && solicitud.status < 4) || solicitud.status === 6 ? saveHito() : slt = !slt" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import ListaSlt from '../../components/Solicitudes'
import * as moment from 'moment'
import env from '../../env'
export default {
  components: { ListaSlt },
  data () {
    return {
      baseu: '',
      user: {},
      form: {},
      solicitud: {},
      departamentos: [],
      contratos: [],
      hitos: [],
      consultores: [],
      estados: [
        { name: this.$t('statusSlt_iniciada'), status: 1 },
        { name: this.$t('statusSlt_2'), status: 2 },
        { name: this.$t('statusSlt_3'), status: 3 },
        { name: this.$t('statusSlt_5'), status: 4 }
      ],
      slt: false,
      reasign: false
    }
  },
  validations: {
    form: {
      description: { required },
      status: { required },
      name: { required },
      consultor_id: {
        required: requiredIf(function () {
          return this.reasign
        })
      },
      category: {
        required: requiredIf(function () {
          return this.reasign
        })
      }
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'company_img/'
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getCategorias()
          this.getConsultores()
        }
        this.$q.loading.hide()
      })
    },
    getCategorias () {
      this.$api.get(`categorias/${this.user.company}`).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    getConsultores () {
      this.$api.get(`user_consultor/${this.user.empresa}`).then(res => {
        if (res) {
          this.consultores = res
        }
      })
    },
    verSlt (itm) {
      this.solicitud = { ...itm }
      this.solicitud.department = this.solicitud.categoria.Departamento.name
      this.solicitud.contrato = this.solicitud.empresa.contrato.contrato
      this.solicitud.estados = this.estados.filter(v => this.solicitud.sltBegin === 0 ? v.status !== itm.status : v.status !== itm.status && v.status !== 1)
      this.form = {}
      this.$v.form.$reset()
      this.slt = !this.slt
    },
    saveHito () {
      this.$v.form.$touch()
      if (this.reasign) {
        this.form.status = 7
        this.form.name = 'Solicitud de reasignación'
      }
      if (!this.$v.form.$error) {
        this.form.date = moment().format('YYYY-MM-DD')
        this.form.time = moment().format('HH:mm')
        this.form.company_id = this.user.company
        this.form.solicitud_id = this.solicitud._id
        this.$api.post('register_hito', this.form).then(res => {
          if (res) {
            this.statusRequest(this.form.status)
          }
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_allDatosCorrectos'),
          color: 'negative'
        })
      }
    },
    statusRequest (idx) {
      const status = {}
      if (idx === 7) {
        status.status = idx
        status.category = this.form.category
        status.consultor_id = this.form.consultor_id
        if (this.solicitud.status !== 8) {
          status.reasign = {
            status: this.solicitud.status,
            category: this.solicitud.category,
            consultor_id: this.solicitud.consultor_id
          }
        }
      } else {
        status.status = idx
        if (idx === 8) {
          status.category = this.solicitud.reasign.category
          status.consultor_id = this.solicitud.reasign.consultor_id
        } else {
          status.consultor_id = this.user._id
          status.reasign = null
        }
      }
      if (this.solicitud.status === 0) {
        status.dateBegin = moment().format('YYYY-MM-DD')
        status.timeBegin = moment().format('HH:mm')
      }
      this.$api.put('status_solicitud/' + this.solicitud._id, status).then(res => {
        if (res) {
          if (idx < 4) {
            this.$api.post('register_notification', {
              user_id: this.solicitud.user_id,
              emit_id: this.user._id,
              status: false,
              solicitud_id: this.solicitud._id,
              icon: idx === 1 ? 'cached' : idx === 2 ? 'schedule' : idx === 3 ? 'published_with_changes' : 'done',
              name: this.$t('tituloNotif_statusSlt') + '"' + (idx === 1 ? this.$t('statusSlt_1') : idx === 2 ? this.$t('statusSlt_2') : idx === 3 ? this.$t('statusSlt_3') : this.$t('statusSlt_4')) + '"',
              description: this.$t('textNotif_statusSlt1') + this.user.name + ' ' + this.user.last_name + this.$t('textNotif_statusSlt2') + (this.solicitud.status === 0 ? this.$t('textNotif_statusSlt3') : this.$t('textNotif_statusSlt4') + '"' + (idx === 1 ? this.$t('statusSlt_1') : idx === 2 ? this.$t('statusSlt_2') : idx === 3 ? this.$t('statusSlt_3') : this.$t('statusSlt_4')) + '"' + this.$t('textNotif_statusSlt5')) + this.$t('textNotif_statusSlt6') + this.solicitud.description
            })
          }
          this.$q.notify({
            message: this.$t('formNotif_estadoSltActualizado'),
            color: 'positive'
          })
          this.solicitud = {}
          this.slt = false
          this.form = {}
          this.$v.form.$reset()
          this.$refs.lista.getSltUser()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
