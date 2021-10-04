<template>
  <div class="full-width">
    <q-list class="row">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-sm">
        <div class="q-px-md">
          <div class="text-h6 text-bold">Solicitudes sin comenzar</div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades de tu departamento sin trabajar' : 'Estas son tus solicitudes aun no tomadas'}}</div>
        </div>
        <q-scroll-area v-if="solicitudes.length" :style="solicitudes.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-md q-pt-md">
            <q-card class="q-mb-md full-width" v-for="(item, index) in solicitudes" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row">
                  <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-lg row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
                </div>
              </div>
              <div class="row">
                <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="q-px-sm q-py-md col">
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-md">
          <div class="text-h6 text-bold">{{rol === 3 ? 'Solicitud activa' : 'Solicitudes pendientes'}}</div>
          <div class="text-grey-8">{{rol === 3 ? 'Actividad en curso' : 'Estas son tus solicitudes que no están resueltas'}}</div>
        </div>
        <q-scroll-area v-if="sltBegin.length" :style="sltBegin.length === 1 && rol !== 3 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-md q-pt-md">
            <q-card :class="`${rol !== 3 ? 'q-mb-md' : ''} full-width`" v-for="(item, index) in sltBegin" :key="index" @click="verSlt(item, index)" :style="rol === 3 ? 'height: 370px;' : ''">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row">
                  <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-lg row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
                </div>
              </div>
              <div v-if="rol === 3" class="column items-center q-px-md q-pb-md">
                <q-avatar class="bg-secondary" size="125px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="text-h6 text-bold">{{item.empresa.name}}</div>
                <div class="text-caption text-grey-7">
                  <div class="ellipsis-3-lines q-mb-sm"><b>Descripcion del servicio:</b> {{item.description}}</div>
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="text-bold">Fecha de solicitud:</div>
                      <div>{{item.dateSlt}}</div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="text-bold">Hora de solicitud:</div>
                      <div>{{item.timeSlt}}hr</div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="text-bold">Fecha de inicio</div>
                      <div>{{item.dateBegin}}</div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="text-bold">Hora de inicio</div>
                      <div>{{item.timeBegin}}hr</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="row">
                <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="q-px-sm q-py-md col">
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-md">
          <div class="text-h6 text-bold">Solicitudes en espera</div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades por finalizar' : 'Estas son tus solicitudes que no han sido finalizadas'}}</div>
        </div>
        <q-scroll-area v-if="sltProgress.length" :style="sltProgress.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-md q-py-sm">
            <q-card class="q-mb-md full-width" v-for="(item, index) in sltProgress" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row">
                  <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-lg row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
                </div>
              </div>
              <div class="row">
                <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="q-px-sm q-py-md col">
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-md">
          <div class="text-h6 text-bold">Solicitudes en checkout</div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades por verificar' : 'Estas son tus solicitudes por verificar'}}</div>
        </div>
        <q-scroll-area v-if="sltCheckout.length" :style="sltCheckout.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-md q-py-sm">
            <q-card class="q-mb-md full-width" v-for="(item, index) in sltCheckout" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row">
                  <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-lg row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
                </div>
              </div>
              <div class="row">
                <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="q-px-sm q-py-md col">
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-md">
          <div class="text-h6 text-bold">Solicitudes por confirmar</div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades en espera de confirmacion' : 'Confirma que tus solicitudes han sido finalizadas'}}</div>
        </div>
        <q-scroll-area v-if="sltConfirm.length" :style="sltConfirm.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-md q-py-sm">
            <q-card class="q-mb-md full-width" v-for="(item, index) in sltConfirm" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row">
                  <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-lg row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
                </div>
              </div>
              <div class="row">
                <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="q-px-sm q-py-md col">
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-md">
          <div class="text-h6 text-bold">Historial de solicitudes</div>
          <div class="text-grey-8">listado de soliitudes finalizadas</div>
        </div>
        <q-scroll-area v-if="sltEnd.length" :style="sltEnd.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-md q-py-sm">
            <q-card class="q-mb-md full-width" v-for="(item, index) in sltEnd" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">Nº de solicitud:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row">
                  <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-lg row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
                </div>
              </div>
              <div class="row">
                <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                  <q-img :src="baseu + item.empresa._id" class="full-height"/>
                </q-avatar>
                <div class="q-px-sm q-py-md col">
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>
    </q-list>
  </div>
</template>

<script>
// import { required } from 'vuelidate/lib/validators'
import * as moment from 'moment'
import env from '../env'
export default {
  props: {
  },
  data () {
    return {
      baseu: '',
      rol: null,
      user: {},
      solicitudes: [],
      sltBegin: [],
      sltProgress: [],
      sltCheckout: [],
      sltConfirm: [],
      sltEnd: []
    }
  },
  validations: {
  },
  mounted () {
    this.baseu = env.apiUrl + 'company_img/'
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.getSltUser()
        }
      })
    },
    getSltUser () {
      this.$api.get(this.rol === 3 ? 'solicitudes_by_consultor' : 'solicitudes_cliente/' + this.user._id).then(res => {
        if (res) {
          for (const i of res) {
            for (const j of i) {
              j.prioridad.color2 = j.prioridad.color === 'Azul' ? 'blue' : j.prioridad.color === 'Rojo' ? 'red' : j.prioridad.color === 'Verde' ? 'green' : j.prioridad.color === 'Amarillo' ? 'yellow' : j.prioridad.color === 'Rosado' ? 'pink' : j.prioridad.color === 'Gris' ? 'grey' : j.prioridad.color === 'Negro' ? 'black' : j.prioridad.color === 'Celeste' ? 'blue-3' : j.prioridad.color === 'Anaranjado' ? 'orange' : j.prioridad.color === 'Morado' ? 'purple' : 'brown'
              if (!j.expiration && j.status === 0) {
                const fecha = moment(j.dateSlt + ' ' + j.timeSlt)
                const horas = moment().diff(fecha, 'minutes')
                if (horas > j.prioridad.tiempo) {
                  this.$api.put('expire_solicitud/' + j._id).then(res => {
                    if (res) {
                      j.expiration = true
                    }
                  })
                }
              }
            }
          }
          this.solicitudes = res[0]
          this.sltBegin = res[1]
          this.sltProgress = res[2]
          this.sltCheckout = res[3]
          this.sltConfirm = res[4]
          this.sltEnd = res[5]
        }
      })
    },
    verSlt (itm, idx) {
      itm.num = idx + 1
      if (this.rol === 3) { itm.sltBegin = this.sltBegin.length }
      this.$emit('ver', itm)
    }
  }
}
</script>
