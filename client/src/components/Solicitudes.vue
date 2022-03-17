<template>
  <div class="full-width">
    <q-list class="row justify-center">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-sm q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="text-h6 text-bold">{{$t('titulo_sltSinComenzar')}}</div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_actividadesSinTrabajar') : $t('subtitulo_sltNoTomadas')}}</div>
        </div>
        <q-scroll-area v-if="solicitudes.length" :style="solicitudes.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in solicitudes" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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
          <div class="text-h6 text-bold">{{rol === 3 ? $t('subtitulo_sltActiva') : $t('subtitulo_sltPendientes')}}</div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_activiCursi') : $t('subtitulo_sltNoResueltas')}}</div>
        </div>
        <q-scroll-area v-if="sltBegin.length" :style="sltBegin.length === 1 && rol !== 3 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card :class="`${rol !== 3 ? 'q-mb-md' : ''} full-width cursor-pointer`" v-for="(item, index) in sltBegin" :key="index" @click="verSlt(item, index)" :style="rol === 3 ? 'height: 370px;' : ''">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <!-- <q-btn dense no-caps size="12px" style="height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;" v-if="rol === 3" color="primary" :label="$t('Reasignar')" @click="reasign = true"/> -->
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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
          <div class="text-h6 text-bold">{{$t('subtitulo_sltReabiertas')}}</div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listActiviReabiertas') : $t('subtitulo_sltReabiertasPorTi')}}</div>
        </div>
        <q-scroll-area :style="sltReopen.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltReopen" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <q-btn dense no-caps size="12px" style="height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;" v-if="rol === 3" color="primary" :label="$t('Reasignar')" @click="reasign = true"/>
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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
          <div class="text-h6 text-bold">{{$t('subtitulo_sltPausadas')}}</div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listActiviPorFin') : $t('subtitulo_tusSltNoFin')}}</div>
        </div>
        <q-scroll-area v-if="sltProgress.length" :style="sltProgress.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltProgress" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <q-btn dense no-caps size="12px" style="height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;" v-if="rol === 3" color="primary" :label="$t('Reasignar')" @click="reasign = true"/>
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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
          <div class="text-h6 text-bold">{{$t('subtitulo_sltCheck')}}</div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listActiviPorVerify') : $t('subtitulo_tusSltPorVerify')}}</div>
        </div>
        <q-scroll-area v-if="sltCheckout.length" :style="sltCheckout.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltCheckout" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <q-btn dense no-caps size="12px" style="height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;" v-if="rol === 3" color="primary" :label="$t('Reasignar')" @click="reasign = true"/>
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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

      <div :class="`${sltReopen.length || sltReasign.length || sltCReasign.length ? 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6' : 'full-width'} q-pb-md`">
        <div class="q-px-lg q-mb-sm">
          <div class="text-h6 text-bold">{{$t('subtitulo_sltPorConfirmar')}}</div>
          <div class="text-grey-8">{{rol === 3 ? $t('subtitulo_listEsperaConfirm') : $t('subtitulo_confirmaSltFinalizadas')}}</div>
        </div>
        <q-scroll-area v-if="sltConfirm.length" :style="!sltReopen.length ? sltConfirm.length < 3 ? 'height: 210px;' : 'height: 405px;' : sltConfirm.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list :class="`${!sltReopen.length ? 'row' : 'q-px-lg'} q-pt-md`">
            <div :class="`${sltReopen.length ? 'full-width' : 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-lg'} q-mb-md`" v-for="(item, index) in sltConfirm" :key="index">
              <q-card class="full-width cursor-pointer" @click="verSlt(item, index)">
                <div class="row q-px-lg items-center justify-between no-wrap">
                  <div class="row text-caption">
                    <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                    <div class="text-bold">{{index + 1}}</div>
                  </div>
                  <div class="row q-gutter-sm no-wrap">
                    <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                    <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                    <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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

      <div v-if="rol === 3 && sltReasign.length" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="text-h6 text-bold">{{$t('Solicitudes en proceso de reasignación')}}</div>
          <div class="text-grey-8">{{$t('Listado de actividades en espera de reasignación')}}</div>
        </div>
        <q-scroll-area :style="sltReasign.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltReasign" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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

      <div v-if="rol === 3 && sltCReasign.length" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="text-h6 text-bold">{{$t('Solicitudes por confirmar reasignación')}}</div>
          <div class="text-grey-8">{{$t('Listado de actividades sin confirmacion de reasignación')}}</div>
        </div>
        <q-scroll-area :style="sltCReasign.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
            <q-card class="q-mb-md full-width cursor-pointer" v-for="(item, index) in sltCReasign" :key="index" @click="verSlt(item, index)">
              <div class="row q-px-lg items-center justify-between no-wrap">
                <div class="row text-caption">
                  <div class="q-mr-xs">{{rol !== 3 ? $t('text_numSlt') : 'Nº'}}:</div>
                  <div class="text-bold">{{index + 1}}</div>
                </div>
                <div class="row q-gutter-sm no-wrap">
                  <div v-if="item.expiration" class="bg-primary" style="width: 20px; height: 25px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div v-if="item.equipment" class="bg-info" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                  <div :class="`text-caption text-white bg-${item.prioridad.color2} q-px-md row items-center`" style="height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{item.prioridad.nombre}}</div>
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
      sltBegin: [],
      sltProgress: [],
      sltCheckout: [],
      sltConfirm: [],
      sltEnd: [],
      sltReopen: [],
      sltReasign: [],
      sltCReasign: [],
      type: 0,
      slts: [],
      slts2: [],
      slts3: [],
      gtn: false,
      val: false,
      reasign: false,
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
          if (this.rol === 3) {
            this.sltReasign = res[7]
            this.sltCReasign = res[8]
          }
          this.gtn = false
        }
      })
    },
    verSlt (itm, idx) {
      itm.num = idx + 1
      if (this.rol === 3) {
        itm.sltBegin = this.sltBegin.length
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
