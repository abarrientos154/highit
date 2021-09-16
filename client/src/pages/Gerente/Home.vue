<template>
  <div>
    <div class="row">
      <q-separator vertical class="bg-grey-7"/>
      <div class="q-pb-xl q-px-md q-pt-md column items-end col">
        <div class="text-h3 text-bold">HOME PRINCIPAL</div>
        <div class="text-grey-8 text-h6">Pagina de inicio del sitio</div>
      </div>
      <q-separator vertical class="bg-grey-7"/>
    </div>
    <q-separator class="bg-grey-7 q-mb-lg"/>
    <div class="q-mb-lg" v-if="info">
      <div class="q-mb-sm q-px-md">
        <div class="text-h5 text-bold">Gestion de actividades</div>
        <div class="text-subtitle1 text-grey-8">Indicadores asignados</div>
      </div>
      <q-list class="q-px-lg">
        <q-card class="q-mb-md" v-for="(item, index) in gestion" :key="index" style="width: 100%; border-radius: 20px;">
          <q-item>
            <q-item-section avatar>
              <q-avatar :icon="item.icon" font-size="95px" size="100px"/>
            </q-item-section>
            <q-item-section>
              <div class="row items-center justify-between no-wrap">
                <q-item-label class="text-bold text-h6 text-no-wrap">{{item.name}}</q-item-label>
                <q-btn dense flat round icon="pending" @click="gestionar(item)"/>
              </div>
              <q-item-label class="text-subtitle1">Actividades realizadas:</q-item-label>
              <q-item-label class="text-h3 text-grey-7">{{item.cantidad}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </q-list>
    </div>

    <q-dialog v-model="gtn">
      <q-card class="column items-center no-wrap" style="width: 600px; border-radius: 10px;">
        <div style="width: 80%">
          <div class="q-my-lg">
            <q-item>
              <q-item-section avatar>
                <q-icon :name="datos.icon" size="100px"/>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-h6">{{datos.name}}</q-item-label>
                <q-item-label class="text-subtitle1">Actividades realizadas:</q-item-label>
                <q-item-label class="text-h3 text-grey-7">{{datos.cantidad}}</q-item-label>
              </q-item-section>
            </q-item>
            <div v-if="datos.id === 8">
              <div class="q-mb-md">
                <div class="text-bold text-subtitle1 q-mb-sm">Selecciona un Consultor</div>
                <q-select dense filled v-model="consultor" :options="consultores" map-options option-label="name" emit-value option-value="_id" @input="validarFecha(3)">
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <q-item-section avatar>
                        <q-avatar size="35px">
                          <q-img :src="baseu + scope.opt._id" class="full-height"/>
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.name"/>
                        <q-item-label class="text-grey-7">{{scope.opt.email}}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="q-mb-md">
                <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un estado de solicitudes</div>
                <q-select dense filled v-model="status" :options="datos.status" map-options option-label="name" emit-value option-value="id" @input="validarFecha(2)"/>
              </div>
            </div>
            <div v-else class="q-mb-md">
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un departamento</div>
              <q-select dense filled v-model="depart" :options="departamentos" map-options option-label="name" emit-value option-value="_id" @input="validarFecha(1)"/>
            </div>
            <div class="q-mb-md">
              <div class="text-bold text-subtitle1">Tipo de gestion</div>
              <div class="row justify-between">
                <q-radio v-model="type" :val="1" label="Diaria" @input="selecType()"/>
                <q-radio v-model="type" :val="2" label="Semanal" @input="selecType()"/>
                <q-radio v-model="type" :val="3" label="Mensual" @input="selecType()"/>
                <q-radio v-model="type" :val="4" label="Anual" @input="selecType()"/>
              </div>
            </div>
            <div v-if="type === 1">
              <div class="text-bold text-subtitle1 q-mb-sm">Ingresar fecha</div>
              <q-input dense filled readonly v-model="fecha" placeholder="AAAA-MM-DD" @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" mask="YYYY-MM-DD" @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div v-if="type === 2">
              <div class="text-bold text-subtitle1 q-mb-sm">Seleccione un rango de 7 dias o menos</div>
              <q-input  dense filled readonly v-model="semana" placeholder="AAAA-MM-DD ... AAAA-MM-DD" @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" mask="YYYY-MM-DD" range @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div v-if="type === 3 || type === 4">
              <div class="text-bold text-subtitle1 q-mb-sm">{{type === 4 ? 'Seleccione un año' : 'Seleccione un mes'}}</div>
              <q-input dense filled readonly v-model="fecha" :placeholder="type == 4 ? 'AAAA' : 'MM'" :mask="type == 4 ? '####' : '##'"  @click="$refs.qDateProxy.show()">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fecha" :mask="type == 4 ? 'YYYY' : 'MM'" minimal emit-immediately :default-view="type == 4 ? 'Years' : 'Months'" @input="validarFecha()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import * as moment from 'moment'
import env from '../../env'
export default {
  data () {
    return {
      type: 0,
      info: false,
      datos: {},
      gtn: false,
      val: false,
      fecha: null,
      semana: '',
      user: {},
      gestion: [],
      categorias: [],
      departamentos: [],
      consultores: [],
      depart: null,
      status: null,
      consultor: null
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
          this.getGestion()
          this.getCategorias()
          this.getDepartamentos()
          this.getConsultores()
        }
      })
    },
    getGestion () {
      this.$api.get('gestion').then(res => {
        if (res) {
          for (const i of this.user.manage) {
            this.gestion.push(res.filter(v => v._id === i)[0])
          }
          this.getActividades()
        }
      })
    },
    getActividades () {
      this.$api.get('solicitudes_company/' + this.user.empresa).then(res => {
        if (res) {
          for (const i of this.gestion) {
            i.actividades = []
            if (i.id >= 7) {
              for (const j of i.status) {
                const actividades = res.filter(v => v.status === j.id)
                for (const v of actividades) {
                  i.actividades.push(v)
                }
              }
            } else {
              i.actividades = res.filter(v => v.status === i.status)
            }
            i.aux = i.actividades
            i.cantidad = i.actividades.length
          }
          this.info = true
        }
      })
    },
    getCategorias () {
      this.$api.get('categorias/' + this.user.empresa).then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    getDepartamentos () {
      this.$api.get('departments/' + this.user.empresa).then(res => {
        if (res) {
          this.departamentos = res
        }
      })
    },
    getConsultores () {
      this.$api.get('user_consultor/' + this.user.empresa).then(res => {
        if (res) {
          this.consultores = res
          this.baseu = env.apiUrl + 'perfil_img/'
        }
      })
    },
    gestionar (itm) {
      this.datos = { ...itm }
      this.type = 1
      this.semana = ''
      this.depart = null
      this.fecha = null
      this.consultor = null
      this.status = null
      this.gtn = !this.gtn
    },
    selecType () {
      this.semana = ''
      this.fecha = null
      this.datos.cantidad = this.datos.actividades.length
    },
    validarFecha (filtro) {
      const actividades = []
      if (filtro === 1) {
        for (const i of this.datos.actividades) {
          for (const j of this.categorias.filter(v => v.departamento === this.depart)) {
            if (i.category === j._id) {
              actividades.push(i)
            }
          }
        }
        this.datos.aux = actividades
        this.datos.cantidad = actividades.length
        this.semana = ''
        this.fecha = null
      } else if (filtro === 2) {
        this.datos.aux = this.datos.actividades.filter(v => this.consultor === null ? v.status === this.status : v.status === this.status && v.consultor_id === this.consultor)
        this.datos.cantidad = this.datos.actividades.filter(v => this.consultor === null ? v.status === this.status : v.status === this.status && v.consultor_id === this.consultor).length
        this.fecha = null
        this.semana = ''
      } else if (filtro === 3) {
        this.datos.aux = this.datos.actividades.filter(v => this.status === null ? v.consultor_id === this.consultor : v.consultor_id === this.consultor && v.status === this.status)
        this.datos.cantidad = this.datos.actividades.filter(v => this.status === null ? v.consultor_id === this.consultor : v.consultor_id === this.consultor && v.status === this.status).length
        this.fecha = null
        this.semana = ''
      } else {
        this.$refs.qDateProxy.hide()
        if (this.type === 1) {
          this.val = moment(moment().format('YYYY-MM-DD')).isSameOrAfter(this.fecha)
        } else if (this.type === 2) {
          this.semana = this.fecha.from + ' ... ' + this.fecha.to
          const dias = moment(this.fecha.to).diff(this.fecha.from, 'days') + 1
          if (dias <= 7) {
            this.val = moment(moment().format('YYYY-MM-DD')).isSameOrAfter(this.fecha.to)
          } else { this.val = false }
        } else if (this.type === 3 || this.type === 4) {
          this.val = moment(moment().format(this.type === 3 ? 'MM' : 'YYYY')).isSameOrAfter(this.fecha)
        }
        if (this.val) {
          for (const i of this.datos.aux) {
            if (this.type === 2) {
              if (moment(i.dateSlt).isBetween(this.fecha.from, this.fecha.to) || moment(i.dateSlt).isSame(this.fecha.from) || moment(i.dateSlt).isSame(this.fecha.to)) {
                actividades.push(i)
              }
            } else {
              if (moment(moment(i.dateSlt).format(this.type === 1 ? 'YYYY-MM-DD' : this.type === 3 ? 'MM' : 'YYYY')).isSame(this.fecha)) {
                actividades.push(i)
              }
            }
          }
          this.datos.cantidad = actividades.length
        } else {
          this.$q.notify({
            message: 'Debe ingresar una fecha valida',
            color: 'negative'
          })
        }
      }
    }
  }
}
</script>
