<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-bold" style="font-size:30px">
        {{titulo}}
      </div>
      <q-select v-if="selectBtn" class="q-mt-md" filled v-model="select" use-input behavior="menu" input-debounce="0" :label="route === 'sla' ? 'Seleccione un contrato para ver las prioridades respectivas' : 'Seleccione una empresa para ver el listado respectivo'" :options="options" map-options :option-label="route === 'sla' ? 'contrato' : 'name'" emit-value option-value="_id" @input="select ? flt = true : flt = false" @filter="filterFn">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-grid :data="filterData" :columns="columns" :columns_filter="true">
        <template v-slot:body="props">

          <q-tr :props="props">
            <template v-for="item in columns">
              <q-td v-if="flt" :key="item.name">
                <div v-if="item.name === 'Action'" class="row justify-center no-wrap">
                  <q-btn v-if="verBtn" icon="visibility" size="sm" class="q-mx-sm" flat dense @click="verItem(props.row)"/>
                  <q-btn v-if="editarBtn" icon="edit" size="sm" class="q-mx-sm" flat dense @click="editar(props.row._id)" />
                  <q-btn v-if="eliminarBtn" icon="delete" size="sm" class="q-mx-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
                  <q-btn v-if="crearBtn" class="q-mx-sm" style="width:130px" color="primary" text-color="white" label="Crear solicitud" @click="mostrardialogo(props.row._id, 1)" no-caps/>
                  <q-btn v-if="asignarBtn" class="q-mx-sm" style="width:130px" color="primary" text-color="white" label="Asignar equipo" @click="mostrardialogo(props.row._id, 2)" no-caps/>
                </div>
                <div v-else-if="item.name === 'Profile'" class="row justify-center">
                  <q-avatar>
                    <q-img :src="baseu + `${route === 'companys' ? 'company_img/' : 'perfil_img/'}` + props.row._id" class="full-height"/>
                  </q-avatar>
                </div>
                <div v-else :class="item.text ? `row justify-${item.text} items-center` : ''">
                  <q-avatar v-if="props.row.color2 && item.name === 'nombre'" class="q-mr-sm" :color="props.row.color2" size="30px"/>
                  {{ props.row[item.name] }}
                </div>
              </q-td>
            </template>
          </q-tr>
        </template>
      </q-grid>
    </q-card-section>
    <q-page-sticky v-if="btnNew" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="$router.push($route.path + '/form')" />
    </q-page-sticky>
    <q-dialog v-model="showModalEditar">
      <q-card v-if="edit">
        <q-card-section>
          <div class="row">
            <div class="text-h6">Modifica el contrato</div>
            <q-space />
            <q-btn color="red" icon="close" flat round dense v-close-popup />
          </div>
          <q-input v-model="iEditContrato" outlined dense class="q-mt-sm" style="width: 300px" error-message="Requerido" :error="$v.iEditContrato.$error" @blur="$v.iEditContrato.$touch()"/>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="blue" icon="edit" label="Modificar" push @click="modificar_contrato()" v-close-popup />
        </q-card-actions>
      </q-card>

      <q-card v-else class="column items-center no-wrap" style="width: 475px; border-radius: 10px;">
        <div class="q-pa-lg full-width">
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
                <div class="text-bold text-grey-7">Tipo de contrato</div>
                <div class="text-grey-7">{{ver.contrato}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Inicio y termino de contrato:</div>
                <div class="text-grey-7">{{ver.dateBegin}}  {{ver.dateEnd}}</div>
              </div>
            </div>
            <div class="row q-mb-sm" v-if="route === 'companys'">
              <div class="col">
                <div class="text-bold text-grey-7">Pais</div>
                <div class="text-grey-7">{{ver.pais}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Estado</div>
                <div class="text-grey-7">{{ver.estado}}</div>
              </div>
            </div>
            <div class="row q-mb-sm" v-if="route === 'companys'">
              <div class="col">
                <div class="text-bold text-grey-7">Ciudad</div>
                <div class="text-grey-7">{{ver.ciudad}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Direccion</div>
                <div class="text-grey-7">{{ver.direction}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="text-bold text-grey-7">{{route === 'companys' ? 'Codigo postal' : 'Tipo de usuario'}}</div>
                <div class="text-grey-7">{{route === 'companys' ? ver.postalCode : rol === 2 ? ver.tipo_usuario : 'Highit'}}</div>
              </div>
              <div class="col">
                <div class="text-bold text-grey-7">Nº de identificaion</div>
                <div class="text-grey-7">{{route === 'companys' ? ver.numIdet : ver.Dni}}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import env from '../env'
export default {
  props: {
    titulo: {
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
      paises: [],
      showModalEditar: false,
      edit: false,
      iEditContrato: '',
      select: null,
      options: [],
      options2: [],
      id: ''
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
    this.userLogueado()
    await this.getRecord()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.rol = res.roles[0]
          this.baseu = env.apiUrl
          if (this.route === 'user2') {
            this.$api.get('company/' + this.user.empresa).then(r => {
              if (r) {
                this.empresa = r
              }
            })
          }
          this.getPaises()
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
        this.options = this.options2.filter(v => this.route === 'sla' ? v.contrato.toLowerCase().indexOf(needle) > -1 : v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    verItem (itm) {
      this.edit = false
      this.ver = { ...itm }
      if (this.route === 'companys') {
        this.ver.pais = this.paises.filter(v => v._id === itm.pais_id)[0].name
        this.ver.estado = this.paises.filter(v => v._id === itm.pais_id)[0].estados.filter(v => v._id === itm.estado_id)[0].name
        this.ver.ciudad = this.paises.filter(v => v._id === itm.pais_id)[0].estados.filter(v => v._id === itm.estado_id)[0].ciudades.filter(v => v._id === itm.ciudad_id)[0].name
      }
      this.showModalEditar = true
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
        await this.getOptions()
      }
    },
    eliminarConfirm (id) {
      this.$q.dialog({
        title: '¡Confirmación!',
        message: 'esta seguro que desea eliminar el registro.',
        cancel: {
          flat: true,
          label: 'Cancelar'
        },
        ok: {
          label: 'Si',
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
          this.$q.notify({
            message: 'Eliminado Correctamente',
            color: 'positive'
          })
          this.getRecord()
          this.$emit('actualizarPadre')
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
              message: 'Contrato Modificada con exito',
              color: 'positive'
            })
            this.iEditContrato = ''
            this.getRecord()
            this.$emit('actualizarPadre')
          }
        })
      } else {
        this.$q.notify({
          message: `${val.length ? 'El nombre de este contrato ya esta registrado' : 'Faltan campos por llenar'}`,
          color: 'negative'
        })
      }
    },
    mostrardialogo (id, idx) {
      if (idx === 1) {
        this.$emit('formSlt', id)
      } else {
        this.$emit('asignarEquipo', id)
      }
    },
    async getOptions () {
      await this.$api.get(this.route === 'sla' ? this.rol === 1 ? 'contratos' : 'contratos/' + this.user.empresa : this.rol === 1 ? 'companys' : 'empresas_user').then(res => {
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
    getPaises () {
      this.$api.get('paises').then(res => {
        if (res) {
          this.paises = res
        }
      })
    },
    selectChange (select) {
      if (select) {
        this.select = select
        this.flt = true
      } else {
        this.flt = false
      }
    }
  }
}
</script>
