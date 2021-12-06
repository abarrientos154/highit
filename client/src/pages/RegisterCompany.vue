<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{edit ? 'ACTUALIZA EMPRESA' : 'NUEVA EMPRESA'}}</div>
      <div class="text-grey text-h6">{{edit ? 'Modificar datos de la empresa' : 'Creacion de nuevas empresas'}}</div>
    </div>
    <div class="q-my-lg q-px-md">
      <div class="q-mb-md">
        <div class="text-h6 text-bold">Datos de la empresa</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div>
          <div>Nombre comercial</div>
          <q-input outlined filled v-model="form.name" placeholder="Highit Service" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
        </div>
        <div>
          <div>Razón social</div>
          <q-input outlined filled v-model="form.businessName" placeholder="Highit Service SpA" error-message="Este campo es requerido" :error="$v.form.businessName.$error" @blur="$v.form.businessName.$touch()"/>
        </div>
        <div>
          <div>Numero de documento</div>
          <q-input outlined filled v-model="form.numIdet" placeholder="J30583h375" error-message="Este campo es requerido" :error="$v.form.numIdet.$error" @blur="$v.form.numIdet.$touch()"/>
        </div>
        <div>
          <div>Tipo de contrato</div>
          <q-select outlined filled v-model="form.typeContract" use-input behavior="menu" input-debounce="0" :options="contratos" map-options option-label="contrato" emit-value option-value="_id" @filter="filterFn" error-message="Este campo es requerido" :error="$v.form.typeContract.$error" @blur="$v.form.typeContract.$touch()">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div>
          <div>Fecha inicio de contrato</div>
          <q-input outlined filled readonly v-model="form.dateBegin" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.dateBegin.$error" @blur="$v.form.dateBegin.$touch()" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateBegin" mask="DD/MM/YYYY"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <div>Fecha termino de contrato</div>
          <q-input outlined filled readonly v-model="form.dateEnd" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.dateEnd.$error" @blur="$v.form.dateEnd.$touch()" @click="$refs.qDateProxy2.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateEnd" mask="DD/MM/YYYY"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div v-if="rol === 1">
          <div>
            <div>Numero de usuarios</div>
            <q-input type="number" outlined filled v-model.number="form.users" placeholder="Cantidad de usuarios de la empresa" :rules="[ v => v > 0 ]" error-message="Requerido" :error="$v.form.users.$error" @blur="$v.form.users.$touch()"/>
          </div>
        </div>
      </q-list>
    </div>
    <div class="q-px-md q-mb-lg">
      <div class="q-mb-sm">
        <div class="text-h6 text-bold">Infomacion demografica</div>
        <div class="text-grey-8">Dirección de la empresa</div>
      </div>
      <q-list>
        <div>
          <div>País</div>
          <q-select outlined filled v-model="selectPais" :options="paises" @input="form.pais_id = selectPais._id, estados = selectPais.estados" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectPais.$error" @blur="$v.selectPais.$touch()"/>
        </div>
        <div>
          <div>Estado</div>
          <q-select outlined filled v-model="selectEstado" :options="estados" @input="form.estado_id = selectEstado._id, ciudades = selectEstado.ciudades" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectEstado.$error" @blur="$v.selectEstado.$touch()"/>
        </div>
        <div>
          <div>Ciudad</div>
          <q-select outlined filled v-model="selectCiudad" :options="ciudades" @input="form.ciudad_id = selectCiudad._id" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectCiudad.$error" @blur="$v.selectCiudad.$touch()"/>
        </div>
        <div>
          <div>Dirección</div>
          <q-input outlined filled v-model="form.direction" placeholder="Mi direccion #12123" error-message="Este campo es requerido" :error="$v.form.direction.$error" @blur="$v.form.direction.$touch()"/>
        </div>
        <div>
          <div>Código postal</div>
          <q-input outlined filled v-model.number="form.postalCode" placeholder="1023400" type="number" error-message="Este campo es requerido" :error="$v.form.postalCode.$error" @blur="$v.form.postalCode.$touch()"/>
        </div>
      </q-list>
    </div>
    <div class="q-px-md">
      <div class="q-mb-md">
        <div class="text-h6 text-bold">Datos de contacto</div>
        <div class="text-grey-8">Vias de contacto con la empresa</div>
      </div>
      <q-list>
        <div>
          <div>Correo de contacto</div>
          <q-input outlined filled v-model="form.email" placeholder="micorreo@highitservice.com" error-message="Este campo es requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
        </div>
        <div>
          <div>Telefono de contacto</div>
          <q-input outlined filled v-model="form.phone" placeholder="+52 1 55 8403 5917" error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
        </div>
      </q-list>
      <div>
        <div>Foto de perfil</div>
        <div class="column items-center">
          <q-avatar rounded style="height: 200px; width: 100%;" class="q-mb-sm">
            <q-img style="height: 100%;" :src="img || edit ? perfilImg : 'nopublicidad.jpg'">
              <q-file  borderless v-model="img" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%; cursor: pointer;">
                <div class="column items-center justify-center absolute-full" style="height: 150px;">
                  <q-icon name="backup" class="q-mt-xl" size="75px" color="white"/>
                  <div class="text-center text-white text-caption">Toca para selecciona la foto de perfil de la empresa</div>
                </div>
              </q-file>
            </q-img>
          </q-avatar>
          <div v-if="$v.PImg.$error" class="text-negative">La imagen es Requerida</div>
        </div>
      </div>
    </div>
    <div class="column items-center q-pa-lg">
      <q-btn class="q-py-sm" :label="edit ? 'Actualizar empresa' : 'Crear empresa'" color="primary" style="width: 40%;" @click="edit ? updateCompany() : saveCompany()" no-caps/>
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
      img: null,
      perfilImg: '',
      PImg: {},
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
      direction: { required },
      postalCode: { required },
      email: { required, email },
      phone: { required }
    },
    PImg: { required },
    perfilImg: { required },
    selectPais: { required },
    selectEstado: { required },
    selectCiudad: { required }
  },
  mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.edit = true
      this.getCompanyById()
    }
    this.userLogueado()
    this.getPaises()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
          this.getContratos()
        }
      })
    },
    getCompanyById () {
      this.$api.get('company/' + this.id).then(res => {
        if (res) {
          this.form = res
          this.perfilImg = env.apiUrl + 'company_img/' + this.id
        }
      })
    },
    getPaises () {
      this.$q.loading.show()
      this.$api.get('paises').then(res => {
        if (res) {
          this.paises = res
          if (this.edit) {
            this.selectPais = this.paises.filter(v => v._id === this.form.pais_id)[0]
            this.selectEstado = this.selectPais.estados.filter(v => v._id === this.form.estado_id)[0]
            this.selectCiudad = this.selectEstado.ciudades.filter(v => v._id === this.form.ciudad_id)[0]
          }
        }
        this.$q.loading.hide()
      })
    },
    getContratos () {
      if (this.rol === 1) {
        this.$api.get('contratos').then(res => {
          if (res) {
            this.contratos = res
            this.contratos2 = [...this.contratos]
          }
        })
      } else {
        this.$api.get('contratos_by_company/' + this.user.empresa).then(res => {
          if (res) {
            this.contratos = res
            this.contratos2 = [...this.contratos]
          }
        })
      }
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
    perfil_img () {
      this.PImg = this.img
      this.perfilImg = URL.createObjectURL(this.img)
      this.img = null
      if (this.edit) {
        this.form.img = true
      }
    },
    saveCompany () {
      this.$v.$touch()
      if (!this.$v.PImg.$error && !this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Guardando empresa...'
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
              message: 'Empresa guardada correctamente',
              color: 'positive'
            })
            this.$router.push('/empresas')
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    },
    updateCompany () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Actualizando empresa...'
        })
        const formData = new FormData()
        const files = []
        files[0] = this.PImg
        formData.append('PFiles', files[0])
        formData.append('dat', JSON.stringify(this.form))
        this.$api.put('update_company/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'La empresa se actualizo correctamente',
              color: 'positive'
            })
            this.$router.push('/empresas')
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
