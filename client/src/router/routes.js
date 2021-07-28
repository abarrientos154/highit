
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
      { path: '/equipos_consultor', component: () => import('pages/Cliente/ListadoEquipo.vue') },

      // Consultor
      { path: '/inicio_consultor', component: () => import('pages/Consultor/Home.vue') },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/Cliente/Home.vue') },
      // Generales
      { path: '/contratos', component: () => import('pages/Contrato.vue') },
      { path: '/empresas', component: () => import('pages/Companys.vue') },
      { path: '/registrar_empresa', component: () => import('pages/RegisterCompany.vue') },
      { path: '/editar_empresa/:id', component: () => import('pages/RegisterCompany.vue') },
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
