<template>
  <div>
    <div class="q-pa-sm">
      <q-markup-table bordered>
        <thead>
          <tr>
            <th>
              <div class="text-subtitle1 text-bold">Acción</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Perfil</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Nombre</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Contrato</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Fecha inicio</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Fecha fin</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Correo</div>
            </th>
            <th>
              <div class="text-subtitle1 text-bold">Telefono</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, index) in empresas" :key="index">
            <td>
              <div class="row justify-center no-wrap">
                <q-btn flat color="primary" icon="delete" size="md" round dense @click="deleteCompany(company._id)"/>
                <q-btn flat color="primary" icon="edit" size="md" round dense @click="$router.push('/editar_empresa/' + company._id)"/>
              </div>
            </td>
            <td>
              <q-avatar>
                <q-img :src="baseu + company._id" class="full-height"/>
              </q-avatar>
            </td>
            <td>
              <div class="text-subtitle1">{{company.name}}</div>
            </td>
            <td>
              <div class="text-subtitle2 text-secondary">{{contratos.filter(v => v._id === company.typeContract)[0].contrato}}</div>
            </td>
            <td>
              <div class="text-subtitle2 text-secondary">{{company.dateBegin}}</div>
            </td>
            <td>
              <div class="text-subtitle2 text-secondary">{{company.dateEnd}}</div>
            </td>
            <td>
              <div class="text-secondary">{{company.email}}</div>
            </td>
            <td>
              <div class="text-secondary">{{company.phone}}</div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      baseu: '',
      empresas: [],
      contratos: []
    }
  },
  mounted () {
    this.getEmpresas()
    this.getContratos()
  },
  methods: {
    getEmpresas () {
      this.$api.get('companys').then(res => {
        if (res) {
          this.empresas = res
          this.baseu = env.apiUrl + 'company_img/'
          // console.log(this.empresas)
        }
      })
    },
    getContratos () {
      this.$api.get('contratos').then(res => {
        if (res) {
          this.contratos = res
          // console.log(this.contratos)
        }
      })
    },
    deleteCompany (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar esta empresa?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Eliminando empresa...'
        })
        this.$api.delete('delete_company/' + id).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Empresa eliminada correctamente',
              color: 'positive'
            })
            this.getEmpresas()
          }
          this.$q.loading.hide()
        })
      }).onCancel(() => {
        // cancel
      })
    }
  }
}
</script>
