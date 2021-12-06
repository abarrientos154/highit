
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // User 01
      { path: '/inicio_user01', component: () => import('pages/User01/Home.vue') },
      // User 02
      { path: '/inicio_user02', component: () => import('pages/User02/Home.vue') },
      { path: '/organigrama', component: () => import('pages/User02/OrganizationChart.vue') },
      { path: '/categorias', component: () => import('pages/User02/Categorias.vue') },
      { path: '/equipos/form', component: () => import('pages/User02/RegisterEquipment.vue') },
      { path: '/equipos/form/:id', component: () => import('pages/User02/RegisterEquipment.vue') },
      // Gerente
      { path: '/inicio_gerente', component: () => import('pages/Gerente/Home.vue') },
      { path: '/indicadores', component: () => import('pages/Gerente/Indicadores.vue') },
      // Consultor Administrador
      { path: '/inicio_consultor_admin', component: () => import('pages/ConsultorAdmin/Home.vue') },
      { path: '/consultores', component: () => import('pages/ConsultorAdmin/ListadoConsultores.vue') },
      { path: '/atividades_consultor', component: () => import('pages/ConsultorAdmin/ListadoActividades.vue') },
      // Consultor
      { path: '/inicio_consultor', component: () => import('pages/Consultor/Home.vue') },
      { path: '/solicitudes_consultor', component: () => import('pages/Consultor/Solicitudes.vue') },
      { path: '/conocimientos/form', component: () => import('pages/Consultor/RegisterConocimiento.vue') },
      { path: '/conocimientos/form/:id', component: () => import('pages/Consultor/RegisterConocimiento.vue') },
      // Cliente Administrador
      { path: '/inicio_cliente_admin', component: () => import('pages/ClienteAdmin/Home.vue') },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/ClienteFinal/Home.vue') },
      // Generales
      { path: '/usuarios', component: () => import('pages/Users.vue') },
      { path: '/usuarios/form', component: () => import('pages/RegisterUser.vue') },
      { path: '/usuarios/form/:id', component: () => import('pages/RegisterUser.vue') },
      { path: '/empresas', component: () => import('pages/Companys.vue') },
      { path: '/empresas/form', component: () => import('pages/RegisterCompany.vue') },
      { path: '/empresas/form/:id', component: () => import('pages/RegisterCompany.vue') },
      { path: '/contratos', component: () => import('pages/Contrato.vue') },
      { path: '/equipos', component: () => import('pages/Equipments.vue') },
      { path: '/conocimientos', component: () => import('pages/Conocimientos.vue') },
      { path: '/solicitudes', component: () => import('pages/Solicitudes.vue') },
      { path: '/historial_solicitudes', component: () => import('pages/HistorialSolicitudes.vue') },
      { path: '/notificaciones', component: () => import('pages/Notifications.vue') }
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
