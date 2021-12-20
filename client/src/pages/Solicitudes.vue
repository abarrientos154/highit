<template>
  <div>
    <div class="q-pa-md q-mb-lg">
      <div class="text-h4 text-bold">SOLICITUDES</div>
      <div class="text-grey text-h6">Listados de solicitudes segun su estado</div>
      <NewSlt @actualizarPadre="$refs.lista.getSltUser()"/>
    </div>
    <ListaSlt ref="lista" @ver="verSlt($event)"/>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">Nº de solicitud:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>
          <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.prioridad ? solicitud.prioridad.color2 : 'red'} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{solicitud.prioridad ? solicitud.prioridad.nombre : 'Prioridad'}}<br>Estado: {{solicitud.status === 0 ? 'Sin iniciar' : solicitud.status === 1 ? 'Ejecución' : solicitud.status === 2 ? 'En espera' : solicitud.status === 3 ? 'Checkout' : solicitud.status === 4 ? 'Confirmar' : solicitud.status === 5 ? 'Finalizado' : 'Reabierta'}}</div>
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
                <div class="text-grey-7">{{solicitud.contrato}}</div>
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
                <div class="text-grey-7">{{solicitud.timeEnd}}hr</div>
              </div>
            </div>
          </div>
          <div v-if="solicitud.hitos.length" class="full-width q-px-sm q-mb-md">
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
          <div class="q-px-sm q-mb-md" v-if="action === 6">
            <div>
              <div class="text-caption text-grey-8">Nombre de la actividad</div>
              <q-input dense v-model="form.name" filled placeholder="Nombre" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
            </div>
            <div>
              <div class="text-caption text-grey-8">Descripción del trabajo realizado</div>
              <q-input dense v-model="form.description" filled type="textarea" placeholder="Hasta 500 caracteres" error-message="Este campo es requerido" :error="$v.form.description.$error" @blur="$v.form.description.$touch()"/>
            </div>
            <div class="full-width column items-center">
              <q-btn class="text-white q-py-xs" color="primary" label="Reabrir" @click="saveHito()" style="width: 80%; border-radius: 5px;" no-caps/>
            </div>
          </div>
          <div class="q-px-sm q-mb-md" v-if="action === 5">
            <div class="column items-center q-gutter-y-md q-pb-lg">
              <q-rating v-model="rating" size="3.5em" color="yellow" icon="star_border" icon-selected="star"/>
              <q-input dense class="full-width" v-model="comment" filled type="textarea" placeholder="Comenta aquí..."/>
            </div>
            <div class="full-width column items-center">
              <q-btn class="text-white q-py-xs" color="primary" label="Confirmar" @click="saveRating()" style="width: 80%; border-radius: 5px;" no-caps/>
            </div>
          </div>
        </div>
        <div class="full-width row items-center q-px-lg q-mb-lg" v-if="solicitud.status === 4 && action === null">
          <q-btn class="col text-white q-py-xs q-mr-lg" color="primary" label="Reabrir actividad" @click="optionStatus(6)" style="border-radius: 5px;" no-caps/>
          <q-btn class="col text-white q-py-xs" color="primary" label="Confirmar finalizacion" @click="optionStatus(5)" style="border-radius: 5px;" no-caps/>
        </div>
        <div v-else-if="solicitud.status !== 4" class="full-width column items-center q-mb-lg">
          <q-btn class="text-white q-py-xs" color="primary" label="Cerrar Ventana" @click="slt = !slt" style="width: 70%; border-radius: 5px;" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import NewSlt from '../components/NewSolicitud'
