<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{!edit ? 'NUEVO USUARIO' : 'EDITAR USUARIO'}}</div>
      <div class="text-grey text-h6">{{!edit ? 'Creacion de nuevos usuarios para el sistema' : 'Edicion de datos de usuarios en el sistema'}}</div>
    </div>

    <div class="q-pa-md column items-center">
      <div class="full-width">
        <div class="text-h6">Datos del usuario</div>

        <div class="q-mt-sm text-subtitle1">Foto de perfil</div>
        <q-avatar rounded style="height: 200px; width: 100%;">
          <q-img :src="perfilfile || edit ? perfilImg : 'nopublicidad.jpg'" style="height: 100%;" >
            <q-file  borderless v-model="perfilfile" @input="changeperfilfile()" accept=".jpg, image/*" style="z-index:1; font-size: 0px; width: 100%; height: 100%; cursor: pointer;">
              <div class="column items-center justify-center absolute-full" style="height: 150px;">
                <q-icon name="backup" class="q-mt-xl" size="75px" :color="!$v.perfilfile.$error ? 'white' : 'negative'"/>
                <div :class="!$v.perfilfile.$error ? 'text-white' : 'text-negative'" class="text-caption">Toca para seleccionar la foto de perfil del usuario</div>
              </div>
            </q-file>
          </q-img>
        </q-avatar>

        <div class="q-mt-md text-subtitle1">Nombres</div>
        <q-input filled v-model="form.name" placeholder="Demo Nombre" error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

        <div class="q-mt-sm text-subtitle1">Apellidos</div>
        <q-input filled v-model="form.last_name" placeholder="Demo Apellido" error-message="Requerido" :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"/>

        <div class="q-mt-sm text-subtitle1">Numero de documento</div>
        <q-input filled v-model="form.Dni" placeholder="j3246o235" error-message="Requerido" :error="$v.form.Dni.$error" @blur="$v.form.Dni.$touch()"/>

        <div class="q-mt-sm text-subtitle1">Telefono</div>
        <q-input filled v-model="form.phone" placeholder="+52 1 55 8403 5917" error-message="Requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>

        <div>
          <div class="q-mt-sm text-h6">Datos de la cuenta</div>

          <div v-if="rol === 2 && !edit">
            <div class="q-mt-sm text-subtitle1">Tipo de cuenta</div>
            <q-select filled v-model="form.roles" :options="roles" map-options option-label="name" emit-value option-value="value" :error="$v.form.roles.$error" @blur="$v.form.roles.$touch()">
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.name"/>
                    <q-item-label class="text-grey-7">{{scope.opt.description}}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div v-if="!edit ? rol === 1 || form.roles === 4 || form.roles === 6 : rol === 1 || form.roles[0] === 4 || form.roles[0] === 6">
            <div class="q-mt-sm text-subtitle1">Seleccione empresa</div>
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

          <div v-if="!edit ? form.roles === 3 || form.roles === 5 : form.roles[0] === 3 || form.roles[0] === 5">
            <div class="q-mt-sm text-subtitle1">Seleccione departamento</div>
            <q-select @input="areasOpt(form.departamento)" filled v-model="form.departamento" :options="departamentos" map-options option-label="name" emit-value option-value="_id" error-message="Requerido" :error="$v.form.departamento.$error" @blur="$v.form.departamento.$touch()" />

            <div v-if="!edit ? form.roles === 3 : form.roles[0] === 3">
              <div class="q-mt-sm text-subtitle1">Seleccione area</div>
              <q-select @input="cargosOpt(form.area)" filled v-model="form.area" :options="areas" map-options option-label="name" emit-value option-value="_id" error-message="Requerido" :error="$v.form.area.$error" @blur="$v.form.area.$touch()" />

              <div class="q-mt-sm text-subtitle1">Seleccione cargo</div>
              <q-select filled v-model="form.cargo" :options="cargos" map-options option-label="name" emit-value option-value="_id" error-message="Requerido" :error="$v.form.cargo.$error" @blur="$v.form.cargo.$touch()" />
            </div>
          </div>

          <div class="q-mt-sm text-subtitle1">Correo</div>
          <q-input v-model="form.email" filled type="email" placeholder="micorreo@highitservice.com" error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>

          <div v-if="edit">
            <div class="q-pa-md q-mb-md column items-center justify-center">
              <q-btn no-caps color="primary" class="q-py-xs" text-color="white" label="Editar Usuario" @click="editar_usuario()" style="width:40%" />
            </div>

            <div class="q-mt-sm text-h6">Actualización de contraseña</div>
            <div class="q-mt-sm text-subtitle1">Contraseña Actual</div>
            <q-input :type="isPwd2 ? 'password' : 'text'" v-model="oldpassword" filled error-message="Requerido" :error="$v.oldpassword.$error" @blur="$v.oldpassword.$touch()">
              <template v-slot:append>
                <q-icon :name="isPwd2 ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd2 = !isPwd2" />
              </template>
            </q-input>
          </div>

          <div class="q-mt-sm text-subtitle1">Contraseña</div>
          <q-input :type="isPwd ? 'password' : 'text'" v-model="password" filled error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <div class="q-mt-sm text-subtitle1">Repite contraseña</div>
          <q-input :type="isPwd ? 'password' : 'text'" v-model="repeatPassword" filled error-message="ingrese una contraseña valida, minimo 6 caracteres" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"/>
        </div>
      </div>

      <q-btn color="primary" class="q-py-xs" text-color="white" :label="!edit ? 'Crear Usuario' : 'Actualizar contraseña'" @click="!edit ? registrar_usuario() : editar_contrasena()" style="width:40%" no-caps/>
    </div>
  </div>
