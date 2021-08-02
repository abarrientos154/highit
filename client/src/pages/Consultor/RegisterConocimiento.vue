<template>
  <div>
    <div class="q-pa-md column items-center justify-center">
      <div style="width:100%">
        <q-card class="" style="width:100%; height:150px">
          <q-card-section>
            <div class="text-h3 text-right text-bold">Nuevo Conocimiento</div>
            <div class="text-h5 text-right">Ingresa la informacion del contenido</div>
          </q-card-section>
        </q-card>
          <q-card>
          <div class="text-h6">Informacion general</div>
          <div class="text-h7">ingresa la informacion del conocimiento</div>

            <div class="q-pa-md">
              <div class="q-mt-md text-subtitle1">Nombre de conocimiento</div>
              <q-input filled v-model="form.name" placeholder="Nombre del conocimiento"
              error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

              <div class="q-mt-md text-subtitle1">Descripcion</div>
              <q-input v-model="form.descripcion" filled type="textarea" placeholder="Mi descripcion"
              error-message="Requerido" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()"/>

                <div class="q-mt-md text-subtitle1">informacion principal PDF</div>
                  <q-img :src="'nopublicidad.jpg'" style="height: 200px; width: 100%" >
                      <div class="column justify-center items-center bg-transparent absolute-center" style="width:100%">
                          <q-avatar size="80px">
                            <div style="z-index:1">
                              <q-file borderless v-model="Files" multiple append max-files="2" :disable="Files.length >= 2" class="button-camera" @input="archivo" accept=".pdf" >
                                <q-icon name="backup" class="absolute-center" size="30px" color="white" />
                              </q-file>
                            </div>
                          </q-avatar>
                          <div :class="!$v.Files.$error ? 'text-black' : 'text-negative'" class="q-mt-sm text-caption"> Puedes presionar 2 veces para subir 2 archivos </div>
                      </div>
                  </q-img>

                  <div class="">
                  <div class="q-mt-md text-subtitle1">Listado de los archivos cargados</div>
                  <div style="width: 100%" class="q-mt-sm column">
                    <q-card flat v-for="(item, index) in Files" :key="index" class="q-pa-sm">
                      <div class="row">
                        <q-btn class="q-pr-md q-mt-sm" @click="deleteArc(index)" color="black" icon="delete" style="" flat round />
                        <div class="q-mt-md text-subtitle1">{{item.name}}</div>
                      </div>
                    </q-card>
                  </div>
                </div>
            </div>
            <div class="q-pa-md column items-center justify-center">
              <q-btn color="primary" text-color="white" label="Guardar" @click="registrar_conocimiento()" style="width:40%" />
            </div>
          </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      files: [],
      Files: [],
      areas: [],
      datos: [],
      user: {},
      archivoCono: []
    }
  },
  validations: {
    form: {
      name: { required },
      descripcion: { required }
    },
    Files: { required }

  },
  methods: {
    async registrar_conocimiento () {
      this.$v.form.$touch()

      console.log(this.form, 'llegae')
      if (this.Files.length >= 1 && !this.$v.form.$error && !this.$v.Files.$error) {
        this.form.departamento = this.user.departamento
        this.form.area = this.user.area
        this.form.cantidadArchivos = this.Files.length
        const formData = new FormData()
        for (let i = 0; i < this.form.cantidadArchivos; i++) {
          console.log(this.Files[i], 'archivo ', i)
          formData.append('archivos' + i, this.Files[i])
        }
        formData.append('dat', JSON.stringify(this.form))
        await this.$api.post('conocimientos', formData, {
          headers: { 'Content-Type': undefined }
        }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Conocimiento agregado con exito',
              color: 'positive'
            })
            this.form = {}
            this.Files = []
            this.$v.form.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          console.log(this.user, 'user')
        }
      })
    },
    archivo () {
      /* var img = ''
      var cc = {}
      if (this.Files.length > 0) {
        cc = this.Files[this.Files.length - 1]
        img = URL.createObjectURL(cc)
        this.archivoCono.push(img)
      } */
    },
    deleteArc (ind) {
      this.Files.splice(ind, 1)
      this.archivoCono.splice(ind, 1)
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
</style>