import ListaSlt from '../components/Solicitudes'
import * as moment from 'moment'
import env from '../env'
export default {
  components: { NewSlt, ListaSlt },
  data () {
    return {
      baseu: '',
      user: {},
      form: {},
      company: {},
      departamentos: [],
      contratos: [],
      hitos: [],
      equipos: [],
      solicitud: { hitos: [] },
      rating: 1,
      comment: '',
      action: null,
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
      this.$q.loading.show()
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
          this.getDepartamentos()
          this.getContratos()
          this.getHitos()
          this.getEquipos()
        }
        this.$q.loading.hide()
      })
    },
    getDepartamentos () {
      this.$api.get(`departments/${this.company.company_id}`).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    getContratos () {
      this.$api.get(`contratos_by_company/${this.company.company_id}`).then(res => {
        if (res) {
          this.contratos = res
        }
      })
    },
    getHitos () {
      this.$api.get(`hitos_by_company/${this.company.company_id}`).then(res => {
        if (res) {
          this.hitos = res
        }
      })
    },
    getEquipos () {
      this.$api.get('equipo_consultor').then(res => {
        if (res) {
          this.equipos = res
          this.getSltUser()
        }
      })
    },
    getSltUser () {
    },
    verSlt (itm) {
      this.solicitud = { ...itm }
      this.solicitud.department = this.departamentos.filter(v => v._id === itm.categoria.departamento)[0].name
      this.solicitud.contrato = this.contratos.filter(v => v._id === this.company.typeContract)[0].contrato
      this.solicitud.hitos = this.hitos.filter(v => v.solicitud_id === itm._id)
      this.form = {}
      this.$v.form.$reset()
      this.rating = 1
      this.comment = ''
      this.action = null
      this.slt = !this.slt
    },
    optionStatus (idx) {
      this.action = idx
    },
    saveRating () {
      const rating = {
        number: this.rating,
        comment: this.comment,
        solicitud_id: this.solicitud._id,
        consultor_id: this.solicitud.consultor_id,
        cliente_id: this.user._id
      }
      this.$api.post('register_rating', rating).then(res => {
        if (res) {
          this.statusSlt()
        }
      })
    },
    saveHito () {
      this.$v.form.$touch()
      this.form.status = this.action
      if (!this.$v.form.$error) {
        this.form.date = moment().format('YYYY-MM-DD')
        this.form.time = moment().format('HH:mm')
        this.form.company_id = this.company.company_id
        this.form.solicitud_id = this.solicitud._id
        this.$api.post('register_hito', this.form).then(res => {
          if (res) {
            this.statusSlt()
          }
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    statusSlt () {
      let update = {}
      if (this.action === 5) {
        const dias = moment(moment().format('YYYY-MM-DD HH:mm')).diff(moment(this.solicitud.dateBegin + ' ' + this.solicitud.timeBegin), 'days')
        let horas = moment(moment().format('YYYY-MM-DD HH:mm')).diff(moment(this.solicitud.dateBegin + ' ' + this.solicitud.timeBegin), 'hours')
        let minutos = moment(moment().format('YYYY-MM-DD HH:mm')).diff(moment(this.solicitud.dateBegin + ' ' + this.solicitud.timeBegin), 'minutes')
        for (let i = 0; i < horas; i++) { minutos = minutos - 60 }
        for (let i = 0; i < dias; i++) { horas = horas - 24 }
        update = {
          status: this.action,
          dateEnd: moment().format('YYYY-MM-DD'),
          timeEnd: moment().format('HH:mm'),
          duration: (dias > 0 ? dias + 'd : ' : '') + (horas > 0 ? horas + 'hr : ' : '') + minutos + 'min'
        }
      } else if (this.action === 6) {
        update = { status: this.action }
      }
      this.$api.put('status_solicitud/' + this.solicitud._id, update).then(res => {
        if (res) {
          this.$api.post('register_notification', {
            user_id: this.solicitud.consultor_id,
            emit_id: this.user._id,
            status: false,
            solicitud_id: this.solicitud._id,
            icon: this.action === 5 ? 'done_all' : 'open_in_browser',
            name: this.action === 5 ? 'Servicio finalizado' : 'Servicio reabierto',
            description: `${this.action === 5 ? 'Felicidades ha finalizado con exito' : 'Se ha reabierto'} el servicio prestado al cliente ${this.user.name} ${this.user.last_name}, en el que solicita: ${this.solicitud.description}`
          })
          this.$q.notify({
            message: 'Estado de solicitud actualizado',
            color: 'positive'
          })
          this.solicitud = { hitos: [] }
          this.slt = false
          this.getCompany()
          this.$refs.lista.getSltUser()
        }
      })
      this.form = {}
      this.$v.form.$reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
}
</style>
