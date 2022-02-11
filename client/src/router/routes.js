
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // User 01
      { path: '/inicio_user01', component: () => import('pages/User01/Home.vue'), meta: { permission: 1 } },
      // User 02
      { path: '/inicio_user02', component: () => import('pages/User02/Home.vue'), meta: { permission: 2 } },
      { path: '/organigrama', component: () => import('pages/User02/OrganizationChart.vue'), meta: { permission: 2 } },
      { path: '/categorias', component: () => import('pages/User02/Categorias.vue'), meta: { permission: 2 } },
      { path: '/equipos/form', component: () => import('pages/User02/RegisterEquipment.vue'), meta: { permission: 2 } },
      { path: '/equipos/form/:id', component: () => import('pages/User02/RegisterEquipment.vue'), meta: { permission: 2 } },
      // Gerente
      { path: '/inicio_gerente', component: () => import('pages/Gerente/Home.vue'), meta: { permission: 7 } },
      { path: '/indicadores', component: () => import('pages/Gerente/Indicadores.vue'), meta: { permission: 7 } },
      // Consultor Administrador
      { path: '/inicio_consultor_admin', component: () => import('pages/ConsultorAdmin/Home.vue'), meta: { permission: 5 } },
      { path: '/consultores', component: () => import('pages/ConsultorAdmin/ListadoConsultores.vue'), meta: { permission: 5 } },
      { path: '/atividades_consultor', component: () => import('pages/ConsultorAdmin/ListadoActividades.vue'), meta: { permission: 5 } },
      // Consultor
      { path: '/inicio_consultor', component: () => import('pages/Consultor/Home.vue'), meta: { permission: 3 } },
      { path: '/solicitudes_consultor', component: () => import('pages/Consultor/Solicitudes.vue'), meta: { permission: 3 } },
      { path: '/conocimientos/form', component: () => import('pages/Consultor/RegisterConocimiento.vue'), meta: { permission: 3 } },
      { path: '/conocimientos/form/:id', component: () => import('pages/Consultor/RegisterConocimiento.vue'), meta: { permission: 3 } },
      // Cliente Administrador
      { path: '/inicio_cliente_admin', component: () => import('pages/ClienteAdmin/Home.vue'), meta: { permission: 6 } },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/ClienteFinal/Home.vue'), meta: { permission: 4 } },
      // Generales
      { path: '/usuarios', component: () => import('pages/Users.vue'), meta: { permission: 8 } },
      { path: '/usuarios/form', component: () => import('pages/RegisterUser.vue'), meta: { permission: 8 } },
      { path: '/usuarios/form/:id', component: () => import('pages/RegisterUser.vue'), meta: { permission: 8 } },
      { path: '/empresas', component: () => import('pages/Companys.vue'), meta: { permission: 8 } },
      { path: '/empresas/form', component: () => import('pages/RegisterCompany.vue'), meta: { permission: 8 } },
      { path: '/empresas/form/:id', component: () => import('pages/RegisterCompany.vue'), meta: { permission: 8 } },
      { path: '/contratos', component: () => import('pages/Contrato.vue'), meta: { permission: 8 } },
      { path: '/equipos', component: () => import('pages/Equipments.vue'), meta: { permission: 9 } },
      { path: '/conocimientos', component: () => import('pages/Conocimientos.vue'), meta: { permission: 10 } },
      { path: '/solicitudes', component: () => import('pages/Solicitudes.vue'), meta: { permission: 11 } },
      { path: '/historial_solicitudes', component: () => import('pages/HistorialSolicitudes.vue'), meta: { permission: 12 } },
      { path: '/notificaciones', component: () => import('pages/Notifications.vue'), meta: { permission: 13 } }
    ]
  },

  { path: '/login', component: () => import('pages/Login.vue') },

  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/login'
  }
]

export default routes
