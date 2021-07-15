
const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/inicio', component: () => import('pages/Home.vue') },
      { path: '/contratos', component: () => import('pages/Contrato.vue') }
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
