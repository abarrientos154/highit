<template>
  <div>
    <div>
      <Tabla v-if="listado" titulo="Listado de empresas" :columns="column" route="companys" :route_id="rol === 2 ? user.empresa : null" :btnNew="true"/>
      <!-- <q-markup-table bordered>
        <thead>
          <tr>
            <th colspan="8">
              <div class="column text-left">
                <div class="text-h4 text-bold">Listado de empresas</div>
                <div v-if="!empresas.length" class="text-secondary">No hay empresas registradas</div>
              </div>
            </th>
          </tr>
          <tr>
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
            <th>
              <div class="text-subtitle1 text-bold">Acción</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, index) in empresas" :key="index">
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
            <td>
              <div class="row justify-center no-wrap">
                <q-btn flat color="primary" icon="delete" size="md" round dense @click="deleteCompany(company._id)"/>
                <q-btn flat color="primary" icon="edit" size="md" round dense @click="$router.push('/editar_empresa/' + company._id)"/>
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table> -->
    </div>
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" size="20px" no-caps @click="$router.push('/companys/form')"/>
    </q-page-sticky> -->
  </div>
</template>

<script>
import Tabla from '../components/TableActions'
export default {
  components: { Tabla },
  data () {
    return {
      rol: null,
      user: {},
      empresas: [],
      listado: false,
      column: [
        { name: 'Profile', label: 'Perfil', field: 'Profile', filter_type: 'false', align: 'center' },
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'email', field: 'email', label: 'Correo', align: 'left' },
        { name: 'phone', field: 'phone', label: 'Telefono', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ]
    }
  },
  mounted () {
    this.userLogueado()
  },
  methods: {
    userLogueado () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.rol = res.roles[0]
          this.listado = true
          console.log(this.rol)
          // this.getEmpresas()
        }
      })
    }/* ,
    getEmpresas () {
      this.baseu = env.apiUrl + 'company_img/'
      if (this.rol === 1) {
        this.$api.get('companys').then(res => {
          if (res) {
            this.empresas = res
            // console.log(this.empresas)
          }
        })
      } else {
        this.$api.get('companys_by_company/' + this.user.empresa).then(res => {
          if (res) {
            this.empresas = res
            // console.log(this.empresas)
          }
        })
      }
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
    } */
  }
}
</script>
