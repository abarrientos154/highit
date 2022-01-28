<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{edit ? $t('titulo_moduloEditarEmpresa') : $t('titulo_moduloCrearEmpresa')}}</div>
      <div class="text-grey text-h6">{{edit ? $t('subtitulo_moduloEditarEmpresa') : $t('subtitulo_moduloCrearEmpresa')}}</div>
    </div>
    <div class="q-my-lg q-px-md">
      <div class="q-mb-md">
        <div class="text-h6 text-bold">{{$t('text_datosEmpresa')}}</div>
        <div class="text-grey-8">{{$t('text_infoEmpresa')}}</div>
      </div>
      <q-list>
        <div>
          <div>{{$t('form_nombreComercial')}}</div>
          <q-input outlined filled v-model="form.name" :placeholder="$t('formFormat_nombreComercial')" :error-message="$t('formError_campo')" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_razonSocial')}}</div>
          <q-input outlined filled v-model="form.businessName" :placeholder="$t('formFormat_razonSocial')" :error-message="$t('formError_campo')" :error="$v.form.businessName.$error" @blur="$v.form.businessName.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_numDocumento')}}</div>
          <q-input outlined filled v-model="form.numIdet" :placeholder="$t('formFormat_numDocumento')" :error-message="$t('formError_campo')" :error="$v.form.numIdet.$error" @blur="$v.form.numIdet.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_contrato')}}</div>
          <q-select outlined filled v-model="form.typeContract" use-input behavior="menu" input-debounce="0" :options="contratos" map-options option-label="contrato" emit-value option-value="_id" @filter="filterFn" :error-message="$t('formError_campo')" :error="$v.form.typeContract.$error" @blur="$v.form.typeContract.$touch()">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{$t('formNotif_noResultados')}}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div>
          <div>{{$t('form_inicioContrato')}}</div>
          <q-input outlined filled readonly v-model="form.dateBegin" :placeholder="$t('formFormat_fecha')" :error-message="$t('formError_campo')" :error="$v.form.dateBegin.$error" @blur="$v.form.dateBegin.$touch()" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateBegin" mask="YYYY-MM-DD"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <div>{{$t('form_finalContrato')}}</div>
          <q-input outlined filled readonly v-model="form.dateEnd" :placeholder="$t('formFormat_fecha')" :error-message="$t('formError_campo')" :error="$v.form.dateEnd.$error" @blur="$v.form.dateEnd.$touch()" @click="$refs.qDateProxy2.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateEnd" mask="YYYY-MM-DD"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div v-if="rol === 1">
          <div>
            <div>{{$t('form_numUsuarios')}}</div>
            <q-input type="number" outlined filled v-model.number="form.users" :rules="[ v => v > 0 ]" :error-message="$t('formError_campo')" :error="$v.form.users.$error" @blur="$v.form.users.$touch()"/>
          </div>
        </div>
      </q-list>
    </div>
    <div class="q-px-md q-mb-lg">
      <div class="q-mb-sm">
        <div class="text-h6 text-bold">{{$t('text_ubicacionEmpresa')}}</div>
        <div class="text-grey-8">{{$t('text_direccionEmpresa')}}</div>
      </div>
      <q-list>
        <div>
          <div>{{$t('form_pais')}}</div>
          <q-select outlined filled v-model="form.pais_id" :options="paises" @input="getEstados(paises.find(v => v._id === form.pais_id).id), form.estado_id = null, form.ciudad_id = null" option-label="name" map-options emit-value option-value="_id" :error-message="$t('formError_campo')" :error="$v.form.pais_id.$error" @blur="$v.form.pais_id.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_estado')}}</div>
          <q-select outlined filled v-model="form.estado_id" :options="estados" @input="getCiudades(estados.find(v => v._id === form.estado_id).id), form.ciudad_id = null" option-label="name" map-options emit-value option-value="_id" :error-message="$t('formError_campo')" :error="$v.form.estado_id.$error" @blur="$v.form.estado_id.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_ciudad')}}</div>
          <q-select outlined filled v-model="form.ciudad_id" :options="ciudades" option-label="name" map-options emit-value option-value="_id" :error-message="$t('formError_campo')" :error="$v.form.ciudad_id.$error" @blur="$v.form.ciudad_id.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_direccion')}}</div>
          <q-input outlined filled v-model="form.direction" :placeholder="$t('formFormat_direccion')" :error-message="$t('formError_campo')" :error="$v.form.direction.$error" @blur="$v.form.direction.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_codigoPostal')}}</div>
          <q-input outlined filled v-model="form.postalCode" :placeholder="$t('formFormat_codigoPostal')" :error-message="$t('formError_campo')" :error="$v.form.postalCode.$error" @blur="$v.form.postalCode.$touch()"/>
        </div>
      </q-list>
    </div>
    <div class="q-px-md">
      <div class="q-mb-md">
        <div class="text-h6 text-bold">{{$t('text_contactoEmpresa')}}</div>
        <div class="text-grey-8">{{$t('text_contactarEmpresa')}}</div>
      </div>
      <q-list>
        <div>
          <div>{{$t('form_correoContacto')}}</div>
          <q-input outlined filled v-model="form.email" :placeholder="$t('formFormat_correo')" :error-message="$t('formError_campo')" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
        </div>
        <div>
          <div>{{$t('form_telefonoContacto')}}</div>
          <q-input outlined filled v-model="form.phone" :placeholder="$t('formFormat_telefono')" :error-message="$t('formError_campo')" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
        </div>
      </q-list>
      <div>
        <div class="column items-center">
          <q-avatar rounded style="height: 200px; width: 100%;" class="q-mb-sm">
            <q-img style="height: 100%;" :src="perfilImg || edit ? perfilImg : 'nopublicidad.jpg'">
              <q-file  borderless v-model="PImg" @input="perfil_img()" accept=".jpg, image/*" style="z-index: 1; font-size: 0px; width: 100%; height: 100%; cursor: pointer;">
                <div class="column items-center justify-center absolute-full" style="height: 150px;">
                  <q-icon name="backup" class="q-mt-xl" size="75px" :color="!$v.PImg.$error ? 'white' : 'negative'"/>
                  <div :class="!$v.PImg.$error ? 'text-white' : 'text-negative'" class="text-center text-caption">{{$t('formError_perfil')}}</div>
                </div>
              </q-file>
            </q-img>
          </q-avatar>
        </div>
      </div>
    </div>
    <div class="column items-center q-pa-lg">
      <q-btn class="q-py-sm" :label="edit ? $t('accion_guardar') + ' ' + $t('form_empresa').toLowerCase() : $t('accion_crear') + ' ' + $t('form_empresa').toLowerCase()" color="primary" style="width: 40%;" @click="edit ? updateCompany() : saveCompany()" no-caps/>
    </div>
  </div>
