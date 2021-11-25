<template>
  <div>
    <div class="column items-center justify-center">
      <div style="width:100%">
        <div class="bordes">
          <div class="q-pb-xl q-px-md q-pt-md column items-end col">
            <div class="text-h3 text-bold">NUEVO PRODUCTO</div>
            <div class="text-grey-8 text-h6">Administra los equipos de tus clientes</div>
          </div>
        </div>
          <q-card flat class="q-pa-md">
            <div class="text-h6 text-bold">Informacion del Equipo</div>
            <div class="text-h7">Ingresa la Informacion del equipo</div>
              <div>
                <div class="q-mt-md text-subtitle1">Nombre del equipo</div>
                <q-input filled v-model="form.name" placeholder="Nombre del equipo" error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

                <div class="q-mt-md text-subtitle1">Descripcion</div>
                <q-input v-model="form.descripcion" filled type="textarea" placeholder="Mi descripcion..." error-message="Requerido" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()" />

                  <div class="q-mt-sm text-h6">Selecciona empresa</div>
                  <div class="q-mt-sm text-subtitle1">Listado de empresa</div>
                  <q-select filled v-model="form.empresa" use-input behavior="menu" input-debounce="0" :options="empresas" map-options option-label="name" emit-value option-value="_id" @filter="filterFn" :error="$v.form.empresa.$error" @blur="$v.form.empresa.$touch()">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
              </div>
              <div class="q-pa-md column items-center justify-center">
                <q-btn no-caps class="q-py-xs" color="primary" text-color="white" label="Guardar" @click="registrar_equipo()" style="width:40%" />
              </div>
          </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      user: {},
      empresas: [],
      empresas2: []
    }
  },
  validations: {
    form: {
      name: { required },
      descripcion: { required },
      empresa: { required }
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.empresas = this.empresas2
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.empresas = this.empresas2.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    async registrar_equipo () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.empresa_creador = this.user.empresa
        this.$api.post('equipo', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Equipo Guardado con Exito',
              color: 'positive'
            })
            this.form = {}
            this.$router.go(-1)
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    async getEmpresas () {
      this.$api.get('companys_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.empresas = res
          this.empresas2 = [...this.empresas]
        }
      })
    },
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getEmpresas()
        }
      })
    }
  },

  mounted () {
    this.userLogueado()
  }
}
</script>

<style lang="scss" scoped>
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
}
</style>
