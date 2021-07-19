<template>
  <div>
    <div class="q-pa-md column items-center justify-center">
      <div style="width:100%">
        <q-card class="" style="width:100%; height:150px">
          <q-card-section>
            <div class="text-h3 text-right text-bold">Editar Usuario</div>
            <div class="text-h5 text-right">Edicion de datos de usuarios en el sistema</div>
          </q-card-section>
        </q-card>
          <q-card>
          <div class="text-h6">Informacion del usuario</div>
          <div class="text-h7">Informacion general del usuario</div>
          <div class="q-mt-md text-subtitle1">foto de perfil</div>
            <q-img :src="baseu" style="height: 200px; width: 100%" >
                <div class="column justify-center items-center bg-transparent absolute-center" style="width:100%">
                    <q-avatar size="80px">
                    <div style="z-index:1">
                        <q-file borderless v-model="perfilfile" class="button-camera" @input="perfil_img()" accept=".jpg, image/*"
                        @blur="$v.perfilfile.$touch()">
                          <q-icon name="file_upload" class="absolute-center" size="30px" color="white" />
                        </q-file>
                    </div>
                    </q-avatar>
                    <div :class="!$v.perfilfile.$error ? 'text-white' : 'text-negative'" class="q-mt-sm text-caption"> Toca para seleccionar la foto de perfil del usuario </div>
                </div>
            </q-img>
            <div class="q-pa-md">
              <div class="q-mt-md text-subtitle1">Nombres</div>
              <q-input filled v-model="form.name" placeholder="Demo Nombre" />

              <div class="q-mt-md text-subtitle1">Apellidos</div>
              <q-input filled v-model="form.last_name" placeholder="Demo Apellido" />

              <div class="q-mt-md text-subtitle1">Correo</div>
                <q-input v-model="form.email" filled type="email" disable placeholder="micorreo@highitservice.com"
                error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>

              <div class="q-mt-md text-subtitle1">Numero identificador</div>
              <q-input filled v-model="form.Dni" placeholder="j3246o235" />

              <div class="q-mt-md text-subtitle1">Telefono</div>
              <q-input filled v-model="form.phone" placeholder="+52 1 55 8403 5917" />

              <div class="q-mt-sm text-h6">Selecciona empresa</div>
                <div class="q-mt-sm text-subtitle1">Listado de empresa</div>
                <q-select filled v-model="form.empresa" :options="empresas" map-options option-label="name" emit-value option-value="_id" placeholder="Empresa 01"
                :error="$v.form.empresa.$error" @blur="$v.form.empresa.$touch()"/>

            </div>
            <div class="q-pa-md column items-center justify-center">
              <q-btn color="primary" text-color="white" label="Editar Usuario" @click="editar_usuario()" style="width:40%" />
            </div>

            <q-separator/>

              <div class="q-pa-md">

                <div class="q-mt-md text-subtitle1">Contraseña Actual</div>
                  <q-input :type="isPwd3 ? 'password' : 'text'" v-model="oldpassword" filled
                    error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.oldpassword.$error" @blur="$v.oldpassword.$touch()">
                    <template v-slot:append>
                    <q-icon :name="isPwd3 ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd3 = !isPwd3" />
                    </template>
                  </q-input>

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
                  <div class="q-pa-md column items-center justify-center">
                    <q-btn color="primary" text-color="white" label="Actualizar contraseña" @click="editar_contrasena()" style="width:50%" />
                  </div>
              </div>
          </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      form: {},
      oldpassword: '',
      perfilfile: null,
      perfilImg: null,
      password: '',
      model: '',
      baseu: '',
      repeatPassword: '',
      isPwd: true,
      isPwd2: true,
      isPwd3: true,
      empresas: [],
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
      name: { required },
      empresa: { required }
    },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') },
    oldpassword: { required },
    perfilfile: { required }

  },
  mounted () {
    this.obtener_datos()
    this.getEmpresas()
    this.baseu = env.apiUrl + '/perfil_img/' + this.id
  },
  methods: {
    async obtener_datos () {
      console.log(this.id, 'id')
      this.$q.loading.show()
      const v = await this.$api.get('datauser/' + this.id)
      this.$q.loading.hide()
      if (v) {
        this.form = v
      }
    },
    async getEmpresas () {
      this.$q.loading.show()
      const res = await this.$api.get('companys')
      this.$q.loading.hide()
      if (res) {
        this.empresas = res
        console.log(res, 'miraa')
      }
    },

    async perfil_img () {
      console.log('add perfil img', this.perfilfile)
      this.$v.perfilfile.$touch()
      if (!this.$v.perfilfile.$error) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfilfile
        formData.append('files', files[0])
        await this.$api.post('perfil_imagen/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res, 'respuesta')
        })
        location.reload()
      }
    },
    async editar_usuario () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        await this.$api.put('datos_edit/' + this.id, this.form).then(res => {
          this.$q.loading.hide()
          if (res) {
            console.log(res, 'asd')
            this.$q.notify({
              message: 'Informacion actualizada con exito.',
              color: 'positive'
            })
          } else {
            this.$q.notify({
              message: 'Ocurrio un error al actualizar',
              color: 'negative'
            })
          }
        })
      }
    },

    async editar_contrasena () {
      this.$v.repeatPassword.$touch()
      this.$v.oldpassword.$touch()
      this.$v.password.$touch()
      console.log(this.$v.password.$error, this.$v.oldpassword.$error, this.$v.repeatPassword.$error)
      if (!this.$v.password.$error && !this.$v.oldpassword.$error && !this.$v.repeatPassword.$error) {
        const send = {
          newPassword: this.password,
          password: this.oldpassword
        }
        this.$q.loading.show()
        await this.$api.put('password_edit/' + this.id, send).then(res => {
          this.$q.loading.hide()
          if (res) {
            console.log(res, 'asd')
            this.$q.notify({
              message: 'Informacion actualizada con exito.',
              color: 'positive'
            })
          }
        })
      }
    }

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
