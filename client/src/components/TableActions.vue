<template>
  <div>
    <div class="q-pa-md">
      <div class="q-pb-md">
        <div class="text-h4 text-bold">{{titulo}}</div>
        <div class="text-grey text-h6">{{subtitulo}}</div>
        <q-select v-if="selectBtn" class="q-mt-md" filled v-model="select" use-input behavior="menu" input-debounce="0" :label="$t('form_selecListado')" :options="options" map-options :option-label="route === 'sla' ? 'contrato' : route === 'solicitudes' ? 'nombre' : 'name'" emit-value option-value="_id" @input="select ? flt = true : flt = false" @filter="filterFn">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{$t('formNotif_noResultados')}}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div class="row q-mt-md">
          <q-input class="col" v-if="inputBtn" filled readonly v-model="select.from" :label="$t('form_fechaInicio')" :placeholder="$t('formFormat_fecha')" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="select.from" mask="YYYY-MM-DD" @input="select.from && select.to ? flt = true : flt = false"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-space class="q-px-sm"/>
          <q-input class="col" v-if="inputBtn" filled readonly v-model="select.to" :label="$t('form_fechaFin')" :placeholder="$t('formFormat_fecha')" @click="$refs.qDateProxy2.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                  <q-date v-model="select.to" mask="YYYY-MM-DD" @input="select.from && select.to ? flt = true : flt = false"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <q-grid :data="filterData" :columns="columns" :columns_filter="true">
        <template v-slot:body="props">
          <q-tr :props="props">
            <template v-for="item in columns">
              <q-td v-if="flt" :key="item.name">
                <div v-if="item.name === 'Action'" class="row justify-center no-wrap">
                  <q-btn v-if="verBtn" icon="visibility" size="sm" class="q-mx-sm" flat dense @click="verItem(props.row)"/>
                  <q-btn v-if="editarBtn" icon="edit" size="sm" class="q-mx-sm" flat dense @click="editar(props.row._id)" />
                  <q-btn v-if="eliminarBtn" icon="delete" size="sm" class="q-mx-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
                  <NewSlt v-if="crearBtn" :equipment="props.row._id"/>
                  <q-btn v-if="asignarBtn" class="q-mx-sm" style="width:130px" color="primary" text-color="white" :label="$T('accion_asignarEquipo')" @click="mostrardialogo(props.row._id)" no-caps/>
                  <q-toggle v-if="habilitarBtn" v-model="props.row.enable" @input="enable(props.row)" color="positive" checked-icon="lock_open" unchecked-icon="lock"/>
                </div>

                <div v-else-if="item.name === 'Profile'" class="row justify-center">
                  <q-avatar>
                    <q-img :src="baseu + `${route === 'companys' ? 'company_img/' : 'perfil_img/'}` + props.row._id" class="full-height"/>
                  </q-avatar>
                </div>

                <div v-else-if="item.name === 'totalContrato' || item.name === 'costo'">
                  <money readonly class="q-field__input text-right" v-model="props.row[item.name]" :suffix="` ${props.row.moneda}`"/>
                </div>

                <div v-else :class="item.text ? `row justify-${item.text} items-center` : 'ellipsis'" style="max-width: 300px">
                  <q-avatar v-if="props.row.color2 && item.name === 'nombre'" class="q-mr-sm" :color="props.row.color2" size="30px"/>{{ props.row.Cliente && item.name === 'name' ? props.row[item.name] + ' - ' + props.row.Cliente : props.row[item.name] }}
                </div>
              </q-td>
            </template>
          </q-tr>
        </template>
      </q-grid>

      <div v-if="(selectBtn || inputBtn) && !select && data.length" class="full-width q-mt-md text-center text-h5 text-italic text-grey">{{$t('text_selecOptionRegister')}}</div>
    </div>

    <q-page-sticky v-if="btnNew" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="$router.push($route.path + '/form')" />
    </q-page-sticky>

    <q-dialog v-model="showModalEditar">
      <q-card v-if="edit">
        <q-card-section>
          <div class="row">
            <div class="text-h6">{{ $t('subtitulo_moduloEditarContrato') }}</div>
            <q-space />
            <q-btn color="red" icon="close" flat round dense v-close-popup />
          </div>
          <q-input v-model="iEditContrato" outlined dense class="q-mt-sm" style="width: 300px" :error-message="$t('formError_requerido')" :error="$v.iEditContrato.$error" @blur="$v.iEditContrato.$touch()"/>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="blue" icon="edit" :label="$t('accion_editar')" push @click="modificar_contrato()" v-close-popup />
        </q-card-actions>
      </q-card>

      <q-card v-else class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div v-if="route === 'solicitudes' || route === 'solicitudes_history'" class="full-width">
          <div class="row q-px-lg items-center justify-between full-width">
            <div>
              <div v-if="ver.equipo" class="row">
                <div class="text-bold q-mr-xs text-grey-7">{{$t('form_equipo')}}: </div>
                <div class="text-grey-7">{{ver.equipo ? ver.equipo.name : ''}}</div>
              </div>
            </div>
            <div class="row">
              <div v-if="ver.expiration" class="bg-primary q-mr-sm" style="width: 25px; height: 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
              <div v-if="ver.equipment" class="bg-info q-mr-sm" style="width: 30px; height: 35px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"></div>
              <div :class="`text-caption q-px-lg text-center text-white bg-${ver.color} row items-center`" style="height: 40px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">{{ver.prioridad}}<br>{{$t('form_estado')}}: {{ver.status === 0 ? $t('statusSlt_0') : ver.status === 1 ? $t('statusSlt_1') : ver.status === 2 ? $t('statusSlt_2') : ver.status === 3 ? $t('statusSlt_3') : ver.status === 4 ? $t('statusSlt_4') : ver.status === 5 ? $t('statusSlt_5') : ''}}</div>
            </div>
          </div>
          <div class="q-mb-lg q-mt-md">
            <div class="text-center text-h6 text-bold">{{$t('text_datosSolicitud')}}</div>
            <div class="text-center text-grey-8">{{$t('text_descripcionSlt')}}</div>
          </div>
          <div class="q-px-sm q-mb-md full-width">
            <div class="row">
              <q-avatar class="bg-secondary q-mx-sm q-my-md" size="170px">
                <q-img :src="baseu + 'company_img/' + ver.empresa_id" class="full-height"/>
              </q-avatar>
              <div class="q-px-sm q-py-md col column justify-between">
                <div>
                  <div class="text-subtitle1 text-bold">{{ver.empresa}}</div>
                  <div>
                    <div class="text-bold text-caption text-grey-7">{{$t('text_servicioDescription')}}:</div>
                    <q-scroll-area style="height: 60px;">
                      <div class="text-grey-7" style="font-size: 10px;">{{ver.description}}</div>
                    </q-scroll-area>
                  </div>
                </div>
                <div>
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey-7 text-caption">{{$t('text_servicioDescription')}}:</div>
                    <div class="text-grey-7 text-caption">{{ver.dateSlt}}</div>
                  </div>
                  <div class="row">
                    <div class="text-bold q-mr-xs text-grey-7 text-caption">{{$t('form_HoraSlt')}}:</div>
                    <div class="text-grey-7 text-caption">{{ver.timeSlt}}hr</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="q-px-sm q-mb-sm">
              <div v-if="ver.scheduled" class="row justify-center q-mb-sm">
                <div class="text-bold text-grey-7 text-subtitle1 q-mr-xs">{{$t('text_agendadaSlt')}}</div>
              </div>
              <div class="row">
                <div v-if="route === 'solicitudes' || (route === 'solicitudes_history' && rol === 3)" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('titulo_userClient')}}</div>
                  <div class="text-grey-7">{{ver.cliente}}</div>
                </div>
                <div v-if="route === 'solicitudes' || (route === 'solicitudes_history' && rol !== 3)" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('titulo_consultorAsignado')}}</div>
                  <div class="text-grey-7">{{ver.consultor}}</div>
                </div>
                <div v-if="ver.equipment" class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('form_equipo')}}</div>
                  <div class="text-grey-7">{{ver.equipo}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('form_categoria')}}</div>
                  <div class="text-grey-7">{{ver.categoria}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <div class="text-bold text-grey-7">{{$t('Fecha y hora de expiración')}}</div>
                  <div class="text-grey-7">{{ver.expirationDate}}hr</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="ver.status > 0">
                  <div class="text-bold text-grey-7">{{$t('form_fechaInicio')}}</div>
                  <div class="text-grey-7">{{ver.dateBegin}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="ver.status > 0">
                  <div class="text-bold text-grey-7">{{$t('form_HoraInicio')}}</div>
                  <div class="text-grey-7">{{ver.timeBegin}}hr</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="ver.status === 5">
                  <div class="text-bold text-grey-7">{{$t('titulo_fechaEstimadaTermino')}}</div>
                  <div class="text-grey-7">{{ver.dateEnd}}</div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" v-if="ver.status === 5">
                  <div class="text-bold text-grey-7">{{$t('titulo_horaEstimadaTermino')}}</div>
                  <div class="text-grey-7">{{ver.timeEnd}}hr</div>
                </div>
              </div>
            </div>
            <div v-if="hitos.length" class="full-width q-px-sm q-mb-md">
              <div class="q-mb-sm">
                <div class="text-subtitle1 text-bold">{{$t('text_historialHitos')}}</div>
                <div class="text-grey-8">{{$t('text_descripcionComent')}}</div>
              </div>
              <q-list>
                <div class="q-mb-xs" v-for="(item, index) in hitos" :key="index">
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
            <div v-if="ver.rating" class="column items-center text-grey-8 q-px-sm">
              <q-rating readonly v-model="ver.rating.number" size="3.5em" color="yellow" icon="star_border" icon-selected="star"/>
              <div v-if="ver.rating.comment">
                <div class="text-bold">{{$t('text_coment')}}</div>
                <div>{{ver.rating.comment}}</div>
              </div>
            </div>
          </div>
          <div class="full-width column items-center q-mb-lg">
            <q-btn class="text-white q-py-xs" color="primary" :label="$t('accion_cerrarVentana')" @click="showModalEditar = !showModalEditar" style="width: 70%; border-radius: 5px;" no-caps/>
          </div>
        </div>
        <div v-else class="q-pa-lg full-width">
          <div class="column items-center">
            <q-avatar size="170px">
              <q-img :src="baseu + `${route === 'companys' ? 'company_img/' : 'perfil_img/'}` + ver._id" class="full-height"/>
            </q-avatar>
            <div class="q-py-md text-center">
              <div class="text-h5 text-bold">{{route === 'companys' ? ver.name : ver.name + ' ' + ver.last_name}}</div>
              <div class="text-h6 text-grey-7">{{ver.email}}</div>
              <div class="text-bold text-grey-7">{{ver.phone}}</div>
            </div>
          </div>
          <div class="q-px-sm">
            <div class="row q-mb-sm" v-if="route === 'companys'">
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_tipoContrato')}}</div>
                <div class="text-grey-7">{{ver.contrato}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('titulo_inicioTerminoContract')}}:</div>
                <div class="text-grey-7">{{ver.dateBegin}}  {{ver.dateEnd}}</div>
              </div>
            </div>
            <div class="row q-mb-sm" v-if="route === 'companys'">
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_pais')}}</div>
                <div class="text-grey-7">{{ver.pais}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_estado')}}</div>
                <div class="text-grey-7">{{ver.estado}}</div>
              </div>
            </div>
            <div class="row q-mb-sm" v-if="route === 'companys'">
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_ciudad')}}</div>
                <div class="text-grey-7">{{ver.ciudad}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_direccion')}}</div>
                <div class="text-grey-7">{{ver.direction}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">{{route === 'companys' ? $t('form_codigoPostal') : $t('form_tipoUsuario')}}</div>
                <div class="text-grey-7">{{route === 'companys' ? ver.postalCode : rol === 2 ? ver.tipo_usuario : 'Highit'}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">{{$t('form_numDocumento')}}</div>
                <div class="text-grey-7">{{route === 'companys' ? ver.numIdet : ver.Dni}}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import NewSlt from 'components/NewSolicitud'
import { Money } from 'v-money'
import * as moment from 'moment'
import env from '../env'
export default {
  components: { NewSlt, Money },
  props: {
    titulo: {
      type: String,
      default: ''
    },
    subtitulo: {
      type: String,
      default: ''
    },
    columns: {
      type: Array
    },
    route: {
      type: String,
      default: ''
    },
    route_id: {
      type: String,
      default: null
    },
    btnNew: {
      type: Boolean,
      default: false
    },
    crearBtn: {
      type: Boolean,
      default: false
    },
    asignarBtn: {
      type: Boolean,
      default: false
    },
    inputBtn: {
      type: Boolean,
      default: false
    },
    selectBtn: {
      type: Boolean,
      default: false
    },
    verBtn: {
      type: Boolean,
      default: false
    },
    editarBtn: {
      type: Boolean,
      default: true
    },
    eliminarBtn: {
      type: Boolean,
      default: true
    },
    habilitarBtn: {
      type: Boolean,
      default: false
    },
    selectFlt: {
      type: Boolean,
      default: true
    },
    filter: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      baseu: '',
      user: {},
      rol: null,
      empresa: null,
      data: [],
      ver: {},
      hitos: [],
      showModalEditar: false,
      edit: false,
      iEditContrato: '',
      select: {},
      options: [],
      options2: [],
      id: '',
      fecha: ''
    }
  },
  validations: {
    iEditContrato: { required }
  },
  watch: {
    async filter (val) {
      if (!this.filter) {
        this.data = await this.$api.get(this.route)
      } else {
        this.data = await this.$api.get(this.filter)
      }
    }
  },
  computed: {
    filterData () {
      if (this.select) {
        if (this.select === 'todos') {
          return this.data
        } else if (this.route === 'sla') {
          return this.data.filter(v => v.contrato === this.select)
        } else if (this.route === 'areas') {
          return this.data.filter(v => v.department_id === this.select)
        } else if (this.route === 'charges') {
          return this.data.filter(v => v.area_id === this.select)
        } else if (this.route === 'user_consultor') {
          return this.data.filter(v => v.departamento === this.select)
        } else if (this.route === 'solicitudes') {
          return this.data.filter(v => v.category === this.select)
        } else if (this.route === 'solicitudes_history') {
          return this.data.filter(v => this.validarFecha(this.select) && (moment(v.dateSlt).isBetween(this.select.from, this.select.to) || moment(v.dateSlt).isSame(this.select.from) || moment(v.dateSlt).isSame(this.select.to)))
        } else {
          return this.data.filter(v => v.empresa === this.select)
        }
      } else {
        return this.data
      }
    }
  },
  async mounted () {
    this.flt = this.selectFlt
    if (!this.inputBtn) { this.select = null }
    this.userLogueado()
    await this.getRecord()
  },
  methods: {
    validarFecha (fch) {
      if (fch.from && fch.to && moment(fch.from).isBefore(fch.to)) {
        return true
      } else {
        if (fch.from && fch.to) {
          this.$q.notify({
            message: this.$t('formNotif_validarFecha'),
            color: 'negative'
          })
        }
        return false
      }
    },
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.rol = res.roles[0]
          this.baseu = env.apiUrl
          if (this.route === 'user' && this.rol === 2) {
            this.$api.get('company/' + this.user.empresa).then(r => {
              if (r) {
                this.empresa = r
              }
            })
          }
        }
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.options2
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.options2.filter(v => this.route === 'sla' ? v.contrato.toLowerCase().indexOf(needle) > -1 : this.route === 'solicitudes' ? v.nombre.toLowerCase().indexOf(needle) > -1 : v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    verItem (itm) {
      const vm = this
      this.$q.loading.show({
        message: this.$t('accion_cargando')
      })
      if (this.route === 'conocimientos') {
        setTimeout(function () {
          vm.$emit('mostrar', itm._id)
          vm.$q.loading.hide()
        }, 2000)
      } else {
        this.edit = false
        this.ver = { ...itm }
        if (this.route === 'companys') {
          this.$api.get('pais/' + itm.pais_id).then(res => { if (res) { this.ver.pais = res.name } })
          this.$api.get('estado/' + itm.estado_id).then(res => { if (res) { this.ver.estado = res.name } })
          this.$api.get('ciudad/' + itm.ciudad_id).then(res => { if (res) { this.ver.ciudad = res.name } })
        }
        if (this.route === 'solicitudes_history' || this.route === 'solicitudes') {
          this.$api.get('history_hitos/' + this.ver._id).then(res => { if (res) { this.hitos = res } })
          if (this.ver.status === 5) {
            this.$api.get('rating/' + this.ver._id).then(res => { if (res) { this.ver.rating = res } })
          }
        }
        setTimeout(function () {
          vm.showModalEditar = true
          vm.$q.loading.hide()
        }, 2000)
      }
    },
    editar (id) {
      if (this.route === 'contratos' || this.route === `contratos_by_company/${this.user.empresa}`) {
        this.edit = true
        this.showModalEditar = true
        this.id = id
        this.iEditContrato = this.data.filter(v => v._id === id)[0].contrato
      } else {
        this.$router.push(this.$route.path + '/form/' + id)
      }
    },
    async getRecord () {
      let res = []
      if (!this.filter) {
        res = await this.$api.get(this.route_id !== null ? this.route + '/' + this.route_id : this.route)
      } else {
        res = await this.$api.get(this.filter)
      }
      if (res) {
        this.data = res
        if (this.route === 'user' && this.rol === 2) {
          this.user.tipo_usuario = 'Highit'
          this.data.push(this.user)
        }
        await this.getOptions()
      }
    },
    eliminarConfirm (id) {
      this.$q.dialog({
        title: this.$t('titulo_dialogConfir'),
        message: this.$t('text_dialogConfirEli'),
        cancel: {
          flat: true,
          label: this.$t('accion_cancelar')
        },
        ok: {
          label: this.$t('accion_si'),
          flat: true
        }
      }).onOk(() => {
        this.eliminar(id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    eliminar (id) {
      this.$api.delete(this.route + '/' + id).then(res => {
        if (res) {
          if (res.code) {
            this.$q.notify({
              message: this.$t('formError_uso'),
              color: 'negative'
            })
          } else {
            this.$q.notify({
              message: this.$t('formNotif_eliminado'),
              color: 'positive'
            })
            this.getRecord()
            this.$emit('actualizarPadre')
          }
        }
      })
    },
    async modificar_contrato () {
      this.$v.$touch()
      const val = this.data.filter(v => v.contrato === this.iEditContrato && v._id !== this.id)
      if (!this.$v.iEditContrato.$error && !val.length) {
        await this.$api.put('contrato/' + this.id, { contrato: this.iEditContrato }).then(res => {
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_editado'),
              color: 'positive'
            })
            this.iEditContrato = ''
            this.getRecord()
            this.$emit('actualizarPadre')
          }
        })
      } else {
        this.$q.notify({
          message: `${val.length ? this.$t('formNotif_contratoRegistrado') : this.$t('formError_datos')}`,
          color: 'negative'
        })
      }
    },
    mostrardialogo (id) {
      this.$emit('asignarEquipo', id)
    },
    async getOptions () {
      await this.$api.get(this.route === 'sla' ? this.rol === 1 ? 'contratos' : 'contratos/' + this.user.empresa : this.route === 'user_consultor' ? 'departments' : this.route === 'solicitudes' ? 'categorias_departamento/' + this.user.departamento : this.rol === 1 ? 'companys' : 'empresas_user').then(res => {
        if (res) {
          this.options = res
          if (this.empresa !== null) {
            this.options.push(this.empresa)
          }
          this.options2 = [...this.options]
        }
      })
      // const todos = this.options.unshift({ name: 'Todos', _id: 'todos' })
    },
    selectChange (select) {
      if (select) {
        this.select = select
        this.flt = true
      } else {
        this.flt = false
      }
    },
    enable (itm) {
      this.$q.dialog({
        title: this.$t('titulo_dialogConfir'),
        message: itm.enable ? this.$t('formNotif_deseaHabilitar') : this.$t('formNotif_deseaDeshabilitar'),
        cancel: {
          flat: true,
          label: this.$t('accion_cancelar')
        },
        ok: {
          label: this.$t('accion_si'),
          flat: true
        }
      }).onOk(() => {
        this.$api.put('update_enable/' + itm._id, { enable: itm.enable }).then(res => {
          if (res) {
            this.$q.notify({
              message: itm.enable ? this.$t('formNotif_habilitado') : this.$t('formNotif_deshabilitado'),
              color: 'positive'
            })
            this.getRecord()
          }
        })
      }).onCancel(() => {
        itm.enable = !itm.enable
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
