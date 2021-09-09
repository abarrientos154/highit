
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // User 01
      { path: '/inicio_user01', component: () => import('pages/User01/Home.vue') },
      { path: '/usuarios', component: () => import('pages/User01/ListadoUsuario.vue') },
      { path: '/usuarios/form/:id', component: () => import('pages/User01/User_edit.vue') },
      { path: '/usuarios/form', component: () => import('pages/User01/RegisterUsuario.vue') },
      // User 02
      { path: '/inicio_user02', component: () => import('pages/User02/Home.vue') },
      { path: '/organigrama', component: () => import('pages/User02/OrganizationChart.vue') },
      { path: '/usuarios2', component: () => import('pages/User02/ListadoUsuario2.vue') },
      { path: '/usuarios2/form', component: () => import('pages/User02/RegisterUsuario2.vue') },
      { path: '/usuarios2/form/:id', component: () => import('pages/User02/User_edit2.vue') },
      { path: '/equipos', component: () => import('pages/User02/ListadoEquipo.vue') },
      { path: '/equipos/form', component: () => import('pages/User02/RegisterEquipo.vue') },
      { path: '/equipos/form/:id', component: () => import('pages/User02/Equipo_edit.vue') },
      { path: '/vista_conocimiento', component: () => import('pages/User02/ListadoConocimiento.vue') },
      // Gerente
      { path: '/inicio_gerente', component: () => import('pages/Gerente/Home.vue') },
      // Consultor Administrador
      { path: '/inicio_consultor_admin', component: () => import('pages/ConsultorAdmin/Home.vue') },
      { path: '/consultores', component: () => import('pages/ConsultorAdmin/ListadoConsultores.vue') },
      { path: '/atividades_consultor', component: () => import('pages/ConsultorAdmin/ListadoActividades.vue') },
      // Consultor
      { path: '/inicio_consultor', component: () => import('pages/Consultor/Home.vue') },
      { path: '/conocimiento', component: () => import('pages/Consultor/ListadoConocimiento.vue') },
      { path: '/conocimiento/form', component: () => import('pages/Consultor/RegisterConocimiento.vue') },
      { path: '/conocimiento/form/:id', component: () => import('pages/Consultor/Conocimiento_edit.vue') },
      // Cliente Administrador
      { path: '/inicio_cliente_admin', component: () => import('pages/ClienteAdmin/Home.vue') },
      { path: '/equipos_cliente', component: () => import('pages/ClienteAdmin/ListadoEquipo.vue') },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/Cliente/Home.vue') },
      { path: '/equipos_consultor', component: () => import('pages/Cliente/ListadoEquipo.vue') },
      // Generales
      { path: '/contratos', component: () => import('pages/Contrato.vue') },
      { path: '/empresas', component: () => import('pages/Companys.vue') },
      { path: '/companys/form', component: () => import('pages/RegisterCompany.vue') },
      { path: '/companys/form/:id', component: () => import('pages/RegisterCompany.vue') },
      { path: '/categorias', component: () => import('pages/User02/Categorias.vue') }
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
