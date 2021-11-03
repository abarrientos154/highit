<template>
  <div class="q-py-lg q-px-xl">
    <q-img src="leaderboard highit desk 4.png" style="width: 100%"/>
    <div class="column justify-center items-center full-width" :style="baseu ? '' : 'margin-top: -50px'">
      <q-avatar v-if="baseu" class="q-mt-xl q-mb-lg" size="200px">
        <img :src="baseu" style="height: 100%" />
      </q-avatar>
      <img v-else src="Desk 1.2.png" style="width:400px"/>
      <div :style="baseu ? '' : 'margin-top: -75px'">
        <div>
          <div class="q-pl-lg q-mb-sm text-caption"> Correo electronico</div>
          <q-input dense autofocus filled type="email" v-model="form.email" placeholder="Correo electrónico" @input="getUser_email()" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()" >
            <template v-slot:before>
              <q-icon name="mail_outline" color= "secondary" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <div class="q-pl-lg q-mb-sm text-caption"> Contraseña</div>
          <q-input dense filled :type="isPwd ? 'password' : 'text'" v-model="form.password" placeholder="Contraseña" :error="$v.form.password.$error" error-message="Este campo es requerido" @blur="$v.form.password.$touch()" >
            <template v-slot:before>
              <q-icon name="vpn_key" color= "secondary" />
            </template>
          </q-input>
        </div>
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
</template>

<script>
import env from '../env'
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      baseu: null,
      isPwd: true,
      loading: false,
      email: '',
      form: {},
      user: {},
      userEmail: {}
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
    getUser_email () {
      if (this.form.email && !this.$v.form.email.$error) {
        this.$api.get('user_email/' + this.form.email).then(res => {
          if (res) {
            this.userEmail = res[0]
            if (this.userEmail && this.userEmail.empresa_user) {
              this.baseu = env.apiUrl + 'company_img/' + this.userEmail.empresa_user._id
            } else {
              this.baseu = null
            }
          }
        })
      }
    },
    onSubmit () {
      this.$v.$touch()
      if (this.userEmail && this.userEmail.roles[0] !== 1 ? !this.$v.form.$error && this.userEmail.empresa_user.enable : !this.$v.form.$error) {
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
              this.$router.push('/inicio_consultor')
            } else if (this.user.roles[0] === 4) {
              this.$router.push('/inicio_cliente')
            } else if (this.user.roles[0] === 5) {
              this.$router.push('/inicio_consultor_admin')
            } else if (this.user.roles[0] === 6) {
              this.$router.push('/inicio_cliente_admin')
            } else if (this.user.roles[0] === 7) {
              this.$router.push('/inicio_gerente')
            }
          } else {
            this.loading = false
            this.$q.loading.hide()
          }
          this.$q.loading.hide()
          this.loading = false
        })
      } else if (!this.userEmail.empresa_user.enable) {
        this.$q.notify({
          message: 'La empresa a la que perteneces a sido deshabilitada',
          color: 'negative'
        })
      }
    }
  }
}
</script>
