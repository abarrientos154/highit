<template>
  <div>
    <div class="q-pa-xl column items-center justify-center">
      <div style="width:70%">
        <q-card class="" style="width:100%; height:150px">
          <q-card-section>
            <div class="text-h3 text-right text-bold">Nuevo Usuario</div>
            <div class="text-h5 text-right">Creacion de nuevos usuarios para el sistema</div>
          </q-card-section>
        </q-card>
          <q-card>
          <div class="text-h6">Informacion del usuario</div>
          <div class="text-h7">Informacion general del usuario</div>
          <div class="q-mt-md text-subtitle1">foto de perfil</div>
            <q-img :src="perfilfile ? perfilImg : 'nopublicidad.jpg'" style="height: 200px; width: 100%" >
                <div class="column justify-center items-center bg-transparent absolute-center" style="width:100%">
                    <q-avatar size="80px">
                    <div style="z-index:1">
                        <q-file borderless v-model="perfilfile" class="button-camera" @input="changeperfilfile()" accept=".jpg, image/*"
                        @blur="$v.perfilfile.$touch()">
                          <q-icon name="file_upload" class="absolute-center" size="30px" color="white" />
                        </q-file>
                    </div>
                    </q-avatar>
                    <div :class="!$v.perfilfile.$error ? 'text-black' : 'text-negative'" class="q-mt-sm text-caption"> Toca para seleccionar la foto de perfil del usuario </div>
                </div>
            </q-img>
            <div class="q-pa-md">
              <div class="q-mt-md text-subtitle1">Nombres</div>
              <q-input filled v-model="form.name" placeholder="Demo Nombre" />

              <div class="q-mt-md text-subtitle1">Apellidos</div>
              <q-input filled v-model="form.last_name" placeholder="Demo Apellido" />

              <div class="q-mt-md text-subtitle1">Numero identificador</div>
              <q-input filled v-model="form.Dni" placeholder="j3246o235" />

              <div class="q-mt-md text-subtitle1">Telefono</div>
              <q-input filled v-model="form.phone" placeholder="+52 1 55 8403 5917" />

              <div class="q-mt-md text-subtitle1">Correo</div>
                <q-input v-model="form.email" filled type="email" placeholder="micorreo@highitservice.com"
                error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>

              <div class="q-mt-md text-subtitle1">Contraseña</div>
                <q-input :type="isPwd ? 'password' : 'text'" v-model="password" filled
                  error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
                  <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
                  </template>
                </q-input>

              <div class="q-mt-sm text-subtitle1">Repite Contraseña</div>
                <q-input :type="isPwd2 ? 'password' : 'text'" v-model="repeatPassword" filled
                  error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
                  <template v-slot:append>
                  <q-icon :name="isPwd2 ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd2 = !isPwd2" />
                  </template>
                </q-input>

                <div class="q-mt-sm text-h6">Selecciona empresa</div>
                <div class="q-mt-sm text-subtitle1">Listado de empresa</div>
                <q-select filled v-model="model" :options="options" placeholder="Empresa 01" />
            </div>
            <div class="q-pa-md column items-center justify-center">
              <q-btn color="primary" text-color="white" label="Crear Usuario" @click="registrar_usuario()" style="width:40%" />
            </div>
          </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      perfilfile: null,
      perfilImg: null,
      password: '',
      model: '',
      repeatPassword: '',
      isPwd: true,
      isPwd2: true,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  validations: {
    form: {
      email: { email, required },
      phone: { required },
      last_name: { required },
      name: { required }
    },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') },
    perfilfile: { required }

  },
  methods: {
    changeperfilfile () {
      if (this.perfilfile) { this.perfilImg = URL.createObjectURL(this.perfilfile) }
    },
    async registrar_usuario () {
      this.$v.form.$touch()
      this.$v.perfilfile.$touch()
      if (!this.$v.perfilfile.$error && !this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.form.password = this.password
        const formData = new FormData()
        formData.append('perfil', this.perfilfile)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register_user', formData, {
          headers: { 'Content-Type': undefined }
        }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Usuario agregado con exito',
              color: 'positive'
            })
            this.form = {}
            this.perfilfile = null
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    }

  },

  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.button-subir {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $grey;
  border-radius: 100%;
  height:40px;
  width:40px;
  cursor: pointer;
}
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $grey;
  border-radius: 100%;
  height:80px;
  width:80px;
  cursor: pointer;
}
</style>
