import { createRouter, createWebHashHistory } from 'vue-router'
import SplashScreen from '../views/SplashScreen.vue'

const routes = [
  {
    path: '/',
    name: 'SplashScreen',
    component: SplashScreen
  },
  {
    path: '/welcome',
    name: 'Welcome',
    // route level code-splitting
    // this generates a separate chunk (welcome.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue')
  },
  {
    path: '/system-behavior',
    name: 'SystemBehavior',
    component: () => import(/* webpackChunkName: "SystemBehavior" */ '../views/SystemBehavior.vue')
  },
  {
    path: '/thankyou',
    name: 'ThankYou',
    component: () => import(/* webpackChunkName: "ThankYou" */ '../views/ThankYou.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/log-visitor',
    name: 'LogVisitor',
    component: () => import(/* webpackChunkName: "LogVisitor" */ '../views/LogVisitor.vue')
  },
  {
    path: '/vehicle-visitor',
    name: 'VehicleVisitor',
    component: () => import(/* webpackChunkName: "VehicleVisitor" */ '../views/VehicleVisitor.vue')
  },
  {
    path: '/no-vehicle-visitor',
    name: 'NoVehicleVisitor',
    component: () => import(/* webpackChunkName: "NoVehicleVisitor" */ '../views/NoVehicleVisitor.vue')
  },
  {
    path: '/packages',
    name: 'Packages',
    component: () => import(/* webpackChunkName: "Packages" */ '../views/Packages.vue')
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: () => import(/* webpackChunkName: "Announcements" */ '../views/Announcements.vue')
  },
  {
    path: '/announcement/:id',
    name: 'Announcement',
    component: () => import(/* webpackChunkName: "Announcement" */ '../views/Announcement.vue')
  },
  {
    path: '/service-request',
    name: 'ServiceRequest',
    component: () => import(/* webpackChunkName: "ServiceRequest" */ '../views/ServiceRequest.vue')
  },
  {
    path: '/new-service',
    name: 'NewService',
    component: () => import(/* webpackChunkName: "NewService" */ '../views/NewService.vue')
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import(/* webpackChunkName: "Request" */ '../views/Request.vue')
  },
  {
    path: '/issue-detail/:id',
    name: 'IssueDetail',
    component: () => import(/* webpackChunkName: "IssueDetail" */ '../views/IssueDetail.vue')
  },
  {
    path: '/guest',
    name: 'Guest',
    component: () => import(/* webpackChunkName: "Guest" */ '../views/Guest.vue')
  },
  {
    path: '/guest-vehicle',
    name: 'GuestVehicle',
    component: () => import(/* webpackChunkName: "GuestVehicle" */ '../views/GuestVehicle.vue')
  },
  {
    path: '/guest-no-vehicle',
    name: 'GuestNoVehicle',
    component: () => import(/* webpackChunkName: "GuestNoVehicle" */ '../views/GuestNoVehicle.vue')
  },
  {
    path: '/try-again/:type',
    name: 'TryAgain',
    component: () => import(/* webpackChunkName: "TryAgain" */ '../views/TryAgain.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
