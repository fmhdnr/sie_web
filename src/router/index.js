// 此文件专门负责项目的路由

import VueRouter from "vue-router"

// 引入组件
import Login from '../views/login/Login';
import Register from "@/views/register/Register";
import Home from "@/views/home/Home";
import Buy from '../views/shop/Buy';
import Sell from '../views/shop/Sell';
import Payment from '../views/shop/Payment';
import Lend from '../views/shop/Lend';
import Exchange from '../views/shop/Exchange';
import ResetPassword from "@/views/ResetPassword/ResetPassword";
import Club from "@/views/club/Club";
import Tutor from "@/views/tutor/Tutor";
import ClubDetail from "@/views/club/ClubDetail";
import Compose from "@/views/mail/Compose";
import Inbox from "@/views/mail/Inbox";
import Sent from "@/views/mail/Sent";
import Drafts from "@/views/mail/Drafts";
import Delete from "@/views/mail/Delete";
import Detail from "@/views/mail/Detail";


// 创建并暴露一个路由器
const router = new VueRouter({
    mode: 'history',    // 路由模式，该模式不会在地址中显示井号#
    routes: [
        {
            path: '/',          // 路径
            redirect: '/login'  // 重定向
        },
        {
            name: 'Login',
            path: '/login',     // 路径
            component: Login    // 跳转到的组件
        },
        {
            name: 'Register',
            path: '/register',
            component: Register
        },
        {
            path: '/',
            component: () => import('@/views/Main'),
            children: [
                {
                    path: '/home',
                    component: Home,
                    meta: {
                        authRequired: true
                    }
                },
                {
                    name:'Club',
                    path:'/club',
                    component:Club,
                    meta: {
                        authRequired: true
                    }
                },
                {
                    name: 'Tutor',
                    path:'/tutor',
                    component:Tutor,
                    meta: {
                        authRequired: true
                    }
                },
                {
                    name:'Club-Detail',
                    path:'/clubDetail',
                    component:ClubDetail,
                    meta:{
                        authRequired: true
                    }
                },
                {
                    name:'Buy',
                    path: '/buy',
                    component: Buy,
                    meta:{
                        authRequired: true
                    }
                },
                {
                    name:'Sell',
                    path: '/sell',
                    component: Sell,
                    meta:{
                        authRequired: true
                    }
                },
                {
                    path: '/payment',
                    component: Payment,
                    name:"Payment",
                    meta:{
                        authRequired: true
                    }
                },
                {
                    name:'Lend',
                    path: '/lend',
                    component: Lend,
                    meta:{
                        authRequired: true
                    }
                },
                {
                    name:'Exchange',
                    path: '/exchange',
                    component: Exchange,
                    meta:{
                        authRequired: true
                    }
                },
                {
                    name:'Mail',
                    path:'/mail',
                    component: () => import('@/views/mail/mail'),
                    children:[
                        {
                            name:'Compose',
                            path:'/compose',
                            component:Compose,
                        },
                        {
                            name:'Inbox',
                            path:'/inbox',
                            component:Inbox,
                        },
                        {
                            name:'Sent',
                            path:'/sent',
                            component:Sent,
                        },
                        {
                            name:'Drafts',
                            path:'/drafts',
                            component:Drafts,
                        },
                        {
                            name:'Delete',
                            path:'/delete',
                            component:Delete,
                        },
                        {
                            name:'Detail',
                            path:'/detail',
                            component:Detail,
                        },

                    ]
                },

            ]
        },
        {
            name:'ResetPassword',
            path:'/resetpassword',
            component:ResetPassword
        },

    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('userInfo')
    if (!(to.name === 'Login' || to.name === 'Register' || to.name==='ResetPassword') && !token) {
        next({name: 'Login'})
    }else {
        next()
    }
})

export default router



