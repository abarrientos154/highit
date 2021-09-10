<template>
  <q-scroll-area :visible="false" class="window-height">
    <div class="row">
      <q-separator vertical class="bg-grey-7"/>
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">HOME PRINCIPAL</div>
        <div class="text-grey-8 text-h6">Pagina de inicio del sitio</div>
      </div>
      <q-separator vertical class="bg-grey-7"/>
    </div>
    <q-separator class="bg-grey-7 q-mb-lg"/>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes sin iniciar</div>
        <div class="text-grey-8">Listado de actividades de tu departamento sin trabajar</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;" v-if="solicitudes.length">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in solicitudes" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="row q-px-lg items-center justify-between">
              <div class="row">
                <div class="q-mr-xs">Nº de solicitud:</div>
                <div class="text-bold">{{index + 1}}</div>
              </div>
              <div class="row">
                <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div :class="`text-caption text-white bg-${slas.filter(v => v._id === item.priority)[0].color2} q-px-lg row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
              </div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.empresa_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.empresa_id)[0].name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitud activa</div>
        <div class="text-grey-8">Actividad en curso</div>
      </div>
      <q-list class="q-px-md">
        <q-card class="q-mb-md full-width" v-for="(item, index) in sltBegin" :key="index" @click="verSlt(item, index)">
          <div class="row q-px-lg items-center justify-between">
            <div class="row">
              <div class="q-mr-xs">Nº de solicitud:</div>
              <div class="text-bold">{{index + 1}}</div>
            </div>
              <div class="row">
                <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div :class="`text-caption text-white bg-${slas.filter(v => v._id === item.priority)[0].color2} q-px-lg row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
              </div>
          </div>
          <div class="row">
            <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
              <q-img :src="baseu + item.empresa_id" class="full-height"/>
            </q-avatar>
            <div class="q-px-sm q-py-md col">
              <div class="row">
                <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
              </div>
              <div class="text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.empresa_id)[0].name}}</div>
              <div>
                <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                <q-scroll-area style="height: 60px;">
                  <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                </q-scroll-area>
              </div>
            </div>
          </div>
        </q-card>
      </q-list>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes en espera</div>
        <div class="text-grey-8">Listado de actividades por finalizar</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;" v-if="sltProgress.length">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltProgress" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="row q-px-lg items-center justify-between">
              <div class="row">
                <div class="q-mr-xs">Nº de solicitud:</div>
                <div class="text-bold">{{index + 1}}</div>
              </div>
              <div class="row">
                <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div :class="`text-caption text-white bg-${slas.filter(v => v._id === item.priority)[0].color2} q-px-lg row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
              </div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.empresa_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.empresa_id)[0].name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes en checkout</div>
        <div class="text-grey-8">Listado de actividades por verificar</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;" v-if="sltCheckout.length">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltCheckout" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="row q-px-lg items-center justify-between">
              <div class="row">
                <div class="q-mr-xs">Nº de solicitud:</div>
                <div class="text-bold">{{index + 1}}</div>
              </div>
              <div class="row">
                <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div :class="`text-caption text-white bg-${slas.filter(v => v._id === item.priority)[0].color2} q-px-lg row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
              </div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.empresa_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.empresa_id)[0].name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-mb-lg">
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Solicitudes por confirmar</div>
        <div class="text-grey-8">Listado de actividades en espera de confirmacion</div>
      </div>
      <q-scroll-area horizontal style="height: 210px;" v-if="sltConfirm.length">
        <div class="row no-wrap full-width">
          <q-card class="q-mx-sm" v-for="(item, index) in sltConfirm" :key="index" style="width: 425px;" @click="verSlt(item, index)">
            <div class="row q-px-lg items-center justify-between">
              <div class="row">
                <div class="q-mr-xs">Nº de solicitud:</div>
                <div class="text-bold">{{index + 1}}</div>
              </div>
              <div class="row">
                <div v-if="item.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div v-if="item.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
                <div :class="`text-caption text-white bg-${slas.filter(v => v._id === item.priority)[0].color2} q-px-lg row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{slas.filter(v => v._id === item.priority)[0].nombre}}</div>
              </div>
            </div>
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="120px">
                <q-img :src="baseu + item.empresa_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col">
                <div class="row">
                  <div class="text-bold q-mr-xs text-grey" style="font-size: 10px;">Fecha de solicitud:</div>
                  <div class="text-grey" style="font-size: 10px;">{{item.dateSlt}}</div>
                </div>
                <div class="text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.empresa_id)[0].name}}</div>
                <div>
                  <div class="text-bold text-caption text-grey">Descripcion del servicio</div>
                  <q-scroll-area style="height: 60px;">
                    <div class="text-grey" style="font-size: 10px;">{{item.description}}</div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div>
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Historial de solicitudes</div>
        <div class="text-grey-8">Conose algunas de las solicitudes realizadas</div>
      </div>
      <q-list class="row q-px-sm">
        <div class="col-xs-12 col-sm-6 col-md-6 q-mb-md q-px-sm" v-for="(item, index) in history" :key="index" @click="verSlt(item, index)">
          <q-card>
            <div class="row justify-between">
              <div class="q-pa-sm" style="font-size: 10px;">Nº de solicitud {{index + 1}}</div>
              <div :class="`bg-${slas.filter(v => v._id === item.priority)[0].color2} q-mr-md`" style="width: 30px; height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
            </div>
            <div class="column items-center" style="margin-top: -10px">
              <q-avatar class="bg-secondary" size="75px">
                <q-img :src="baseu + item.empresa_id" class="full-height"/>
              </q-avatar>
              <div class="text-center text-subtitle1 text-bold">{{empresas.filter(v => v._id === item.empresa_id)[0].name}}</div>
            </div>
            <div class="q-pa-md">
              <div>
                <div class="row">
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Estado</div>
                    <div style="font-size: 10px;">{{item.status === 0 ? 'Sin iniciar' : item.status === 1 ? 'Ejecución' : item.status === 2 ? 'En espera' : item.status === 3 ? 'Checkout' : item.status === 4 ? 'Confirmar' : item.status === 5 ? 'Finalizado' : ''}}</div>
                  </div>
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Usuario asignado</div>
                    <div style="font-size: 10px;">{{user.name + ' ' + user.last_name}}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Tipo de Contrato</div>
                    <div style="font-size: 10px;">{{contratos.filter(v => v._id === empresas.filter(v => v._id === item.empresa_id)[0].typeContract)[0].contrato}}</div>
                  </div>
                  <div class="col">
                    <div class="text-bold" style="font-size: 10px;">Departamento</div>
                    <div style="font-size: 10px;">{{departamentos.filter(v => v._id === categorias.filter(v => v._id === item.category)[0].departamento)[0].name}}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha solicitud:</div>
                  <div style="font-size: 10px;">{{item.dateBegin}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Fecha termino estimada:</div>
                  <div style="font-size: 10px;">{{item.dateEnd}}</div>
                </div>
                <div class="row">
                  <div class="text-bold q-mr-xs" style="font-size: 10px;">Tiempo estimado de termino:</div>
                  <div style="font-size: 10px;">{{item.duration}}hrs</div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </q-list>
      <div v-if="sltEnd.length > 6" class="column items-center">
        <q-btn class="text-white q-py-xs" color="primary" :label="ver ? 'Ver Menos' : 'Ver Mas'" style="width: 80%; border-radius: 5px;" @click="verMas()" no-caps/>
      </div>
    </div>

    <q-dialog v-model="slt">
      <q-card class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="row q-px-lg items-center justify-between full-width">
          <div class="row">
            <div class="q-mr-xs">Nº de solicitud:</div>
            <div class="text-bold">{{solicitud.num}}</div>
          </div>
          <div :class="`text-caption q-px-lg text-center text-white bg-${solicitud.priorityColor} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{solicitud.priority}}<br>Estado: {{solicitud.status === 0 ? 'Sin iniciar' : solicitud.status === 1 ? 'Ejecución' : solicitud.status === 2 ? 'En espera' : solicitud.status === 3 ? 'Checkout' : solicitud.status === 4 ? 'Confirmar' : solicitud.status === 5 ? 'Finalizado' : ''}}</div>
        </div>
        <div class="q-mb-lg q-mt-md">
          <div class="text-center text-h6 text-bold">{{solicitud.status === 0 && !sltBegin.length ? 'Tomar solicitud' : solicitud.status === 1 || solicitud.status === 2 || solicitud.status === 3 || solicitud.status === 4 ? 'Cambiar estado' : 'Datos solicitud'}}</div>
          <div class="text-center text-grey-8">Modifica el estado de la solicitud</div>
        </div>
        <div class="q-px-sm q-mb-md full-width">
          <div class="row">
            <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
              <q-img :src="baseu + solicitud.empresa_id" class="full-height"/>
            </q-avatar>
            <div class="q-px-sm q-py-md col column justify-between">
              <div>
                <div class="text-subtitle1 text-bold">{{slt ? empresas.filter(v => v._id === solicitud.empresa_id)[0].name : ''}}</div>
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
            <div class="row justify-center" v-if="solicitud.equipment">
              <div class="text-subtitle1 text-bold text-grey-7 q-mr-xs">Equipo:</div>
              <div class="text-subtitle1 text-grey-7">{{solicitud.equipment}}</div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Tipo de contrato</div>
                <div class="text-grey-7">{{solicitud.contrato}}</div>
              </div>
              <div class="col" v-if="solicitud.status > 0">
                <div class="text-bold text-grey-7">Usuario asignado</div>
                <div class="text-grey-7">{{user.name + ' ' + user.last_name}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">Categoria</div>
                <div class="text-grey-7">{{solicitud.category}}</div>
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
                <div class="text-grey-7">{{solicitud.timeEnd}}</div>
              </div>
            </div>
          </div>
          <div v-if="solicitud.hitos.length" class="full-width q-px-sm q-mb-md">
            <div class="q-mb-sm">
              <div class="text-subtitle1 text-bold">Historial de hitos</div>
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
          <div class="q-px-sm q-mb-md" v-if="solicitud.status > 0 && solicitud.status < 4">
            <div>
              <div class="text-caption text-grey-8">Cambia el estado de Solicitud</div>
              <q-select dense filled v-model="form.status" :options="solicitud.estados" map-options option-label="name" emit-value option-value="status" :error="$v.form.status.$error" @blur="$v.form.status.$touch()"/>
            </div>
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
          <q-btn class="text-white q-py-xs" color="primary" :label="solicitud.status === 0 && !sltBegin.length ? 'Tomar solicitud' : solicitud.status > 0 && solicitud.status < 4 ? 'Cambiar estado' : 'Cerrar'" style="width: 70%; border-radius: 5px;" @click="solicitud.status === 0 && !sltBegin.length ? statusRequest(1) : solicitud.status > 0 && solicitud.status < 4 ? saveHito() : slt = !slt" no-caps/>
        </div>
      </q-card>
    </q-dialog>
  </q-scroll-area>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import * as moment from 'moment'
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      user: {},
      form: {},
      empresas: [],
      solicitud: { hitos: [] },
      slas: [],
      categorias: [],
      departamentos: [],
      contratos: [],
      hitos: [],
      equipos: [],
      solicitudes: [],
      sltBegin: [],
      sltProgress: [],
      sltCheckout: [],
      sltConfirm: [],
      history: [],
      sltEnd: [],
      estados: [{ name: 'Iniciada', status: 1 }, { name: 'En espera', status: 2 }, { name: 'Checkout', status: 3 }, { name: 'Finalizado', status: 4 }],
      slt: false,
      estado: false,
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
    this.baseu = env.apiUrl + 'company_img/'
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getEmpresas()
        }
      })
    },
    getEmpresas () {
      this.$api.get('companys_by_company/' + this.user.company).then(res => {
        if (res) {
          this.empresas = res
          this.getSlAs()
          this.getCategorias()
          this.getDepartamentos()
          this.getContratos()
          this.getHitos()
          this.getEquipos()
        }
      })
    },
    getSlAs () {
      this.$api.get('sla_by_company/' + this.user.company).then(res => {
        if (res) {
          this.slas = res
        }
      })
    },
    getCategorias () {
      this.$api.get(`categorias/${this.user.company}`).then(res => {
        if (res) {
          this.categorias = res
        }
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
    getEquipos () {
      this.$api.get('equipo').then(res => {
        if (res) {
          this.equipos = res
          this.getSlt()
        }
      })
    },
    getSlt () {
      for (var i = 0; i < 6; i++) {
        this.$api.post('solicitudes_by_consultor', i === 0 ? { status: i } : i === 1 ? { status: i } : i === 2 ? { status: i } : i === 3 ? { status: i } : i === 4 ? { status: i } : i === 5 ? { status: i } : {}).then(res => {
          if (res) {
            if (res.length && res[0].status === 0) {
              for (const j of res) {
                if (!j.expiration) {
                  const fecha = moment(j.dateSlt + ' ' + j.timeSlt)
                  const horas = moment().diff(fecha, 'hours')
                  if (horas > this.slas.filter(v => v._id === j.priority)[0].tiempo) {
                    this.$api.put('expire_solicitud/' + j._id).then(res => {
                      if (res) {
                        j.expiration = true
                      }
                    })
                  }
                }
              }
              this.solicitudes = res
            } else if (res.length && res[0].status === 1) {
              this.sltBegin = res
            } else if (res.length && res[0].status === 2) {
              this.sltProgress = res
            } else if (res.length && res[0].status === 3) {
              this.sltCheckout = res
            } else if (res.length && res[0].status === 4) {
              this.sltConfirm = res
            } else if (res.length && res[0].status === 5) {
              this.sltEnd = res
              this.history = this.sltEnd.slice(0, 6)
            }
          }
        })
      }
    },
    verSlt (itm, idx) {
      this.slt = !this.slt
      this.solicitud = { ...itm }
      this.solicitud.empresa = this.empresas.filter(v => v._id === itm.empresa_id)[0].name
      this.solicitud.priority = this.slas.filter(v => v._id === itm.priority)[0].nombre
      this.solicitud.priorityColor = this.slas.filter(v => v._id === itm.priority)[0].color2
      this.solicitud.time2 = this.slas.filter(v => v._id === itm.priority)[0].tiempo
      this.solicitud.category = this.categorias.filter(v => v._id === itm.category)[0].nombre
      this.solicitud.department = this.departamentos.filter(v => v._id === this.categorias.filter(v => v._id === itm.category)[0].departamento)[0].name
      this.solicitud.contrato = this.contratos.filter(v => v._id === this.empresas.filter(v => v._id === itm.empresa_id)[0].typeContract)[0].contrato
      this.solicitud.hitos = this.hitos.filter(v => v.solicitud_id === itm._id)
      this.solicitud.estados = this.estados.filter(v => v.status !== itm.status)
      if (this.solicitud.equipment) {
        this.solicitud.equipment = this.equipos.filter(v => v._id === this.solicitud.equipment)[0].name
      }
      this.solicitud.num = idx + 1
      this.form = {}
      this.$v.form.$reset()
    },
    saveHito () {
      this.$v.form.$touch()
      if (this.form.status === 1) {
        if (!this.sltBegin.length) {
          this.estado = true
        } else {
          this.estado = false
        }
      } else {
        this.estado = true
      }
      if (!this.$v.form.$error && this.estado) {
        const hoy = new Date()
        this.form.date = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear()
        this.form.time = hoy.getHours() + ':' + hoy.getMinutes()
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
      const hoy = new Date()
      var status = { status: idx, consultor_id: this.user._id }
      if (this.solicitud.status === 0) {
        status.dateBegin = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear()
        status.timeBegin = hoy.getHours() + ':' + hoy.getMinutes()
      }
      this.$api.put('status_solicitud/' + this.solicitud._id, status).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Solicitud aceptada',
            color: 'positive'
          })
          this.solicitud = { hitos: [] }
          this.solicitudes = []
          this.sltBegin = []
          this.sltProgress = []
          this.sltCheckout = []
          this.sltConfirm = []
          this.sltEnd = []
          this.history = []
          this.slt = false
          this.getEmpresas()
        }
      })
    },
    verMas () {
      this.ver = !this.ver
      if (this.ver) {
        this.solicitudes = this.sltAll
      } else {
        this.solicitudes = this.sltAll.slice(0, 2)
      }
    }
  }
}
</script>
