<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-bold" style="font-size:30px">
        {{titulo}}
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
    <q-grid :data="data" :columns="columns" :columns_filter="true">
      <template v-slot:body="props">

          <q-tr :props="props">
            <template v-for="item in columns">
              <q-td v-if="item.name !== 'color'" :key="item.name">
                <div v-if="item.name === 'Action'" class="row justify-center">
                  <q-btn v-if="verBtn" icon="visibility" size="sm" flat dense @click="mostrardialogo(props.row._id)" />
                  <q-btn v-if="editarBtn && props.row.creador === user._id" icon="edit" size="sm" flat dense @click="editar(props.row._id)" />
                  <q-btn v-if="eliminarBtn" icon="delete" size="sm" class="q-ml-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
                  <q-btn v-if="crearBtn" style="width:130px" color="primary" text-color="white" label="Crear solicitud" @click="mostrardialogo()" />
                </div>
                <div v-if="item.name === 'empresa'">
                <div> {{ props.row.Empresa.name }} </div>
                </div>
                <div v-else> {{ props.row[item.name] }} </div>
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
            <q-btn v-if="verBtn" icon="visibility" size="sm" flat dense @click="mostrardialogo(props.row._id)" />
            <q-btn v-if="editarBtn && props.row.creador === user._id" icon="edit" size="sm" flat dense @click="editar(props.row._id)" />
            <q-btn v-if="eliminarBtn" icon="delete" size="sm" class="q-ml-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
            <q-btn v-if="crearBtn" style="width:130px" color="primary" text-color="white" label="Crear solicitud" @click="mostrardialogo()" />
          </q-td>
        </template>
        <template v-slot:body-cell-color="props">
          <q-td :props="props">
              <div :class="props.row.color2 === 'blue' ? 'bg-blue' : props.row.color2 === 'red' ? 'bg-red' : 'bg-green'" style="width:20px; height:20px;border-radius:100%"></div>
          </q-td>
        </template>
      </q-table>-->
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
    btnNew: {
      type: Boolean,
      default: false
    },
    crearBtn: {
      type: Boolean,
      default: false
    },
    editarBtn: {
      type: Boolean,
      default: true
    },
    verBtn: {
      type: Boolean,
      default: false
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
      user: {},
      data: [],
      showModalEditar: false,
      iEditContrato: '',
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
  async mounted () {
    this.userLogueado()
    await this.getRecord()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
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
        res = await this.$api.get(this.route)
      } else {
        res = await this.$api.get(this.filter)
      }
      if (res) {
        this.data = res
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
          if (this.route === 'contratos' || this.route === `contratos_by_company/${this.user.empresa}`) {
            this.$emit('actualizarPadre')
          }
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
    mostrardialogo (id) {
      this.$emit('mostrar', id)
    }
  }
}
</script>

<style scoped>
</style>
