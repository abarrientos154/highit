<template>
  <q-scroll-area :visible="false" class="window-height">
    <div class="bordes q-mb-lg">
      <div class="q-pa-md column items-end col">
        <div class="text-h3 text-bold">HOME PRINCIPAL</div>
        <div class="text-grey-8 text-h6">Pagina de inicio del sitio</div>
        <NewSlt @actualizarPadre="$refs.lista.getSltUser()"/>
      </div>
    </div>
    <ListaSlt ref="lista" @ver="verSlt($event)"/>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">Nº de solicitud:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>
          <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.prioridad ? solicitud.prioridad.color2 : 'red'} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{solicitud.prioridad ? solicitud.prioridad.nombre : 'Prioridad'}}<br>Estado: {{solicitud.status === 0 ? 'Sin iniciar' : solicitud.status === 1 ? 'Ejecución' : solicitud.status === 2 ? 'En espera' : solicitud.status === 3 ? 'Checkout' : solicitud.status === 4 ? 'Confirmar' : solicitud.status === 5 ? 'Finalizado' : ''}}</div>
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
              <div class="col">
                <div class="text-bold text-grey-7">Tipo de contrato</div>
                <div class="text-grey-7">{{solicitud.contrato}}</div>
              </div>
              <div class="col" v-if="solicitud.consultor">
                <div class="text-bold text-grey-7">Usuario asignado</div>
                <div class="text-grey-7">{{solicitud.consultor ? solicitud.consultor.name + ' ' + solicitud.consultor.last_name : ''}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Categoria</div>
                <div class="text-grey-7">{{solicitud.categoria ? solicitud.categoria.nombre : ''}}</div>
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
                    <div class="text-grey-8">{{item.date + ' ' + item.time}}hr</div>
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
import NewSlt from '../../components/NewSolicitud'
import ListaSlt from '../../components/Solicitudes'
import * as moment from 'moment'
import env from '../../env'
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
          this.getDepartamentos()
          this.getContratos()
          this.getHitos()
        }
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
    verSlt (itm) {
      this.solicitud = { ...itm }
      this.solicitud.department = this.departamentos.filter(v => v._id === itm.categoria.departamento)[0].name
      this.solicitud.contrato = this.contratos.filter(v => v._id === this.company.typeContract)[0].contrato
      this.solicitud.hitos = this.hitos.filter(v => v.solicitud_id === itm._id)
      this.slt = !this.slt
    },
    saveHito () {
      this.$v.form.$touch()
      this.form.status = 5
      if (!this.$v.form.$error) {
        this.form.date = moment().format('YYYY-MM-DD')
        this.form.time = moment().format('HH:mm')
        this.form.company_id = this.company.company_id
        this.form.solicitud_id = this.solicitud._id
        this.$api.post('register_hito', this.form).then(res => {
          if (res) {
            const horas = moment(moment().format('YYYY-MM-DD HH:mm')).diff(moment(this.solicitud.dateBegin + ' ' + this.solicitud.timeBegin), 'hours')
            let minutos = moment(moment().format('YYYY-MM-DD HH:mm')).diff(moment(this.solicitud.dateBegin + ' ' + this.solicitud.timeBegin), 'minutes')
            for (let j = 0; j < horas; j++) {
              minutos = minutos - 60
            }
            const fin = {
              status: this.form.status,
              dateEnd: this.form.date,
              timeEnd: this.form.time,
              duration: horas + ':' + minutos
            }
            this.$api.put('status_solicitud/' + this.solicitud._id, fin).then(res => {
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

<style lang="scss" scoped>
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
}
</style>
