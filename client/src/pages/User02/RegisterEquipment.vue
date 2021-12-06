<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{!edit ? 'NUEVO PRODUCTO' : 'EDITAR PRODUCTO'}}</div>
      <div class="text-grey text-h6">Administra los equipos de tus clientes</div>
    </div>

    <div class="q-pa-md">
      <div>
        <div class="text-h6 text-bold">Informacion del Equipo</div>
        <div class="text-subtitle1">Nombre del equipo</div>
        <q-input filled v-model="form.name" placeholder="Nombre del equipo" error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

        <div class="q-mt-sm text-subtitle1">Descripcion</div>
        <q-input v-model="form.descripcion" filled type="textarea" placeholder="Mi descripcion..." error-message="Requerido" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()" />

        <div class="q-mt-sm text-subtitle1">Selecciona empresa</div>
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

      <div class="q-mt-sm row justify-center">
        <q-btn no-caps class="q-py-xs" color="primary" text-color="white" :label="!edit ? 'Crear producto' : 'Actualizar producto'" @click="!edit ? registrar_equipo() : editar_equipo()" style="width:40%" />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      id: null,
      edit: false,
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
  mounted () {
    this.userLogueado()
    if (this.$route.params.id) { this.obtener_datos(this.$route.params.id) }
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getEmpresas()
        }
      })
    },
    getEmpresas () {
      this.$api.get('companys_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.empresas = res
          this.empresas2 = [...this.empresas]
        }
        this.$q.loading.hide()
      })
    },
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
    async obtener_datos (id) {
      this.$q.loading.show()
      await this.$api.get('equipo/' + id).then(res => {
        if (res) {
          this.edit = true
          this.id = id
          this.form = res
        }
        this.$q.loading.hide()
      })
    },
    registrar_equipo () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        this.form.empresa_creador = this.user.empresa
        this.$api.post('equipo', this.form).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Equipo Guardado con Exito',
              color: 'positive'
            })
            this.form = {}
            this.$v.form.$reset()
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
    async editar_equipo () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        await this.$api.put('equipo/' + this.id, this.form).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Informacion actualizada con exito.',
              color: 'positive'
            })
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
