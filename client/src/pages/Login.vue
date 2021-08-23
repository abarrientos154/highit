<template>
  <div>
    <div class="absolute-center column justify-center items-center bg-white" style="width:100%">
      <div class="column q-pa-md">
        <div class="row justify-center q-pt-xl">
          <img src="logo.png" style="width:150px" />
        </div>
 <q-grid :data="data" :columns="columns" :columns_filter="true"></q-grid>
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
      user: {},
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
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
              this.$router.push('/inicio_consultor')
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