</template>
<script>
import { required, email, sameAs, maxLength, minLength, requiredIf } from 'vuelidate/lib/validators'
import env from '../env'
export default {
  data () {
    return {
      id: null,
      edit: false,
      rol: null,
      user: {},
      form: {},
      perfilfile: null,
      perfilImg: null,
      oldpassword: '',
      password: '',
      repeatPassword: '',
      isPwd: true,
      isPwd2: true,
      empresas: [],
      empresas2: [],
      departamentos: [],
      areas: [],
      cargos: [],
      roles: [
        {
          name: 'Gerente',
          description: 'Se encarga de gestionar las actividades realizadas por los clientes y consultores, segun el estado de las mismas.',
          value: 7
        },
        {
          name: 'Consultor Administrador',
          description: 'Asegura el buen manejo y distribución de las actividades y consultores.',
          value: 5
        },
        {
          name: 'Cliente Administrador',
          description: 'Distrubuye los equipos pertenecientes a su empresa entre los clientes finales de la misma y a su vez, cumple con la función de un cliente final.',
          value: 6
        },
        {
          name: 'Consultor',
          description: 'Son los usuarios capacitados para llevar a cavo las diversas solicitudes hechas por los clientes finales.',
          value: 3
        },
        {
          name: 'Cliente Final',
          description: 'Estos usuarios son los encargados de hacer saber las necesidades de su empresa y que sean solventadas segun su urgencia.',
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
      empresa: { required },
      roles: {
        required: requiredIf(function () {
          return this.rol === 2
        })
      },
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
      }
    },
    oldpassword: { required },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') },
    perfilfile: { required }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    async userLogueado () {
      this.$q.loading.show()
      await this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.getEmpresas()
          if (this.rol !== 1) { this.getDepartamentos() }
          if (this.$route.params.id) { this.getDatos(this.$route.params.id) }
        }
      })
    },
    async getEmpresas () {
      await this.$api.get(this.rol === 1 ? 'companys' : 'companys_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.empresas = res
          this.empresas2 = [...this.empresas]
        }
        this.$q.loading.hide()
      })
    },
    async getDepartamentos () {
      await this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    async areasOpt (id) {
      await this.$api.get('areas/' + id).then(res => {
        if (res) {
          this.areas = res
        }
      })
    },
    async cargosOpt (id) {
      await this.$api.get('cargos/' + id).then(res => {
        if (res) {
          this.cargos = res
        }
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
    async getDatos (id) {
      await this.$api.get('datauser/' + id).then(res => {
        if (res) {
          this.id = id
          this.edit = true
          this.form = res
          this.perfilImg = env.apiUrl + 'perfil_img/' + id
          if (this.rol !== 1 && this.form.roles[0] === 3) {
            this.areasOpt(this.form.departamento)
            this.cargosOpt(this.form.area)
          }
        }
      })
    },
    async changeperfilfile () {
      if (this.perfilfile) {
        this.perfilImg = URL.createObjectURL(this.perfilfile)
        if (this.edit) {
          this.$v.perfilfile.$touch()
          if (!this.$v.perfilfile.$error) {
            const formData = new FormData()
            formData.append('files', this.perfilfile)
            await this.$api.post('perfil_imagen/' + this.id, formData, {
              headers: {
                'Content-Type': undefined
              }
            })
            location.reload()
          }
        }
      }
    },
    async registrar_usuario () {
      this.$v.form.$touch()
      this.$v.perfilfile.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      if (this.rol !== 1) {
        this.form.empresa_creador = this.user.empresa
        this.form.company = this.user.empresa
        if (this.form.roles === 3 || this.form.roles === 5 || this.form.roles === 7) {
          this.form.empresa = this.user.empresa
        }
      } else { this.form.roles = 2 }
      if (!this.$v.perfilfile.$error && !this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.$q.loading.show({
          message: 'Guardando usuario...'
        })
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
    async editar_usuario () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        await this.$api.put('datos_edit/' + this.id, this.form).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Informacion actualizada con exito.',
              color: 'positive'
            })
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    async editar_contrasena () {
      this.$v.oldpassword.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      if (!this.$v.oldpassword.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.$q.loading.show()
        const send = {
          password: this.oldpassword,
          newPassword: this.password
        }
        await this.$api.put('password_edit/' + this.id, send).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Informacion actualizada con exito.',
              color: 'positive'
            })
            this.oldpassword = ''
            this.password = ''
            this.repeatPassword = ''
            this.$v.oldpassword.$reset()
            this.$v.password.$reset()
            this.$v.repeatPassword.$reset()
          }
          this.$q.loading.hide()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
