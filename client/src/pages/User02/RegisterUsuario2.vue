<template>
  <div>
    <div class="column items-center justify-center">
      <div style="width:100%">
        <div class="bordes">
          <div class="q-pb-xl q-px-md q-pt-md column items-end col">
            <div class="text-h3 text-bold">NUEVO USUARIO</div>
            <div class="text-grey-8 text-h6">Creacion de nuevos usuarios para el sistema</div>
          </div>
        </div>
        <q-card flat>
          <div class="q-px-md q-pt-lg">
            <div class="text-h6">Informacion del usuario</div>
            <div class="text-h7">Informacion general del usuario</div>
            <div class="q-mt-md text-subtitle1">Foto de perfil</div>
          </div>
            <q-img :src="perfilfile ? perfilImg : 'nopublicidad.jpg'" style="height: 200px; width: 100%" >
                <div class="column justify-center items-center bg-transparent absolute-center" style="width:100%">
                    <q-avatar size="80px">
                    <div style="z-index:1">
                        <q-file borderless v-model="perfilfile" class="button-camera" @input="changeperfilfile()" accept=".jpg, image/*"
                        @blur="$v.perfilfile.$touch()">
                          <q-icon name="backup" class="absolute-center" size="30px" color="white" />
                        </q-file>
                    </div>
                    </q-avatar>
                    <div :class="!$v.perfilfile.$error ? 'text-black' : 'text-negative'" class="q-mt-sm text-caption"> Toca para seleccionar la foto de perfil del usuario </div>
                </div>
            </q-img>
            <div class="q-pa-md">
              <div class="text-subtitle1">Nombres</div>
              <q-input filled v-model="form.name" placeholder="Demo Nombre" error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

              <div class="q-mt-md text-subtitle1">Apellidos</div>
              <q-input filled v-model="form.last_name" placeholder="Demo Apellido" error-message="Requerido" :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"/>

              <div class="q-mt-md text-subtitle1">Numero de documento</div>
              <q-input filled v-model="form.Dni" placeholder="j3246o235" error-message="Requerido" :error="$v.form.Dni.$error" @blur="$v.form.Dni.$touch()"/>

              <div class="q-mt-md text-subtitle1">Telefono</div>
              <q-input filled v-model="form.phone" placeholder="+52 1 55 8403 5917" error-message="Requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>

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

                <div class="q-mt-sm text-h6">Tipo de cuenta</div>
                <div class="q-mt-sm text-subtitle1">Seleccione el rol que tendra el usuario</div>
                <q-select filled v-model="form.roles" :options="roles" map-options option-label="name" emit-value option-value="value"
                :error="$v.form.roles.$error" @blur="$v.form.roles.$touch()" />

                  <div v-if="form.roles === 3 || form.roles === 5">
                    <div class="q-mt-sm text-h6">Selecciona un Departamento</div>
                    <div class="q-mt-sm text-subtitle1">Listado de Departamentos</div>
                    <q-select @input="areasOpt(form.departamento)" filled v-model="form.departamento" :options="departamentos" map-options option-label="name" emit-value option-value="_id"
                    :error="$v.form.departamento.$error" @blur="$v.form.departamento.$touch()" />

                    <div v-if="form.roles === 3">
                      <div class="q-mt-sm text-h6">Selecciona un Area</div>
                      <div class="q-mt-sm text-subtitle1">Listado de Areas</div>
                      <q-select @input="cargosOpt(form.area)" filled v-model="form.area" :options="areas" map-options option-label="name" emit-value option-value="_id"
                        :error="$v.form.area.$error" @blur="$v.form.area.$touch()" />

                      <div class="q-mt-sm text-h6">Selecciona un Cargo</div>
                      <div class="q-mt-sm text-subtitle1">Listado de Cargos</div>
                      <q-select filled v-model="form.cargo" :options="cargos" map-options option-label="name" emit-value option-value="_id"
                        :error="$v.form.cargo.$error" @blur="$v.form.cargo.$touch()" />
                    </div>
                  </div>

                <div v-if="form.roles === 4 || form.roles === 6">
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

              <div v-if="form.roles === 7">
                <div class="q-mt-sm text-h6">Selecciona gestion</div>
                <div class="q-mt-sm text-subtitle1">Listado de indicadores a gestionar</div>
                <q-select filled v-model="form.manage" :options="gestion" multiple map-options option-label="name" emit-value option-value="_id" :error="$v.form.manage.$error" @blur="$v.form.manage.$touch()">
                  <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                    <q-item v-bind="itemProps" v-on="itemEvents">
                      <q-item-section avatar>
                        <q-icon :name="opt.icon" size="40px"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="opt.name" ></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox :value="selected" @input="toggleOption(opt)" />
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="q-pa-md column items-center justify-center">
              <q-btn color="primary" class="q-py-xs" text-color="white" label="Crear Usuario" @click="registrar_usuario()" style="width:40%" no-caps/>
            </div>
          </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, sameAs, maxLength, minLength, requiredIf } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      user: {},
      perfilfile: null,
      perfilImg: null,
      password: '',
      model: '',
      repeatPassword: '',
      isPwd: true,
      isPwd2: true,
      empresas: [],
      empresas2: [],
      gestion: [],
      departamentos: [],
      areas: [],
      cargos: [],
      roles: [
        {
          name: 'Gerente',
          value: 7
        },
        {
          name: 'Consultor Administrador',
          value: 5
        },
        {
          name: 'Cliente Administrador',
          value: 6
        },
        {
          name: 'Consultor',
          value: 3
        },
        {
          name: 'Cliente Final',
          value: 4
        }
      ]
    }
  },
  validations: {
    form: {
      email: { email, required },
      phone: { required },
      Dni: { required },
      last_name: { required },
      name: { required },
      empresa: {
        required: requiredIf(function () {
          return this.form.roles === 4 || this.form.roles === 6
        })
      },
      roles: { required },
      departamento: {
        required: requiredIf(function () {
          return this.form.roles === 3 || this.form.roles === 5
        })
      },
      cargo: {
        required: requiredIf(function () {
          return this.form.roles === 3
        })
      },
      area: {
        required: requiredIf(function () {
          return this.form.roles === 3
        })
      },
      manage: {
        required: requiredIf(function () {
          return this.form.roles === 7
        })
      }
    },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') },
    perfilfile: { required }

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
    getGestion () {
      this.$api.get('gestion').then(res => {
        if (res) {
          this.gestion = res
        }
      })
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    changeperfilfile () {
      if (this.perfilfile) { this.perfilImg = URL.createObjectURL(this.perfilfile) }
    },
    async registrar_usuario () {
      this.$v.form.$touch()
      this.$v.perfilfile.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      this.form.empresa_creador = this.user.empresa
      this.form.company = this.user.empresa
      if (this.form.roles === 5 || this.form.roles === 7) {
        this.form.empresa = this.user.empresa
      }
      if (!this.$v.perfilfile.$error && !this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.form.password = this.password
        const formData = new FormData()
        formData.append('perfil', this.perfilfile)
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('register_user2', formData, {
          headers: { 'Content-Type': undefined }
        }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Usuario agregado con exito',
              color: 'positive'
            })
            this.form = {}
            this.$v.form.$reset()
            this.perfilfile = null
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
    getEmpresas () {
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
          this.rol = res.roles[0]
          this.user = res
          this.getGestion()
          this.getDepartamentos()
          this.getEmpresas()
        }
      })
    },
    areasOpt (id) {
      this.$api.get('areas/' + id).then(res => {
        if (res) {
          this.areas = res
        }
      })
    },
    cargosOpt (id) {
      this.$api.get('cargos/' + id).then(res => {
        if (res) {
          this.cargos = res
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
.bordes {
  border-right: 2px solid $grey-6;
  border-left: 2px solid $grey-6;
  border-bottom: 2px solid $grey-6;
  margin-left: 2px;
}
</style>
