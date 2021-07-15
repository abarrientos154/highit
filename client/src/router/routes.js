
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/Home.vue') }
    ]
  },

  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/contratos', component: () => import('pages/Contrato.vue') },
  { path: '/registrar_empresa', component: () => import('pages/RegisterCompany.vue') },

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
