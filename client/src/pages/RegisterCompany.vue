<template>
  <div>
    <div class="row">
      <q-separator vertical class="bg-grey-7"/>
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h4 text-bold">NUEVA EMPRESA</div>
        <div class="text-grey-8 text-subtitle1">Creacion de nuevas empresas</div>
      </div>
      <q-separator vertical class="bg-grey-7"/>
    </div>
    <q-separator class="bg-grey-7 q-mb-lg"/>
    <div class="q-mb-lg">
      <div class="q-mb-md q-px-md">
        <div class="text-h6 text-bold">Infomación empresa</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Nombre comercial</div>
          <q-input dense outlined filled v-model="form.name" placeholder="Highit Service" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Razón social</div>
          <q-input dense outlined filled v-model="form.businessName" placeholder="Highit Service SpA" error-message="Este campo es requerido" :error="$v.form.businessName.$error" @blur="$v.form.businessName.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Numero identificador</div>
          <q-input dense outlined filled v-model="form.numIdet" placeholder="J30583h375" error-message="Este campo es requerido" :error="$v.form.numIdet.$error" @blur="$v.form.numIdet.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Tipo de contrato</div>
          <q-select outlined dense filled v-model="form.typeContract" :options="contratos" option-label="name" map-options error-message="Este campo es requerido" :error="$v.form.typeContract.$error" @blur="$v.form.typeContract.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Fecha inicio de contrato</div>
          <q-input dense outlined filled v-model="form.dateBegin" type="date" error-message="Este campo es requerido" :error="$v.form.dateBegin.$error" @blur="$v.form.dateBegin.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Fecha termino de contrato</div>
          <q-input dense outlined filled v-model="form.dateEnd" type="date" error-message="Este campo es requerido" :error="$v.form.dateEnd.$error" @blur="$v.form.dateEnd.$touch()"/>
        </div>
      </q-list>
    </div>
    <div>
      <div class="q-mb-sm q-px-md">
        <div class="text-h6 text-bold">Infomacion demografica</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>País</div>
          <q-select outlined dense filled v-model="selectPais" :options="paises" @input="form.pais_id = selectPais._id, estados = selectPais.estados" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectPais.$error" @blur="$v.selectPais.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Estado</div>
          <q-select outlined dense filled v-model="selectEstado" :options="estados" @input="form.estado_id = selectEstado._id, ciudades = selectEstado.ciudades" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectEstado.$error" @blur="$v.selectEstado.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Ciudad</div>
          <q-select outlined dense filled v-model="selectCiudad" :options="ciudades" @input="form.ciudad_id = selectCiudad._id" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectCiudad.$error" @blur="$v.selectCiudad.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Dirección</div>
          <q-input dense outlined filled v-model="form.direction" placeholder="Mi direccion #12123" error-message="Este campo es requerido" :error="$v.form.direction.$error" @blur="$v.form.direction.$touch()"/>
        </div>
        <div class="q-mx-md">
          <div>Código postal</div>
          <q-input dense outlined filled v-model.number="form.postalCode" placeholder="1023400" type="number" error-message="Este campo es requerido" :error="$v.form.postalCode.$error" @blur="$v.form.postalCode.$touch()"/>
        </div>
      </q-list>
    </div>
    <div>
      <div class="q-mb-md q-px-md">
        <div class="text-h6 text-bold">Infomaciones varias</div>
        <div class="text-grey-8">Informacion oficial de la empresa</div>
      </div>
      <q-list>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Correo de contacto</div>
          <q-input dense outlined filled v-model="form.email" placeholder="micorreo@highitservice.com" error-message="Este campo es requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-px-md">
          <div>Telefono de contacto</div>
          <q-input dense outlined filled v-model="form.phone" placeholder="+52 1 55 8403 5917" error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
        </div>
      </q-list>
      <div class="q-px-md">
        <div>Foto de perfil</div>
        <div class="column items-center">
          <q-avatar rounded style="height: 150px; width: 100%;" class="bg-grey q-mb-sm">
            <q-img style="height: 100%;" :src="perfilImg">
              <q-file  borderless v-model="img" class="button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;">
                <q-icon name="backup" class="absolute-center" size="70px" color="white" />
              </q-file>
            </q-img>
          </q-avatar>
          <div v-if="$v.PImg.$error" class="text-negative">La imagen es Requerida</div>
        </div>
      </div>
    </div>
    <div class="column items-center q-pa-lg">
      <q-btn class="q-py-sm" label="Crear empresa" color="primary" style="width: 85%;" @click="saveCompany()" no-caps/>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
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
    selectPais: { required },
    selectEstado: { required },
    selectCiudad: { required }
  },
  mounted () {
    this.getPaises()
  },
  methods: {
    getPaises () {
      this.$api.get('paises').then(res => {
        if (res) {
          this.paises = res
          console.log(this.paises)
        }
      })
    },
    perfil_img () {
      this.PImg = this.img
      this.perfilImg = URL.createObjectURL(this.img)
      this.img = null
    },
    saveCompany () {
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.selectPais.$error && !this.$v.selectEstado.$error && !this.$v.selectCiudad.$error && !this.$v.PImg.$error) {
        this.$q.loading.show({
          message: 'Guardando...'
        })
        var formData = new FormData()
        var files = []
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
