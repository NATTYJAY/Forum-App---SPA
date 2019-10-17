import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login/Login'
import SignUp from '../components/login/signup'
import Forum from '../components/forum/Forum'
import Logout from '../components/login/logout'
import Read from '../components/forum/read'
import Create from '../components/forum/create'
import CreateCategory from '../components/category/createCategory'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/logout',
        component: Logout
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/ask',
        component: Create
    },
    {
        path: '/forum',
        component: Forum,
        name:'forum'},
    {
        path: '/question/:slug',
        component: Read,
        name: 'read'
    },
    {
        path: '/category',
        component: CreateCategory,
    },

]

const router = new VueRouter({
    routes,
    hashbang : false,
    mode : 'history'

})

export default router