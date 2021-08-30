<template>
  <div>
    <Tabla titulo="Listado de Usuarios" :columns="column" route="user" :btnNew="true" :selectBtn="true" />
    <!--- <div class="q-pa-md column items-center justify-center">
      <div class="q-mt-md text-h6 text-grey">Listado de usuarios</div>
      <q-btn color="white" text-color="black" label="Standard" @click="$router.push('/registros')"/>
        <q-card style="width:100%">
            <q-list separator>
              <q-item v-for="(item, index) in lista" :key="index" class="text-grey text-bold">
                <div class="row justify-center items-center" style="width: 100%" >
                  <q-item-section>{{index+1}} {{item.name}}</q-item-section>
                  <q-item-section>{{item.last_name}}</q-item-section>
                </div>
                  <div class="justify-center items-center" style="width:100px">
                    <q-btn flat color="grey" icon="edit" round dense @click="$router.push('/User_edit/' + item._id)" />
                    <q-btn flat color="grey" icon="delete" round dense @click="showModalEliminar = true, id_user = item._id"/>
                  </div>
              </q-item>
              <div v-if="lista.length < 1" class="row justify-center text-caption q-mt-md">No hay Usuarios actualmente</div>
            </q-list>
        </q-card>
    </div>
    <q-dialog v-model="showModalEliminar">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="text-h6">¿Estas seguro de eliminar el Usuario?</div>
            <q-btn color="red" icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="red" icon="delete" label="Eliminar" push @click="eliminar_usuario(id_user), showModalEliminar = false" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </div>
</template>
<script>
import Tabla from '../../components/TableActions'
// import CodeTabs from '../../components/CodeTabs'
export default {
  components: { Tabla },
  data () {
    return {
      lista: {},
      showModalEliminar: false,
      column: [
        { name: 'name', field: 'name', label: 'Nombre', align: 'left' },
        { name: 'last_name', field: 'last_name', label: 'Apellido', align: 'left' },
        { name: 'email', field: 'email', label: 'Correo', align: 'left' },
        { name: 'Action', label: 'Acciones', field: 'Action', sortable: false, filter_type: 'false', align: 'center' }
      ]
    }
  }
}
</script>
