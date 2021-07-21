<template>
  <div>
    <div class="row">
      <q-separator vertical class="bg-grey-7"/>
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">{{edit ? 'ACTUALIZA EMPRESA' : 'NUEVA EMPRESA'}}</div>
        <div class="text-grey-8 text-h6">{{edit ? 'Modificar datos de la empresa' : 'Creacion de nuevas empresas'}}</div>
      </div>
      <q-separator vertical class="bg-grey-7"/>
    </div>
    <q-separator class="bg-grey-7 q-mb-lg"/>
    <div class="q-mb-lg q-px-md">
      <div class="q-mb-md">
        <div class="text-h6 text-bold">Infomación empresa</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div>
          <div>Nombre comercial</div>
          <q-input dense outlined filled v-model="form.name" placeholder="Highit Service" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
        </div>
        <div>
          <div>Razón social</div>
          <q-input dense outlined filled v-model="form.businessName" placeholder="Highit Service SpA" error-message="Este campo es requerido" :error="$v.form.businessName.$error" @blur="$v.form.businessName.$touch()"/>
        </div>
        <div>
          <div>Numero identificador</div>
          <q-input dense outlined filled v-model="form.numIdet" placeholder="J30583h375" error-message="Este campo es requerido" :error="$v.form.numIdet.$error" @blur="$v.form.numIdet.$touch()"/>
        </div>
        <div>
          <div>Tipo de contrato</div>
          <q-select outlined dense filled v-model="form.typeContract" :options="contratos" option-label="contrato" option-value="_id" map-options emit-value error-message="Este campo es requerido" :error="$v.form.typeContract.$error" @blur="$v.form.typeContract.$touch()"/>
        </div>
        <div>
          <div>Fecha inicio de contrato</div>
          <q-input dense outlined filled readonly v-model="form.dateBegin" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.dateBegin.$error" @blur="$v.form.dateBegin.$touch()" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateBegin" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <div>Fecha termino de contrato</div>
          <q-input dense outlined filled readonly v-model="form.dateEnd" placeholder="dd/mm/aaaa" error-message="Este campo es requerido" :error="$v.form.dateEnd.$error" @blur="$v.form.dateEnd.$touch()" @click="$refs.qDateProxy.show()">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.dateEnd" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
          </q-input>
        </div>
      </q-list>
    </div>
    <div class="q-px-md">
      <div class="q-mb-sm">
        <div class="text-h6 text-bold">Infomacion demografica</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div>
          <div>País</div>
          <q-select outlined dense filled v-model="selectPais" :options="paises" @input="form.pais_id = selectPais._id, estados = selectPais.estados" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectPais.$error" @blur="$v.selectPais.$touch()"/>
        </div>
        <div>
          <div>Estado</div>
          <q-select outlined dense filled v-model="selectEstado" :options="estados" @input="form.estado_id = selectEstado._id, ciudades = selectEstado.ciudades" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectEstado.$error" @blur="$v.selectEstado.$touch()"/>
        </div>
        <div>
          <div>Ciudad</div>
          <q-select outlined dense filled v-model="selectCiudad" :options="ciudades" @input="form.ciudad_id = selectCiudad._id" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectCiudad.$error" @blur="$v.selectCiudad.$touch()"/>
        </div>
        <div>
          <div>Dirección</div>
          <q-input dense outlined filled v-model="form.direction" placeholder="Mi direccion #12123" error-message="Este campo es requerido" :error="$v.form.direction.$error" @blur="$v.form.direction.$touch()"/>
        </div>
        <div>
          <div>Código postal</div>
          <q-input dense outlined filled v-model.number="form.postalCode" placeholder="1023400" type="number" error-message="Este campo es requerido" :error="$v.form.postalCode.$error" @blur="$v.form.postalCode.$touch()"/>
        </div>
      </q-list>
    </div>
    <div class="q-px-md">
      <div class="q-mb-md">
        <div class="text-h6 text-bold">Infomaciones varias</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div>
          <div>Correo de contacto</div>
          <q-input dense outlined filled v-model="form.email" placeholder="micorreo@highitservice.com" error-message="Este campo es requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
        </div>
        <div>
          <div>Telefono de contacto</div>
          <q-input dense outlined filled v-model="form.phone" placeholder="+52 1 55 8403 5917" error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
        </div>
      </q-list>
      <div>
        <div>Foto de perfil</div>
        <div class="column items-center">
          <q-avatar rounded style="height: 150px; width: 100%;" class="bg-grey-5 q-mb-sm">
            <q-img style="height: 100%;" :src="perfilImg">
              <q-file  borderless v-model="img" class="button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;">
                <div class="column items-center justify-center absolute-full" style="height: 150px;">
                  <q-icon name="backup" class="" size="75px" color="grey-6" />
                  <div class="text-center text-grey-6 text-caption">Toca para selecciona la foto de perfil de la empresa</div>
                </div>
              </q-file>
            </q-img>
          </q-avatar>
          <div v-if="$v.PImg.$error" class="text-negative">La imagen es Requerida</div>
        </div>
      </div>
    </div>
    <div class="column items-center q-pa-lg">
      <q-btn class="q-py-sm" :label="edit ? 'Actualizar empresa' : 'Crear empresa'" color="primary" style="width: 85%;" @click="edit ? updateCompany() : saveCompany()" no-caps/>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
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
      contratos: []
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
      this.$api.get('paises').then(res => {
        if (res) {
          this.paises = res
          if (this.edit) {
            this.selectPais = this.paises.filter(v => v._id === this.form.pais_id)[0]
            this.selectEstado = this.selectPais.estados.filter(v => v._id === this.form.estado_id)[0]
            this.selectCiudad = this.selectEstado.ciudades.filter(v => v._id === this.form.ciudad_id)[0]
          }
          // console.log(this.paises)
        }
      })
    },
    getContratos () {
      if (this.rol === 1) {
        this.$api.get('contratos').then(res => {
          if (res) {
            this.contratos = res
          }
        })
      } else {
        this.$api.get('contratos_by_company/' + this.user.empresa).then(res => {
          if (res) {
            this.contratos = res
          }
        })
      }
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
      // console.log(this.form)
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Guardando empresa...'
        })
        this.form.status = this.rol
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
      this.$v.form.$touch()
      // console.log(this.form)
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
