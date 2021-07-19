
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/Home.vue') },
      { path: '/contratos', component: () => import('pages/Contrato.vue') },
      { path: '/usuarios', component: () => import('pages/ListadoUsuario.vue') },
      { path: '/usuarios/form', component: () => import('pages/RegisterUsuario.vue') },
      { path: '/usuarios/form/:id', component: () => import('pages/User_edit.vue') },
      { path: '/empresas', component: () => import('pages/Companys.vue') },
      { path: '/registrar_empresa', component: () => import('pages/RegisterCompany.vue') },
      { path: '/editar_empresa/:id', component: () => import('pages/RegisterCompany.vue') },
      // User
      { path: '/inicio_user', component: () => import('pages/User/Home.vue') },
      { path: '/organigrama', component: () => import('pages/User/OrganizationChart.vue') }
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
