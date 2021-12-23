<template>
  <div>
    <div class="q-pa-md q-mb-lg">
      <div class="text-h4 text-bold">SOLICITUDES</div>
      <div class="text-grey text-h6">Listados de solicitudes segun su estado</div>
    </div>
    <ListaSlt ref="lista" @ver="verSlt($event)"/>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">Nº de solicitud:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>
          <div class="row">
            <div v-if="solicitud.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            <div v-if="solicitud.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.prioridad ? solicitud.prioridad.color2 : 'red'} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{solicitud.prioridad ? solicitud.prioridad.nombre : 'Prioridad'}}<br>Estado: {{solicitud.status === 0 ? 'Sin iniciar' : solicitud.status === 1 ? 'Ejecución' : solicitud.status === 2 ? 'En espera' : solicitud.status === 3 ? 'Checkout' : solicitud.status === 4 ? 'Confirmar' : solicitud.status === 5 ? 'Finalizado' : 'Reabierta'}}</div>
          </div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">{{solicitud.status === 0 && solicitud.sltBegin === 0 ? 'Tomar solicitud' : solicitud.status === 1 || solicitud.status === 2 ||solicitud.status === 3 ? 'Cambiar estado' : 'Datos solicitud'}}</div>
          <div class="text-center text-grey-8">Modifica el estado de la solicitud</div>
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
                  <div class="row justify-between items-center">
                    <div class="text-bold text-caption text-grey-7">Descripcion del servicio:</div>
                    <div v-if="solicitud.scheduled" class="text-bold text-grey-7" style="font-size: 10px;">Solicitud agendada</div>
                  </div>
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
                  <div class="text-grey-7 text-caption">{{solicitud.time}}hrs</div>
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
                <div class="text-grey-7">{{solicitud.contrato}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">Usuario asignado</div>
                <div class="text-grey-7">{{user.name + ' ' + user.last_name}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">Categoria</div>
                <div class="text-grey-7">{{solicitud.categoria ? solicitud.categoria.nombre : ''}}</div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-bold text-grey-7">Departamento</div>
                <div class="text-grey-7">{{solicitud.department}}</div>
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
                <div class="text-grey-7">{{solicitud.timeEnd}}</div>
              </div>
            </div>
          </div>
          <div v-if="solicitud.hitos.length" class="full-width q-px-sm q-mb-md">
            <div class="q-mb-sm">
              <div class="text-subtitle1 text-bold">Historial de actividades</div>
              <div class="text-grey-8">Descripcion de los comentarios realizados</div>
            </div>
            <q-list>
              <div v-for="(item, index) in solicitud.hitos" :key="index">
                <div class="row justify-between">
                  <div class="text-grey-8 text-bold">{{item.name}}</div>
                  <div class="row">
                    <div class="text-grey-8 q-mr-xs text-bold">Fecha</div>
                    <div class="text-grey-8">{{item.date + ' ' + item.time + 'hr'}}</div>
                  </div>
                </div>
                <div class="text-grey-8">{{item.description}}</div>
              </div>
            </q-list>
          </div>
          <div class="q-px-sm q-mb-md" v-if="(solicitud.status > 0 && solicitud.status < 4) || solicitud.status === 6">
            <div>
              <div class="text-caption text-grey-8">Cambia el estado de Solicitud</div>
              <q-select dense filled v-model="form.status" :options="solicitud.estados" map-options option-label="name" emit-value option-value="status" :error="$v.form.status.$error" @blur="$v.form.status.$touch()"/>
            </div>
            <div>
              <div class="text-caption text-grey-8">Nombre de la actividad</div>
              <q-input dense v-model="form.name" filled placeholder="Nombre" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
            </div>
            <div>
              <div class="text-caption text-grey-8">Descripción del trabajo realizado</div>
              <q-input dense v-model="form.description" filled type="textarea" placeholder="Hasta 500 caracteres" error-message="Este campo es requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
            </div>
          </div>
        </div>
        <div class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" :label="solicitud.status === 0 && solicitud.sltBegin === 0 ? 'Iniciar Atención' : (solicitud.status > 0 && solicitud.status < 4) || solicitud.status === 6 ? 'Cambiar estado' : 'Cerrar Ventana'" style="width: 70%; border-radius: 5px;" @click="solicitud.status === 0 && solicitud.sltBegin === 0 ? statusRequest(1) : (solicitud.status > 0 && solicitud.status < 4) || solicitud.status === 6 ? saveHito() : slt = !slt" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
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
      solicitud: { hitos: [] },
      departamentos: [],
      contratos: [],
      hitos: [],
      estados: [
        { name: 'Iniciada', status: 1 },
        { name: 'En pausa', status: 2 },
        { name: 'Checkout', status: 3 },
        { name: 'Finalizado', status: 4 }
      ],
      slt: false,
      estado: false
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
    this.baseu = env.apiUrl + 'company_img/'
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getDepartamentos()
          this.getContratos()
          this.getHitos()
        }
        this.$q.loading.hide()
      })
    },
    getDepartamentos () {
      this.$api.get(`departments/${this.user.company}`).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    getContratos () {
      this.$api.get(`contratos_by_company/${this.user.company}`).then(res => {
        if (res) {
          this.contratos = res
        }
      })
    },
    getHitos () {
      this.$api.get(`hitos_by_company/${this.user.company}`).then(res => {
        if (res) {
          this.hitos = res
        }
      })
    },
    verSlt (itm) {
      this.solicitud = { ...itm }
      this.solicitud.department = this.departamentos.filter(v => v._id === itm.categoria.departamento)[0].name
      this.solicitud.contrato = this.contratos.filter(v => v._id === itm.empresa.typeContract)[0].contrato
      this.solicitud.hitos = this.hitos.filter(v => v.solicitud_id === itm._id)
      this.solicitud.estados = this.estados.filter(v => v.status !== itm.status)
      this.form = {}
      this.$v.form.$reset()
      this.slt = !this.slt
    },
    saveHito () {
      this.$v.form.$touch()
      if (this.form.status === 1) {
        if (this.solicitud.sltBegin === 0) {
          this.estado = true
        } else {
          this.estado = false
        }
      } else {
        this.estado = true
      }
      if (!this.$v.form.$error && this.estado) {
        this.form.date = moment().format('YYYY-MM-DD')
        this.form.time = moment().format('HH:mm')
        this.form.company_id = this.user.company
        this.form.solicitud_id = this.solicitud._id
        this.$api.post('register_hito', this.form).then(res => {
          if (res) {
            this.statusRequest(this.form.status)
            this.form = {}
            this.$v.form.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: this.$v.form.$error ? 'Debe ingresar todos los datos correspondientes' : 'Estado invalido ya tiene una solicitud en curso',
          color: 'negative'
        })
      }
    },
    statusRequest (idx) {
      const status = { status: idx, consultor_id: this.user._id }
      if (this.solicitud.status === 0) {
        status.dateBegin = moment().format('YYYY-MM-DD')
        status.timeBegin = moment().format('HH:mm')
      }
      this.$api.put('status_solicitud/' + this.solicitud._id, status).then(res => {
        if (res) {
          this.$api.post('register_notification', {
            user_id: this.solicitud.user_id,
            emit_id: this.user._id,
            status: false,
            solicitud_id: this.solicitud._id,
            icon: idx === 1 ? 'cached' : idx === 2 ? 'schedule' : idx === 3 ? 'published_with_changes' : 'done',
            name: `Estado de solicitud modificado a ${idx === 1 ? '"Iniciada"' : idx === 2 ? '"En pausa"' : idx === 3 ? '"Checkout"' : '"Confirmar"'}`,
            description: `El consultor ${this.user.name} ${this.user.last_name}, ha ${this.solicitud.status === 0 ? 'aceptado llevar a cabo' : `modificado el estado a ${idx === 1 ? '"Iniciada"' : idx === 2 ? '"En pausa"' : idx === 3 ? '"Checkout"' : '"Confirmar"'}, de`} la actividad en la que solicitas: ${this.solicitud.description}`
          })
          this.$q.notify({
            message: 'Estado de solicitud actualizado',
            color: 'positive'
          })
          this.solicitud = { hitos: [] }
          this.slt = false
          this.getHitos()
          this.$refs.lista.getSltUser()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
