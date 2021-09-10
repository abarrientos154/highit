<template>
  <div>
    <div class="q-pa-md column items-center justify-center">
      <div style="width:100%">
        <q-card class="" style="width:100%; height:150px">
          <q-card-section>
            <div class="text-h3 text-right text-bold">Nuevo Producto</div>
            <div class="text-h5 text-right">Administra los equipos de tus clientes</div>
          </q-card-section>
        </q-card>
          <q-card class="q-pa-md">
            <div class="text-h6 text-bold">Informacion del Equipo</div>
            <div class="text-h7">Ingresa la Informacion del equipo</div>
              <div class="q-pa-md">
                <div class="q-mt-md text-subtitle1">Nombre del equipo</div>
                <q-input filled v-model="form.name" placeholder="Nombre del equipo" />

                <div class="q-mt-md text-subtitle1">Descripcion</div>
                <q-input v-model="form.descripcion" filled type="textarea" placeholder="Mi descripcion..."
                :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()" />

                  <div class="q-mt-sm text-h6">Selecciona empresa</div>
                  <div class="q-mt-sm text-subtitle1">Listado de empresa</div>
                  <q-select filled v-model="form.empresa" :options="empresas" map-options option-label="name" emit-value option-value="_id" placeholder="Empresa 01"
                  :error="$v.form.empresa.$error" @blur="$v.form.empresa.$touch()" />
              </div>
              <div class="q-pa-md column items-center justify-center">
                <q-btn color="primary" text-color="white" label="Guardar" @click="editar_equipo()" style="width:40%" />
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
      id: this.$route.params.id,
      form: {},
      user: {},
      empresas: []
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
    async obtener_datos () {
      this.$q.loading.show()
      const v = await this.$api.get('equipo/' + this.id)
      this.$q.loading.hide()
      if (v) {
        this.form = v
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
          } else {
            this.$q.notify({
              message: 'Ocurrio un error al actualizar',
              color: 'negative'
            })
          }
        })
      }
    },

    async getEmpresas () {
      this.$api.get('companys_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.empresas = res
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
    this.obtener_datos()
  }
}
</script>
