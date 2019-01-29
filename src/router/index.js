import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/Login/login';
import Home from '@/views/Home/index';

import Main from '@/views/Main/index';

// const List = () => import('@/views/Main/list/list');
// const List = () => import('@/views/Main/list/list_new');
// const Detail = () => import('@/views/Main/detail/detail');
import List from '@/views/Main/list/list_new'
import Detail from '@/views/Main/detail/detail'
import errorP from '@/views/errorP/error'
import Imgconfig from '@/views/ImgConfig/index'

Vue.use(VueRouter);

const router = new VueRouter({
    mode : "history",
    base:`/datahub/`,
    routes:[
        {
            path: '/',
            component : Login,
            redirect : '/login',
            children:[
                { path: 'login', component:Login, name:'登录页' }
            ]
        },
        {
            path: '/home',
            component : Home ,
            name: 'home'
        },
        {
            path: '/main',
            component: Main,
            name : 'main',
            redirect : '/main/list',
            children:[
                { path: 'list', component:List, name:'list', meta:{keepAlive:true,isBack:false} },
                { path: 'detail', component:Detail, name:'detail' }
            ]
        },
        {
            path: '/imgconfig',
            component : Imgconfig,
            name: 'Imgconfig'
        },
        {
            path: '/error',
            component : errorP,
            name: 'error'
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     //to and from are Route Object,next() must be called to resolve the hook
//     if(to.path === '/login'){
//         sessionStorage.removeItem('user')
//     }
//     let user = JSON.parse(sessionStorage.getItem('user'));
//     if(!user && to.path !== '/login'){
//         next({path:'/login'})
//     } else {
//         next()
//     }
// })

export default router;