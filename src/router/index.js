import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../components/Authorization/LoginForm.vue'
import RegisterForm from '../components/Authorization/RegisterForm.vue'
import DatabaseViewer from '../components/DatabaseViewer.vue'
import BuildingPanel from '../views/BuildingPanel.vue'
import FloorsPanel from '../views/FloorsPanel.vue'
import MainPage from '../views/MainPage.vue'
import MapViewer from '../views/MapViewer.vue'
import RelocationViewer from '../views/RelocationViewer'
import ReportsPanel from '../views/ReportsPanel'
import NotFound from '../views/NotFound'
import UsersViewer from '../views/UsersViewer'

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
    // props: true
  },
  {
    path: '/reportsPanel',
    name: 'reportsPanel',
    component: ReportsPanel,
    // props: true
  },
  {
    path: '/usersViewer',
    name: 'usersViewer',
    component: UsersViewer,
    // props: true
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
    // props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
