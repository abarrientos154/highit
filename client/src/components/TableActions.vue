<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-bold" style="font-size:30px">
        {{titulo}}
      </div>
      <q-select v-if="selectBtn" class="q-mt-md" filled v-model="select" :options="options" label="Empresas" map-options emit-value option-label="name" option-value="_id"/>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-grid :data="filterData" :columns="columns" :columns_filter="true">
        <template v-slot:body="props">

          <q-tr :props="props">
            <template v-for="item in columns">
              <q-td v-if="item.name !== 'color'" :key="item.name">
                <div v-if="item.name === 'Action'" class="row justify-center">
                  <q-btn v-if="editarBtn" icon="edit" size="sm" flat dense @click="editar(props.row._id)" />
                  <q-btn v-if="eliminarBtn" icon="delete" size="sm" class="q-ml-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
                  <q-btn v-if="crearBtn" class="q-mx-sm" style="width:130px" color="primary" text-color="white" label="Crear solicitud" @click="mostrardialogo(props.row._id, 1)" no-caps/>
                  <q-btn v-if="asignarBtn" class="q-mx-sm" style="width:130px" color="primary" text-color="white" label="Asignar equipo" @click="mostrardialogo(props.row._id, 2)" no-caps/>
                </div>
                <div v-else-if="item.name === 'Profile'" class="row justify-center">
                  <q-avatar>
                    <q-img :src="baseu + props.row._id" class="full-height"/>
                  </q-avatar>
                </div>
                <div v-else-if="item.name === 'departamento' || item.name === 'consultor_id'" :class="item.text ? `row justify-${item.text}` : ''">{{info.length ? info.filter(v => v._id ===  props.row[item.name])[0].name : ''}}</div>
                <div v-else :class="item.text ? `row justify-${item.text}` : ''"> {{ props.row[item.name] }} </div>
              </q-td>
              <q-td v-else :key="item.name">
                <div :class="props.row.color2 === 'blue' ? 'bg-blue' : props.row.color2 === 'red' ? 'bg-red' : 'bg-green'" style="width:20px; height:20px;border-radius:100%"></div>
              </q-td>
            </template>
          </q-tr>
        </template>
      </q-grid>
      <!--<q-table :data="data" no-data-label="No hay registros" rows-per-page-label="Datos por pagina" :columns="columns">
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn v-if="editarBtn" icon="edit" size="sm" flat dense @click="editar(props.row._id)" />
            <q-btn v-if="eliminarBtn" icon="delete" size="sm" class="q-ml-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
            <q-btn v-if="crearBtn" style="width:130px" color="primary" text-color="white" label="Crear solicitud" @click="mostrardialogo(props.row._id)" />
          </q-td>
        </template>
        <template v-slot:body-cell-color="props">
          <q-td :props="props">
              <div :class="props.row.color2 === 'blue' ? 'bg-blue' : props.row.color2 === 'red' ? 'bg-red' : 'bg-green'" style="width:20px; height:20px;border-radius:100%"></div>
          </q-td>
        </template>
      </q-table> -->
    </q-card-section>
    <q-page-sticky v-if="btnNew" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="$router.push($route.path + '/form')" />
    </q-page-sticky>
    <q-dialog v-model="showModalEditar">
      <q-card>
        <q-card-section>
        <div class="row">
         <div class="text-h6">Modifica el contrato</div>
         <q-space />
          <q-btn color="red" icon="close" flat round dense v-close-popup />
        </div>
          <q-input v-model="iEditContrato" outlined dense class="q-mt-sm" style="width: 300px" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="blue" icon="edit" label="Modificar" push @click="modificar_contrato()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
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
    editarBtn: {
      type: Boolean,
      default: true
    },
    eliminarBtn: {
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
      data: [],
      info: [],
      showModalEditar: false,
      iEditContrato: '',
      select: null,
      options: [],
      filterEmpresas: this.options,
      id: ''
    }
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
      console.log(this.select, 'computed select')
      if (this.select) {
        if (this.select === 'todos') {
          return this.data
        } else {
          return this.data.filter(v => v.empresa === this.select)
        }
      } else {
        return this.data
      }
    }
  },
  async mounted () {
    this.userLogueado()
    await this.getRecord()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getEmpresas()
          this.baseu = env.apiUrl + 'company_img/'
          console.log(this.route_id, 'route_id')
          console.log(this.user, 'userrr')
        }
      })
    },
    editar (id) {
      if (this.route === 'contratos' || this.route === `contratos_by_company/${this.user.empresa}`) {
        this.showModalEditar = true
        this.id = id
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
        if (this.route === 'solicitudes_company') {
          this.data = res.filter(v => v.status >= 1)
          await this.getConsultores()
        } else {
          this.data = res
        }
        await this.getDepartments()
        console.log(this.data, 'datos tabla')
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
        console.log('>>>> Cancel')
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
    },
    mostrardialogo (id, idx) {
      if (idx === 1) {
        this.$emit('formSlt', id)
      } else {
        this.$emit('asignarEquipo', id)
      }
    },
    async getEmpresas () {
      if (this.user.roles[0] === 1) {
        await this.$api.get('companys').then(res => {
          if (res) {
            this.options = res
            console.log(this.options, 'opciones')
          }
        })
      } else {
        await this.$api.get('empresas_user').then(res => {
          if (res) {
            this.options = res
            console.log(this.options, 'opciones2')
          }
        })
      }
      const todos = this.options.unshift({ name: 'Todos', _id: 'todos' })
      console.log(todos, 'opciones agregando todos')
    },
    async getDepartments () {
      if (this.user.roles[0] === 5) {
        await this.$api.get('departments/' + this.user.empresa).then(res => {
          if (res) {
            this.info = res
            console.log(this.info, 'info')
          }
        })
      }
    },
    async getConsultores () {
      await this.$api.get('user_consultor/' + this.user.empresa).then(res => {
        if (res) {
          this.info = res
          console.log(this.info, 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
