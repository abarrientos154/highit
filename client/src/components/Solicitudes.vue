<template>
  <div class="full-width">
    <q-list class="row">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-sm q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">Solicitudes sin comenzar</div>
            <q-btn v-if="solicitudes.length > 2" dense flat round icon="pending" @click="gestionar(solicitudes)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades de tu departamento sin trabajar' : 'Estas son tus solicitudes aun no tomadas'}}</div>
        </div>
        <q-scroll-area v-if="solicitudes.length" :style="solicitudes.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
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

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">{{rol === 3 ? 'Solicitud activa' : 'Solicitudes pendientes'}}</div>
            <q-btn v-if="rol !== 3 && sltBegin.length > 2" dense flat round icon="pending" @click="gestionar(sltBegin)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? 'Actividad en curso' : 'Estas son tus solicitudes que no están resueltas'}}</div>
        </div>
        <q-scroll-area v-if="sltBegin.length" :style="sltBegin.length === 1 && rol !== 3 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
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

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">Solicitudes en espera</div>
            <q-btn v-if="sltProgress.length > 2" dense flat round icon="pending" @click="gestionar(sltProgress)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades por finalizar' : 'Estas son tus solicitudes que no han sido finalizadas'}}</div>
        </div>
        <q-scroll-area v-if="sltProgress.length" :style="sltProgress.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
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

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pb-md q-mb-md">
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">Solicitudes en checkout</div>
            <q-btn v-if="sltCheckout.length > 2" dense flat round icon="pending" @click="gestionar(sltCheckout)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades por verificar' : 'Estas son tus solicitudes por verificar'}}</div>
        </div>
        <q-scroll-area v-if="sltCheckout.length" :style="sltCheckout.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
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
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">Solicitudes por confirmar</div>
            <q-btn v-if="sltConfirm.length > 2" dense flat round icon="pending" @click="gestionar(sltConfirm)"/>
          </div>
          <div class="text-grey-8">{{rol === 3 ? 'Listado de actividades en espera de confirmacion' : 'Confirma que tus solicitudes han sido finalizadas'}}</div>
        </div>
        <q-scroll-area v-if="sltConfirm.length" :style="sltConfirm.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
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
        <div class="q-px-lg q-mb-sm">
          <div class="row items-center justify-between">
            <div class="text-h6 text-bold">Historial de solicitudes</div>
            <q-btn v-if="sltEnd.length > 2" dense flat round icon="pending" @click="gestionar(sltEnd)"/>
          </div>
          <div class="text-grey-8">listado de soliitudes finalizadas</div>
        </div>
        <q-scroll-area v-if="sltEnd.length" :style="sltEnd.length === 1 ? 'height: 210px;' : 'height: 405px;'">
          <q-list class="q-px-lg q-pt-md">
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

    <q-dialog v-model="gtn" full-width>
      <q-card class="column items-center no-wrap" style="border-radius: 10px;">
        <div class="row items-center full-width">
          <div class="q-py-lg q-pl-lg col">
            <div class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un departamento</div>
              <q-select dense filled v-model="depart" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="filtrarSlts(1)"/>
            </div>
            <div class="q-mb-md">
              <div class="text-bold text-subtitle1">Tipo de gestion</div>
              <div class="row justify-between">
                <q-radio v-model="type" :val="1" label="Diaria" @input="selecType()"/>
                <q-radio v-model="type" :val="2" label="Semanal" @input="selecType()"/>
                <q-radio v-model="type" :val="3" label="Mensual" @input="selecType()"/>
                <q-radio v-model="type" :val="4" label="Anual" @input="selecType()"/>
              </div>
            </div>
            <div v-if="type === 1" class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Ingresar fecha</div>
              <q-input dense filled readonly v-model="fecha" placeholder="AAAA-MM-DD" @click="$refs.qDateProxy.show()">
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
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un rango de 7 dias o menos</div>
              <q-input  dense filled readonly v-model="semana" placeholder="AAAA-MM-DD ... AAAA-MM-DD" @click="$refs.qDateProxy.show()">
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
              <div class="text-bold text-subtitle1 q-mb-sm">{{type === 4 ? 'Seleccione un año' : 'Seleccione un mes'}}</div>
              <q-input dense filled readonly v-model="fecha" :placeholder="type == 4 ? 'AAAA' : 'MM'" :mask="type == 4 ? '####' : '##'"  @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" :mask="type == 4 ? 'YYYY' : 'MM'" minimal emit-immediately :default-view="type == 4 ? 'Years' : 'Months'" @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <!-- <div class="column items-center">
              <q-btn class="text-white full-width q-py-xs" color="primary" label="Filtrar solicitudes" style="border-radius: 5px;" @click="filtrarSlts()" no-caps/>
            </div> -->
          </div>
          <div class="col">
            <q-scroll-area style="height:275px;">
              <q-list class="q-px-lg full-height column justify-center">
                <div v-if="!slts.length" class="text-center text-grey text-italic text-blod text-h6">No hay resultados</div>
                <q-card class="q-mb-md full-width" v-for="(item, index) in slts" :key="index" @click="verSlt(item, index)">
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
      if (this.type === 1) {
        this.val = moment(moment().format('YYYY-MM-DD')).isSameOrAfter(this.fecha)
      } else if (this.type === 2) {
        this.semana = this.fecha.from + ' ... ' + this.fecha.to
        const dias = moment(this.fecha.to).diff(this.fecha.from, 'days') + 1
        if (dias <= 7) {
          this.val = moment(moment().format('YYYY-MM-DD')).isSameOrAfter(this.fecha.to)
        } else { this.val = false }
      } else if (this.type === 3 || this.type === 4) {
        this.val = moment(moment().format(this.type === 3 ? 'MM' : 'YYYY')).isSameOrAfter(this.fecha)
      }
      if (!this.val) {
        this.$q.notify({
          message: 'Debe ingresar una fecha valida',
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
