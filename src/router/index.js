import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../components/Authorization/LoginForm.vue'
import RegisterForm from '../components/Authorization/RegisterForm.vue'
import DatabaseViewer from '../views/DatabaseViewer.vue'
import BuildingPanel from '../views/BuildingPanel.vue'
import FloorsPanel from '../views/FloorsPanel.vue'
import MainPage from '../views/MainPage.vue'
import MapViewer from '../views/MapViewer.vue'
import RelocationViewer from '../views/RelocationViewer'
import ReportsPanel from '../views/ReportsPanel'
import NotFound from '../views/NotFound'
import UsersViewer from '../views/UsersViewer'
import FinderView from '../views/FinderView'
import CreditsPanel from '../views/CreditsPanel'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: MainPage,
    meta: {
      title: 'Main page'
    }
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: LoginForm,
    meta: {
      title: 'Sign in'
    }
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: RegisterForm,
    meta: {
      title: 'Sign up'
    }
  },
  {
    path: '/assetList',
    name: 'assetList',
    component: DatabaseViewer,
    meta: {
      title: 'Asset list'
    }
  },
  {
    path: '/buildingList',
    name: 'buildingList',
    component: BuildingPanel
  },
  {
    path: '/floorsInBuilding/:id',
    name: 'floorList',
    components: {
      default: FloorsPanel,
    },
    props: true
  },
  {
    path: '/mapViewer/:id/:assetId?',
    name: 'mapViewer',
    component: MapViewer,
    props: true
  },
  {
    path: '/relocationViewer',
    name: 'relocationViewer',
    component: RelocationViewer,
  },
  {
    path: '/reportsPanel',
    name: 'reportsPanel',
    component: ReportsPanel,
  },
  {
    path: '/usersViewer',
    name: 'usersViewer',
    component: UsersViewer,
  },
  {
    path: '/finder',
    name: 'finderView',
    component: FinderView,
  },
  {
    path: '/credits',
    name: 'credits',
    component: CreditsPanel,
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
