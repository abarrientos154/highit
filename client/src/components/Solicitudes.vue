<template>
  <div class="full-width">
    <q-list class="row justify-center">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-sm q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{$t('titulo_sltSinComenzar')}}</div>
            <q-btn v-if="solicitudes.length > 2" dense flat round icon="pending" @click="gestionar(solicitudes)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_actividadesSinTrabajar') : $t('subtitulo_sltNoTomadas')}}</div>
        </div>
        <q-scroll-area v-if="solicitudes.length" :style="solicitudes.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in solicitudes" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{rol === 3 ? $t('subtitulo_sltActiva') : $t('subtitulo_sltPendientes')}}</div>
            <q-btn v-if="rol !== 3 && sltBegin.length > 2" dense flat round icon="pending" @click="gestionar(sltBegin)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? this.$t('subtitulo_activiCursi') : $t('subtitulo_sltNoResueltas')}}</div>
        </div>
        <q-scroll-area v-if="sltBegin.length" :style="sltBegin.length === 1 && rol !== 3 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card :class="`${rol !== 3 ? 'q-mb-md' : ''} full-width cursor-pointer`" v-for="(item, index) in sltBegin" :key="index" @click="verSlt(item, index)" :style="rol === 3 ? 'height: 370px;' : ''">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                  <div class="ellipsis-3-lines q-mb-sm"><b>{{$t('text_servicioDescription')}}:</b> {{item.description}}</div>
                  <div class="row">
                    <div class="col">
                      <div class="text-bold">{{$t('form_fechaSlt')}}:</div>
                      <div>{{item.dateSlt}}</div>
                    </div>
                    <div class="col">
                      <div class="text-bold">{{$t('form_HoraSlt')}}:</div>
                      <div>{{item.timeSlt}}hr</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="text-bold">{{$t('form_fechaInicio')}}</div>
                      <div>{{item.dateBegin}}</div>
                    </div>
                    <div class="col">
                      <div class="text-bold">{{$t('form_HoraInicio')}}</div>
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
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div v-if="sltReopen.length" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-sm q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{$t('subtitulo_sltReabiertas')}}</div>
            <q-btn v-if="sltReopen.length > 2" dense flat round icon="pending" @click="gestionar(sltReopen)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listActiviReabiertas') : $t('subtitulo_sltReabiertasPorTi')}}</div>
        </div>
        <q-scroll-area :style="sltReopen.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltReopen" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{$t('subtitulo_sltPausadas')}}</div>
            <q-btn v-if="sltProgress.length > 2" dense flat round icon="pending" @click="gestionar(sltProgress)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listActiviPorFin') : $t('subtitulo_tusSltNoFin')}}</div>
        </div>
        <q-scroll-area v-if="sltProgress.length" :style="sltProgress.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltProgress" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{$t('subtitulo_sltCheck')}}</div>
            <q-btn v-if="sltCheckout.length > 2" dense flat round icon="pending" @click="gestionar(sltCheckout)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listActiviPorVerify') : $t('subtitulo_tusSltPorVerify')}}</div>
        </div>
        <q-scroll-area v-if="sltCheckout.length" :style="sltCheckout.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltCheckout" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                    <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                    <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                  </div>
                  <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                    <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-list>
        </q-scroll-area>
      </div>

      <div :class="`${sltReopen.length ? 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6' : 'full-width'} q-pb-md`">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{$t('subtitulo_sltPorConfirmar')}}</div>
            <q-btn v-if="sltReopen.length ? sltConfirm.length > 2 : sltConfirm.length > 4" dense flat round icon="pending" @click="gestionar(sltConfirm)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listEsperaConfirm') : $t('subtitulo_confirmaSltFinalizadas')}}</div>
        </div>
        <q-scroll-area v-if="sltConfirm.length" :style="!sltReopen.length ? sltConfirm.length < 3 ? 'height: 210px;' : 'height: 405px;' : sltConfirm.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list :class="`${!sltReopen.length ? 'row' : 'q-px-lg'} q-pt-md`">
            <div :class="`${sltReopen.length ? 'full-width' : 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-lg'} q-mb-md`" v-for="(item, index) in sltConfirm" :key="index">
              <q-card class="full-width cursor-pointer" @click="verSlt(item, index)">
                <div class="row q-px-lg items-center justify-between">
                  <div class="row text-caption">
                    <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                      <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                      <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                    </div>
                    <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                    <div>
                      <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                      <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </q-list>
        </q-scroll-area>
      </div>
    </q-list>

    <q-dialog v-model="gtn" full-width>
      <q-card class="column items-center no-wrap" style="border-radius: 10px;">
        <div class="row items-center full-width">
          <div class="q-py-lg q-pl-lg col">
            <div class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_selecDepart')}}</div>
              <q-select dense filled v-model="depart" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="filtrarSlts(1)"/>
            </div>
            <div class="q-mb-md">
              <div class="text-bold text-subtitle1">{{$t('form_tipoGestion')}}</div>
              <div class="row justify-between">
                <q-radio v-model="type" :val="1" :label="$t('option_diaria')" @input="selecType()"/>
                <q-radio v-model="type" :val="2" :label="$t('option_semanal')" @input="selecType()"/>
                <q-radio v-model="type" :val="3" :label="$t('option_mensual')" @input="selecType()"/>
                <q-radio v-model="type" :val="4" :label="$t('option_anual')" @input="selecType()"/>
              </div>
            </div>
            <div v-if="type === 1" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_ingresaFecha')}}</div>
              <q-input dense filled readonly v-model="fecha" :placeholder="$t('formFormat_fecha')" @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" mask="YYYY-MM-DD" @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div v-if="type === 2" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">{{$t('form_ragoSelec')}}</div>
              <q-input  dense filled readonly v-model="semana" :placeholder="$t('formFormat_fecha') + '...' + $t('formFormat_fecha')" @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" mask="YYYY-MM-DD" range @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div v-if="type === 3 || type === 4" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">{{type === 4 ? $t('option_selecA') : $t('option_selecMes')}}</div>
              <q-input dense filled readonly v-model="fecha" :placeholder="type == 4 ? St('formFormat_year') : $t('formFormat_mes')" :mask="type == 4 ? '####' : '##'"  @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" :mask="type == 4 ? 'YYYY' : 'MM'" minimal emit-immediately :default-view="type == 4 ? 'Years' : 'Months'" @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col">
            <q-scroll-area style="height:275px;">
              <q-list class="q-px-lg full-height column justify-center">
                <div v-if="!slts.length" class="text-center text-grey text-italic text-blod text-h6">{{$t('formNotif_noResultados')}}</div>
                <q-card class="q-mb-md full-width" v-for="(item, index) in slts" :key="index" @click="verSlt(item, index)">
                  <div class="row q-px-lg items-center justify-between">
                    <div class="row text-caption">
                      <div class="q-mr-xs">{{$t('text_numSlt')}}:</div>
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
                        <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">{{$t('form_fechaSlt')}}:</div>
                        <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                      </div>
                      <div class="text-subtitle1 text-bold">{{item.empresa.name}}</div>
                      <div>
                        <div class="text-bold text-caption text-grey">{{$t('text_servicioDescription')}}</div>
                        <div class="text-grey ellipsis-3-lines" style="font-size: 10px;">{{item.description}}</div>
                      </div>
                    </div>
                  </div>
                </q-card>
              </q-list>
            </q-scroll-area>
          </div>
        </div>
      </q-card>
    </q-dialog>
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
      sltEnd: [],
      sltReopen: [],
      type: 0,
      slts: [],
      slts2: [],
      slts3: [],
      gtn: false,
      val: false,
      fecha: null,
      semana: '',
      categorias: [],
      departamentos: [],
      depart: null
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
          this.getCategorias()
          this.getDepartamentos()
        }
      })
    },
    getSltUser () {
      this.$api.get(this.rol === 3 ? 'solicitudes_by_consultor' : 'solicitudes_cliente/' + this.user._id).then(res => {
        if (res) {
          this.solicitudes = res[0]
          this.sltBegin = res[1]
          this.sltProgress = res[2]
          this.sltCheckout = res[3]
          this.sltConfirm = res[4]
          this.sltEnd = res[5]
          this.sltReopen = res[6]
          this.gtn = false
        }
      })
    },
    verSlt (itm, idx) {
      itm.num = idx + 1
      if (this.rol === 3) { itm.sltBegin = this.sltBegin.length }
      this.$emit('ver', itm)
    },
    getCategorias () {
      this.$api.get('categorias/' + this.user.company).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.company).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    gestionar (slts) {
      this.type = 1
      this.depart = null
      this.fecha = null
      this.semana = ''
      this.val = false
      this.slts = [...slts]
      this.slts2 = [...this.slts]
      this.slts3 = [...this.slts]
      this.gtn = !this.gtn
    },
    selecType () {
      this.semana = ''
      this.fecha = null
    },
    validarFecha () {
      this.$refs.qDateProxy.hide()
      if (this.type === 2) {
        this.semana = this.fecha.from + ' ... ' + this.fecha.to
        const dias = moment(this.fecha.to).diff(this.fecha.from, 'days') + 1
        if (dias <= 7) { this.val = true } else { this.val = false }
      } else { this.val = true }
      if (!this.val) {
        this.$q.notify({
          message: this.$t('formNotif_superadoRango'),
          color: 'negative'
        })
        this.semana = ''
        this.fecha = null
      } else { this.filtrarSlts(2) }
    },
    filtrarSlts (idx) {
      const actividades = []
      if (idx === 1 && this.depart) {
        for (const i of this.slts2) {
          for (const j of this.categorias.filter(v => v.departamento === this.depart)) {
            if (i.category === j._id) {
              actividades.push(i)
            }
          }
        }
        this.slts = actividades
        this.slts3 = [...this.slts]
        if (this.fecha) { this.validarFecha() }
      } else if (idx === 2 && this.fecha) {
        for (const i of this.slts3) {
          if (this.type === 2) {
            if (moment(i.dateSlt).isBetween(this.fecha.from, this.fecha.to) || moment(i.dateSlt).isSame(this.fecha.from) || moment(i.dateSlt).isSame(this.fecha.to)) {
              actividades.push(i)
            } else { actividades.splice(1, i) }
          } else {
            if (moment(moment(i.dateSlt).format(this.type === 1 ? 'YYYY-MM-DD' : this.type === 3 ? 'MM' : 'YYYY')).isSame(this.fecha)) {
              actividades.push(i)
            } else { actividades.splice(1, i) }
          }
        }
        this.slts = actividades
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bordes {
  border-bottom: 2px solid $grey-6;
}
</style>
