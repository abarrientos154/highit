
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio_user01', component: () => import('pages/User01/Home.vue') },
      { path: '/contratos', component: () => import('pages/User01/Contrato.vue') },
      { path: '/usuarios', component: () => import('pages/User01/ListadoUsuario.vue') },
      { path: '/usuarios/form', component: () => import('pages/User01/RegisterUsuario.vue') },
      { path: '/usuarios/form/:id', component: () => import('pages/User01/User_edit.vue') },
      { path: '/empresas', component: () => import('pages/User01/Companys.vue') },
      { path: '/registrar_empresa', component: () => import('pages/User01/RegisterCompany.vue') },
      { path: '/editar_empresa/:id', component: () => import('pages/User01/RegisterCompany.vue') },
      // User
      { path: '/inicio_user02', component: () => import('pages/User02/Home.vue') },
      { path: '/organigrama', component: () => import('pages/User02/OrganizationChart.vue') }
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
