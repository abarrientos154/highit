<template>
  <div class="full-width">
    <q-list class="row justify-center" v-if="solicitudes.length">
      <div v-for="(item, index) in solicitudes" :key="index" :class="`${solicitudes.length % 2 !== 0 && solicitudes.length - 1 === index ? 'full-width' : 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'} q-pb-md`">
        <div class="q-px-lg q-mb-sm">
          <div class="text-h6 text-bold">{{index === 0 ? $t('titulo_sltSinComenzar') : index === 1 ? rol === 3 ? $t('subtitulo_sltActiva') : $t('subtitulo_sltPendientes') : index === 2 ? $t('subtitulo_sltPausadas') : index === 3 ? $t('subtitulo_sltCheck') : index === 4 ? $t('subtitulo_sltPorConfirmar') : item[0] && item[0].status === 6 ? $t('subtitulo_sltReabiertas') : item[0] && item[0].status === 7 ? item[0].consultor_id === user._id ? $t('subtitulo_sltConfirReasignar') : $t('subtitulo_sltReasignar') : item[0] && item[0].status === 8 ? $t('subtitulo_sltRechazReasignar') : ''}}</div>
          <div class="text-grey-8">{{index === 0 ? rol === 3 ? $t('subtitulo_actividadesSinTrabajar') : $t('subtitulo_sltNoTomadas') : index === 1 ? rol === 3 ? $t('subtitulo_activiCursi') : $t('subtitulo_sltNoResueltas') : index === 2 ? rol === 3 ? $t('subtitulo_listActiviPorFin') : $t('subtitulo_tusSltNoFin') : index === 3 ? rol === 3 ? $t('subtitulo_listActiviPorVerify') : $t('subtitulo_tusSltPorVerify') : index === 4 ? rol === 3 ? $t('subtitulo_listEsperaConfirm') : $t('subtitulo_confirmaSltFinalizadas') : item[0] && item[0].status === 6 ? rol === 3 ? $t('subtitulo_listActiviReabiertas') : $t('subtitulo_sltReabiertasPorTi') : item[0] && item[0].status === 7 ? item[0].consultor_id === user._id ? $t('subtitulo_sltListConfirReasignar') : $t('subtitulo_sltListReasignar') : item[0] && item[0].status === 8 ? $t('subtitulo_sltListRechazReasignar') : ''}}</div>
        </div>

        <q-scroll-area v-if="item.length" :style="solicitudes.length % 2 !== 0 && solicitudes.length - 1 === index ? item.length < 3 ? 'height: 210px;' : 'height: 405px;' : item.length === 1 ? index === 1 && rol === 3 ? 'height: 405px;' : 'height: 210px;' : 'height: 405px;'">
          <q-list :class="`${solicitudes.length % 2 !== 0 && solicitudes.length - 1 === index ? 'row' :  solicitudes.length - 1 === index ? 'q-px-lg' : ''} q-pt-md`">
            <div :class="`${solicitudes.length % 2 === 0 && solicitudes.length - 1 === index ? 'full-width' : 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-lg'} q-mb-md`" v-for="(item2, index2) in item" :key="index2">
              <q-card :class="`${rol !== 3 && index === 1 ? 'q-mb-md' : ''} full-width cursor-pointer`" @click="verSlt(item2, index2)" :style="rol === 3 && index === 1 ? 'height: 370px;' : ''">
                <div class="row q-px-lg items-center justify-between no-wrap">
                  <div class="row text-caption">
                    <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                    <div class="text-bold">{{index + 1}}</div>
                  </div>

                  <div class="row q-gutter-sm no-wrap">
                    <q-btn dense no-caps v-if="rol === 3 && ((item2.status > 1 && item2.status < 4) || item2.status === 6 || item2.status === 8)" size="12px" style="height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;" color="primary" :label="$t('accion_reasignar')" @click="reasign = true"/>
                    <div v-if="item2.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                    <div v-if="item2.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                    <div :class="`text-caption text-white bg-${item2.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item2.prioridad.nombre}}</div>
                  </div>
                </div>

                <div v-if="rol === 3 && index === 1" class="column items-center q-px-md q-pb-md">
                  <q-avatar class="bg-secondary" size="125px">
                    <q-img :src="baseu + item2.empresa._id" class="full-height"/>
                  </q-avatar>

                  <div class="text-h6 text-bold">{{item2.empresa.name}}</div>

                  <div class="text-caption text-grey-7">
                    <div class="ellipsis-3-lines q-mb-sm"><b>{{$t('text_servicioDescription')}}:</b> {{item2.description}}</div>

                    <div class="row">
                      <div class="col">
                        <div class="text-bold">{{$t('form_fechaSlt')}}:</div>
                        <div>{{item2.dateSlt}}</div>
                      </div>

                      <div class="col">
                        <div class="text-bold">{{$t('form_HoraSlt')}}:</div>
                        <div>{{item2.timeSlt}}hr</div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="text-bold">{{$t('form_fechaInicio')}}</div>
                        <div>{{item2.dateBegin}}</div>
                      </div>

                      <div class="col">
                        <div class="text-bold">{{$t('form_HoraInicio')}}</div>
                        <div>{{item2.timeBegin}}hr</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="row">
                  <q-avatar class="bg-secondary q-ml-md q-my-md" size="110px">
                    <q-img :src="baseu + item2.empresa._id" class="full-height"/>
                  </q-avatar>

                  <div class="q-px-sm q-py-md col">
                    <div class="row">
                      <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                      <div class="text-grey" style="font-size: 10px;">{{item2.dateSlt}}</div>
                    </div>

                    <div class="text-subtitle1 text-bold">{{item2.empresa.name}}</div>

                    <div>
                      <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                      <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item2.description}}</div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </q-list>
        </q-scroll-area>
      </div>
    </q-list>
  </div>
</template>

<script>
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
      reasign: false,
      categorias: [],
      departamentos: []
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
          this.rol = res.roles[0]
          this.user = res
          this.getSltUser()
        }
      })
    },
    getSltUser () {
      this.$api.get(this.rol === 3 ? 'solicitudes_by_consultor' : 'solicitudes_cliente/' + this.user._id).then(res => {
        if (res) {
          console.log(res)
          res.splice(5, 1)
          if (!res[5].length) {
            res.splice(5, 1)
          }
          if (this.rol === 3) {
            if (!res[res.length - 3].length) {
              res.splice(res.length - 3, 1)
            }
            if (!res[res.length - 2].length) {
              res.splice(res.length - 2, 1)
            }
            if (!res[res.length - 1].length) {
              res.splice(res.length - 1, 1)
            }
          }
          this.solicitudes = res
        }
      })
    },
    verSlt (itm, idx) {
      itm.num = idx + 1
      if (this.rol === 3) {
        itm.sltBegin = this.solicitudes[1].length
      }
      this.$emit(this.reasign ? 'reasignar' : 'ver', itm)
      this.reasign = false
    }
  }
}
</script>

<style lang="scss" scoped>
.bordes {
  border-bottom: 2px solid $grey-6;
}
</style>
