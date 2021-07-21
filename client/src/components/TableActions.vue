<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-bold" style="font-size:30px">
        {{titulo}}
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :data="data" no-data-label="No hay registros" rows-per-page-label="Datos por pagina" :columns="columns">
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn v-if="editarBtn" icon="edit" size="sm" flat dense @click="editar(props.row._id)" />
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="eliminarConfirm(props.row._id)"/>
          </q-td>
        </template>
        <template v-slot:body-cell-color="props">
          <q-td :props="props">
              <div :class="props.row.color2 === 'blue' ? 'bg-blue' : props.row.color2 === 'red' ? 'bg-red' : 'bg-green'" style="width:20px; height:20px;border-radius:100%"></div>
          </q-td>
        </template>
      </q-table>
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
    editarBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      rol: 0,
      user: {},
      data: [],
      showModalEditar: false,
      iEditContrato: '',
      id: ''
    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.getRecord()
          // console.log(this.user)
        }
      })
    },
    editar (id) {
      if (this.route === 'contratos' || this.route === 'contratos_by_company/') {
        this.showModalEditar = true
        this.id = id
      } else {
        this.$router.push(this.$route.path + '/form/' + id)
      }
    },
    getRecord () {
      if (this.rol === 1) {
        this.$api.get('contratos').then(res => {
          if (res) {
            this.data = res
          }
        })
      } else {
        this.$api.get('contratos_by_company/' + this.user.empresa).then(res => {
          if (res) {
            this.data = res
          }
        })
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
      this.$api.delete('contratos/' + id).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Eliminado Correctamente',
            color: 'positive'
          })
          this.getRecord()
          if (this.route === 'contratos' || this.route === 'contratos_by_company/') {
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
          if (this.route === 'contratos' || this.route === 'contratos_by_company/') {
            this.$emit('actualizarPadre')
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
