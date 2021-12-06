<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{edit ? 'EDICIÓN DE CONOCIMIENTO' : 'NUEVO CONOCIMIENTO'}}</div>
      <div class="text-grey text-h6">{{edit ? 'Modificar datos del conocimiento' : 'Ingresa la informacion del contenido'}}</div>
    </div>

    <div>
      <div class="q-mt-md q-pa-md">
        <div class="text-h6">Informacion general</div>

        <div class="text-subtitle1">Nombre de conocimiento</div>
        <q-input filled v-model="form.name" placeholder="Nombre del conocimiento" error-message="Requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

        <div class="q-mt-sm text-subtitle1">Descripcion</div>
        <q-input v-model="form.descripcion" filled type="textarea" placeholder="Mi descripcion" error-message="Requerido" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()"/>

        <div v-if="edit" class="q-pa-md row justify-center">
          <q-btn class="q-py-xs" color="primary" text-color="white" label="Actualizar conocimiento" @click="editar_conocimiento()" style="width:40%"  no-caps/>
        </div>

        <div class="text-h6">Informacion principal</div>
        <div v-if="!edit || editar">
          <div class="text-subtitle1">Ingresar archivo PDF</div>
          <q-avatar rounded style="height: 200px; width: 100%;">
            <q-img src="nopublicidad.jpg" style="height: 100%;" >
              <q-file borderless v-model="Files" multiple append max-files="2" :disable="Files.length >= 2" @input="archivo" accept=".pdf" style="z-index:1; font-size: 0px; width: 100%; height: 100%; cursor: pointer;">
                <div class="column items-center justify-center absolute-full" style="height: 150px;">
                  <q-icon name="backup" class="q-mt-xl" size="75px" :color="!$v.Files.$error ? 'white' : 'negative'"/>
                  <div :class="!$v.Files.$error ? 'text-white' : 'text-negative'" class="text-caption">Puedes presionar 2 veces para subir 2 archivos </div>
                </div>
              </q-file>
            </q-img>
          </q-avatar>
        </div>

        <div>
          <div class="q-mt-md text-subtitle1">Archivos cargados</div>
          <div class="q-mt-sm" v-if="!edit || editar">
            <div v-for="(item, index) in Files" :key="index" class="q-pa-sm row">
              <q-btn class="q-pr-md q-mt-sm" @click="deleteArc(index)" color="black" icon="delete" style="" flat round />
              <div class="q-mt-md text-subtitle1">{{item.name}}</div>
            </div>
          </div>
          <div v-else class="q-mt-sm column">
            Tienes {{form.archivos.length}} archivos.
          </div>
        </div>
      </div>

      <div class="q-pa-md row justify-center">
        <q-btn class="q-py-xs" color="primary" text-color="white" :label="edit ? editar ? 'Actualizar archivos' : 'Editar archivos' : 'Crear conocimiento'" @click="edit ? editar_archivos() : registrar_conocimiento()" style="width:40%" no-caps/>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      id: null,
      edit: false,
      editar: false,
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
  mounted () {
    this.userLogueado()
    if (this.$route.params.id) { this.obtener_datos(this.$route.params.id) }
  },
  methods: {
    userLogueado () {
      this.$q.loading.show()
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
        }
        this.$q.loading.hide()
      })
    },
    async obtener_datos (id) {
      this.$q.loading.show()
      await this.$api.get('conocimientos/' + id).then(res => {
        if (res) {
          this.id = id
          this.edit = true
          this.form = res
        }
        this.$q.loading.hide()
      })
    },
    async registrar_conocimiento () {
      this.$v.form.$touch()
      this.$v.Files.$touch()
      if (this.Files.length >= 1 && !this.$v.form.$error && !this.$v.Files.$error) {
        this.form.departamento = this.user.departamento
        this.form.area = this.user.area
        this.form.cantidadArchivos = this.Files.length
        const formData = new FormData()
        for (let i = 0; i < this.form.cantidadArchivos; i++) {
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
            this.$v.Files.$reset()
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
    async editar_conocimiento () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        await this.$api.put('edit_conocimiento/' + this.id, this.form).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'Informacion actualizada con exito.',
              color: 'positive'
            })
          } else {
            this.$q.notify({
              message: 'Ocurrio un error al actualizar',
              color: 'negative'
            })
          }
        })
      }
    },
    async confirmarEdicion () {
      if (this.Files.length >= 1) {
        const form = {
          cantidadArchivos: this.Files.length
        }
        const formData = new FormData()
        for (let i = 0; i < form.cantidadArchivos; i++) {
          formData.append('archivos' + i, this.Files[i])
        }
        formData.append('dat', JSON.stringify(form))
        await this.$api.post('edit_archivos_conocimiento/' + this.id, formData, {
          headers: { 'Content-Type': undefined }
        }).then(res => {
          this.$q.loading.hide()
          if (res) {
            this.$q.notify({
              message: 'documentos actualizados con exito',
              color: 'positive'
            })
            // this.form = {}
            this.Files = []
            this.editar = false
            // this.$v.form.$reset()
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan archivos por subir',
          color: 'negative'
        })
      }
    },
    editar_archivos () {
      if (this.editar) {
        this.confirmarEdicion()
      } else {
        this.$q.dialog({
          title: '¡Atención!',
          message: '¿Esta seguro editar tus archivos, al aceptar se eliminaran los actuales?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.editar = true
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }
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
  }
}
</script>
<style lang="scss" scoped>
.button-camera {
  z-index: 1;
  font-size: 0px;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
</style>
