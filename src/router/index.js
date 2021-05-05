import Vue from 'vue'
import VueRouter from 'vue-router'
const RowBarPage = () => import('@/views/rowbar/RowBarPage')
const MapPage = () => import('@/views/map/MapPage')
const RankBarPage = () => import('@/views/rankbar/RankBarPage')
const RotatePage = () => import('@/views/rotate/RotatePage')
const AbroadPage = () => import('@/views/abroad/AbroadPage')
const ScreenPage = () => import('@/views/screen/ScreenPage')
const RankFivePage = () => import('@/views/rankFive/RankFivePage')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/sreenshow'
  },
  {
    path: '/rowbar',
    component: RowBarPage
  },
  {
    path: '/map',
    component: MapPage
  },
  {
    path: '/rankbar',
    component: RankBarPage
  },
  {
    path: '/rotate',
    component: RotatePage
  },
  {
    path: '/abroad',
    component: AbroadPage
  },
  {
    path: '/sreenshow',
    component: ScreenPage
  },
  {
    path: '/five',
    component: RankFivePage
  }
]

const router = new VueRouter({
  routes
})

export default router
