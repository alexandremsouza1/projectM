
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: 'signin',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/signin') }
    ]
  },
  {
    path: '/calibration',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/calibration') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
