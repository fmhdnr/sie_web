// 此文件专门负责项目的路由

import VueRouter from "vue-router"

// 引入组件
import Login from '../views/login/Login'
import Register from "@/views/register/Register";
import Home from "@/views/home/Home";
import ResetPassword from "@/views/ResetPassword/ResetPassword";
import Club from "@/views/club/Club";
import Shop from "@/views/shop/Shop";
import Tutor from "@/views/tutor/Tutor";

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
                    name: 'Shop',
                    path:'/shop',
                    component:Shop,
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



