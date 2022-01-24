<template>
  <div>
    <div class="q-pa-md">
      <div class="text-h4 text-bold">{{edit ? $t('titulo_moduloEditarConocimiento') : $t('titulo_moduloCrearConocimiento')}}</div>
      <div class="text-grey text-h6">{{edit ? $t('subtitulo_moduloEditarConocimiento') : $t('subtitulo_moduloCrearConocimiento')}}</div>
    </div>

    <div>
      <div class="q-mt-md q-pa-md">
        <div class="text-h6">{{$t('text_datosConocimiento')}}</div>

        <div class="text-subtitle1">{{$t('form_nombre')}}</div>
        <q-input filled v-model="form.name" :error-message="$t('formError_campo')" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>

        <div class="q-mt-sm text-subtitle1">{{$t('form_descripcion')}}</div>
        <q-input v-model="form.descripcion" filled type="textarea" :placeholder="$t('formFormat_descripcion')" :error-message="$t('formError_campo')" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()"/>

        <div v-if="edit" class="q-pa-md row justify-center">
          <q-btn class="q-py-xs" color="primary" text-color="white" :label="$t('accion_guardar') + ' ' + $t('form_conocimiento').toLowerCase()" @click="editar_conocimiento()" style="width:40%"  no-caps/>
        </div>

        <div class="text-h6">{{$t('text_infoPricipal')}}</div>
        <div v-if="!edit || editar">
          <div class="text-subtitle1">{{$t('form_pdf')}}</div>
          <q-avatar rounded style="height: 200px; width: 100%;">
            <q-img src="nopublicidad.jpg" style="height: 100%;" >
              <q-file borderless v-model="Files" multiple append max-files="2" :disable="Files.length >= 2" @input="archivo" accept=".pdf" style="z-index:1; font-size: 0px; width: 100%; height: 100%; cursor: pointer;">
                <div class="column items-center justify-center absolute-full" style="height: 150px;">
                  <q-icon name="backup" class="q-mt-xl" size="75px" :color="!$v.Files.$error ? 'white' : 'negative'"/>
                  <div :class="!$v.Files.$error ? 'text-white' : 'text-negative'" class="text-caption">{{$t('text_intruccionPdf')}}</div>
                </div>
              </q-file>
            </q-img>
          </q-avatar>
        </div>

        <div class="q-mt-sm">
          <div v-if="!edit || editar">
            <div v-for="(item, index) in Files" :key="index" class="q-pa-sm row">
              <q-btn class="q-pr-md q-mt-sm" @click="deleteArc(index)" color="black" icon="delete" style="" flat round />
              <div class="q-mt-md text-subtitle1">{{item.name}}</div>
            </div>
          </div>
          <div v-else class="q-mt-sm column">
            {{$t('text_archivos') + ': ' + form.archivos.length}}
          </div>
        </div>
      </div>

      <div class="q-pa-md row justify-center">
        <q-btn class="q-py-xs" color="primary" text-color="white" :label="edit ? editar ?  $t('accion_guardar') + ' ' + $t('form_archivo').toLowerCase() :  $t('accion_editar') + ' ' + $t('form_archivo').toLowerCase() : $t('accion_crear') + ' ' + $t('form_conocimiento').toLowerCase()" @click="edit ? editar_archivos() : registrar_conocimiento()" style="width:40%" no-caps/>
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
              message: this.$t('formNotif_guardado'),
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
          message: this.$t('formError_datos'),
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
              message: this.$t('formNotif_guardado'),
              color: 'positive'
            })
          }
        })
      } else {
        this.$q.notify({
          message: this.$t('formError_datos'),
          color: 'negative'
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
              message: this.$t('formNotif_guardado'),
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
          message: this.$t('formError_datos'),
          color: 'negative'
        })
      }
    },
    editar_archivos () {
      if (this.editar) {
        this.confirmarEdicion()
      } else {
        this.$q.dialog({
          title: this.$t('titulo_dialogConfir'),
          message: this.$t('text_dialogConfirPdf'),
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