</template>

<script>
import { required, requiredIf, email } from 'vuelidate/lib/validators'
import env from '../env'
export default {
  data () {
    return {
      rol: 0,
      user: {},
      id: '',
      edit: false,
      perfilImg: null,
      PImg: null,
      form: {},
      paises: [],
      estados: [],
      ciudades: [],
      selectPais: null,
      selectEstado: null,
      selectCiudad: null,
      contratos: [],
      contratos2: []
    }
  },
  validations: {
    form: {
      name: { required },
      businessName: { required },
      numIdet: { required },
      typeContract: { required },
      dateBegin: { required },
      dateEnd: { required },
      users: {
        required: requiredIf(function () {
          return this.rol === 1
        })
      },
      pais_id: { required },
      estado_id: { required },
      ciudad_id: { required },
      direction: { required },
      postalCode: { required },
      email: { required, email },
      phone: { required }
    },
    PImg: { required }
  },
  mounted () {
    this.userLogueado()
    if (this.$route.params.id) { this.getCompanyById(this.$route.params.id) }
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.getContratos()
          this.getPaises()
        }
      })
    },
    getPaises () {
      this.$api.get('paises').then(res => {
        if (res) {
          this.paises = res
          if (this.edit) {
            this.getEstados(this.paises.filter(v => v._id === this.form.pais_id)[0].id)
          }
        }
        this.$q.loading.hide()
      })
    },
    getEstados (id) {
      this.$api.get('estados/' + id).then(res => {
        if (res) {
          this.estados = res
          if (this.edit) {
            this.getCiudades(this.estados.filter(v => v._id === this.form.estado_id)[0].id)
          }
        }
      })
    },
    getCiudades (id) {
      this.$api.get('ciudades/' + id).then(res => {
        if (res) {
          this.ciudades = res
        }
      })
    },
    getContratos () {
      this.$api.get(this.rol === 1 ? 'contratos' : 'contratos_by_company/' + this.user.empresa).then(res => {
        if (res) {
          this.contratos = res
          this.contratos2 = [...this.contratos]
        }
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.contratos = this.contratos2
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.contratos = this.contratos2.filter(v => v.contrato.toLowerCase().indexOf(needle) > -1)
      })
    },
    getCompanyById (id) {
      this.$api.get('company/' + id).then(res => {
        if (res) {
          this.id = id
          this.edit = true
          this.form = res
          this.perfilImg = env.apiUrl + 'company_img/' + this.id
        }
      })
    },
    perfil_img () {
      if (this.PImg) {
        this.perfilImg = URL.createObjectURL(this.PImg)
        if (this.edit) {
          this.$v.PImg.$touch()
          if (!this.$v.PImg.$error) {
            const formData = new FormData()
            formData.append('files', this.PImg)
            this.$api.post('perfil_company/' + this.id, formData, {
              headers: {
                'Content-Type': undefined
              }
            })
            location.reload()
          }
        }
      }
    },
    saveCompany () {
      this.$v.$touch()
      if (!this.$v.PImg.$error && !this.$v.form.$error) {
        this.$q.loading.show({
          message: this.$t('accion_cargando')
        })
        this.form.status = this.rol
        this.form.enable = true
        if (this.rol === 2) {
          this.form.company_id = this.user.empresa
        }
        const formData = new FormData()
        const files = []
        files[0] = this.PImg
        formData.append('PFiles', files[0])
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('register_company', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_guardado'),
              color: 'positive'
            })
            this.$router.push('/empresas')
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_datos'),
          color: 'negative'
        })
      }
    },
    updateCompany () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: this.$t('accion_cargando')
        })
        this.$api.put('update_company/' + this.id, this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: this.$t('formNotif_guardado'),
              color: 'positive'
            })
            this.$router.push('/empresas')
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_datos'),
          color: 'negative'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
