<template>
  <div>
    <div class="q-pa-md column items-center justify-center">
      <div class="" style="width:100%">
        <q-card class="" style="width:100%; height:200px">
          <q-card-section>
            <div class="text-h3 text-right text-bold">Categoria</div>
            <div class="text-h5 text-right">Crea las categorias de las solicitudes de tus clientes</div>
          </q-card-section>
        </q-card>
          <div class="column items-center justify-center">
            <q-card flat class="q-pl-md q-mt-md" style="width:100%">
              <div class="text-h5 text-bold">Creacion de categorias</div>
              <div class="q-mt-md text-subtitle1">Selecciona el departamento</div>
              <q-select filled @input="areasOpt(form.departamento)" v-model="form.departamento" :options="departamentos" map-options option-label="name" emit-value option-value="_id"
               error-message="Requerido" :error="$v.form.departamento.$error" @blur="$v.form.departamento.$touch()" />

               <div class="q-mt-sm text-h6">Selecciona un Area</div>
                  <div class="q-mt-sm text-subtitle1">Listado de Areas</div>
                  <q-select @input="cargosOpt(form.area)" filled v-model="form.area" :options="areas" map-options option-label="name" emit-value option-value="_id" placeholder="Empresa 01"
                    :error="$v.form.area.$error" @blur="$v.form.area.$touch()" />

                <div class="q-mt-sm text-h6">Selecciona un Cargo</div>
                <div class="q-mt-sm text-subtitle1">Listado de Cargos</div>
                <q-select filled v-model="form.cargo" :options="cargos" map-options option-label="name" emit-value option-value="_id" placeholder="Empresa 01"
                  :error="$v.form.cargo.$error" @blur="$v.form.cargo.$touch()" />

              <div class="text-h5 text-bold">Creacion de categorias</div>
              <div class="q-mt-md text-subtitle1">Nombre de categoria</div>
              <q-input filled v-model="form.nombre" placeholder="Ingresa el nombre de la categoria"
               error-message="Requerido" :error="$v.form.nombre.$error" @blur="$v.form.nombre.$touch()"/>

                <div class="q-pa-md column items-center justify-center">
                  <q-btn color="primary" text-color="white" label="Crear nueva categoria" @click="guardar_categoria()" style="width:40%" />
                </div>
            </q-card>
            <q-card flat style="width:100%">
              <div class="q-mt-md text-h5 text-bold">Categorias</div>
              <Tabla titulo="Listado de Categorias" ref="latabla3" :editarBtn="false" :columns="column" route="categorias" :btnNew="false" />
            </q-card>
          </div>
      </div>
    </div>

  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import Tabla from '../../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      user: {},
      form: {},
      departamentos: [],
      lista: {},
      areas: [],
      cargos: [],
      column: [
        { name: 'Action', label: 'Acciones', field: 'Action', filter_type: 'false', sortable: false, align: 'center' },
        { name: 'nombre', field: 'nombre', label: 'Nombre', align: 'left' },
        { name: 'departamentoName', field: 'departamentoName', label: 'Departamento Asociado', align: 'left' }
      ]
    }
  },
  validations: {
    form: {
      departamento: { required },
      nombre: { required },
      area: { required },
      cargo: { required }

    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getDepartamentos()
          this.obtener_categorias()
          console.log(this.user, 'user')
        }
      })
    },
    guardar_categoria () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.company_id = this.user.empresa
        this.$api.post('categoria', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Categoria Guardada con Exito',
              color: 'positive'
            })
            this.form.departamento = ''
            this.form.nombre = ''
            this.form.area = ''
            this.form.cargo = ''
            this.$v.form.departamento.$reset()
            this.$v.form.nombre.$reset()
            this.$v.form.area.$reset()
            this.$v.form.cargo.$reset()
            this.obtener_categorias()
            this.$refs.latabla3.getRecord()
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
          console.log(this.departamentos, 'depas')
        }
      })
    },
    obtener_categorias () {
      this.$api.get('categorias/' + this.user.empresa).then(res => {
        if (res) {
          this.lista = res
          console.log(this.lista, 'Categorias')
        }
      })
    },
    areasOpt (id) {
      this.$api.get('areas/' + id).then(res => {
        if (res) {
          this.areas = res
          console.log(this.areas, 'areasss')
        }
      })
    },
    cargosOpt (id) {
      this.$api.get('cargos/' + id).then(res => {
        if (res) {
          this.cargos = res
          console.log(this.cargos, 'cargos')
        }
      })
    }
  }
}
</script>
