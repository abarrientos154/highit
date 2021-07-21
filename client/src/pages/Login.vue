<template>
  <div>
    <div class="absolute-center column justify-center items-center bg-white" style="width:100%">
      <div class="column q-pa-md">
        <div class="row justify-center q-pt-xl">
          <img src="logo.png" style="width:150px" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-ma-sm">
          <div class="q-pl-lg q-mb-sm text-caption"> Correo electronico</div>
          <q-input dense autofocus filled type="email" v-model="form.email" placeholder="Correo electrónico" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()" >
            <template v-slot:before>
              <q-icon name="mail_outline" color= "secondary" />
            </template>
          </q-input>
          <div class="q-pl-lg q-mb-sm text-caption"> Contraseña</div>
          <q-input dense filled :type="isPwd ? 'password' : 'text'" v-model="form.password" placeholder="Contraseña" :error="$v.form.password.$error" error-message="Este campo es requerido" @blur="$v.form.password.$touch()" >
            <template v-slot:before>
              <q-icon name="vpn_key" color= "secondary" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-ma-sm">
          <q-btn class="full-width q-py-sm" color="primary" :loading="loading"
            @click="onSubmit()" no-caps
              >Ingresar
              <template v-slot:loading>
                <q-spinner-hourglass class="on-center" />
                Loading...
              </template>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      isPwd: true,
      loading: false,
      email: '',
      form: {},
      user: {}
    }
  },
  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.loading = true
        this.$q.loading.show({
          message: 'Iniciando sesión'
        })
        this.$api.post('login', this.form).then(res => {
          if (res) {
            this.user = res.HIGHIT_SESSION_INFO
            this.login(res)
            if (this.user.roles[0] === 1) {
              this.$router.push('/inicio_user01')
            } else if (this.user.roles[0] === 2) {
              this.$router.push('/inicio_user02')
            } else if (this.user.roles[0] === 3) {
              // Ruta al home del consultor
              console.log('Este usuario es un consultor')
            } else if (this.user.roles[0] === 4) {
              this.$router.push('/inicio_cliente')
            }
          } else {
            console.log('error de ususario')
            this.loading = false
            this.$q.loading.hide()
          }
          this.$q.loading.hide()
          this.loading = false
        })
      }
    }
  }
}
</script>
