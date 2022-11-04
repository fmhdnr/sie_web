<template>
  <div>
    <router-view />
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="/home" class="menu">
            <i class="el-icon-house"></i>
            <span slot="title">Home</span>
          </el-menu-item>
          <el-menu-item index="/club/" class="menu1">
            <i class="el-icon-school"></i>
            <span slot="title">Clubs</span>
          </el-menu-item>
          <el-menu-item index="/shop/" class="menu2">
            <i class="el-icon-shopping-cart-1"></i>
            <span slot="title">Shop</span>
          </el-menu-item>
          <el-menu-item index="/tutor/" class="menu3">
            <i class="el-icon-user"></i>
            <span slot="title">Tutor</span>
          </el-menu-item>
<!--          <el-menu-item >-->
<!--            <span><el-button  class="btn1" @click="logout" autofocus >Sign out</el-button></span>-->
<!--          </el-menu-item>-->
          <el-dropdown @command="handleCommand" class="dropdown" ><!--  绑定指令,在methods里定义-->
            <span class="el-dropdown-link">&nbsp;&nbsp;&nbsp;&nbsp;{{ user.name }}</span>
            <img src="../assets/img.svg" height="30" width="30"/>
<!--            <span class="el-dropdown-link"><h6 style="color: darkgrey">Hello {{ user.name }}!</h6></span>-->
            <el-dropdown-menu slot="dropdown" class="dropdown1">
              <!-- icon是修改图标 ，command是点击后传给方法的值-->
<!--              <el-dropdown-item icon="el-icon-edit" command="edit">修改密码</el-dropdown-item>-->
              <el-dropdown-item command="quit" @click.native="logout">Sign out</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>

        </el-menu>

  </div>
</template>
<script>

import {getUserInfo} from '@/api/login.js'
import jwtDecode from 'jwt-decode'

export default {

  data() {
    return {
      user: {
        name: "",
        token: "",
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      // 移除本地用户登录信息
      localStorage.removeItem("userInfo")
      // 跳转页面到登录页
      this.$router.push('/login');
    },
    handleCommand(){
      this.$message(`Successfully signed out`)
    },

  },
  created() {
    if (localStorage.getItem('userInfo')) {
      getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
        console.log(res.data)
        this.user.name = res.data.data

      })
    }
  },
  mounted() {
    if (localStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user.token = localStorage.getItem('userInfo');
    }
  },
};
</script>

<style>

.menu {
  /*height: 150px;*/
  margin: auto;
  position: absolute;
  left: 355px;
}
.menu1{
  margin: auto;
  position: absolute;
  left: 455px;
}
.menu2{
  margin: auto;
  position: absolute;
  left: 555px;
}
.menu3{
  margin: auto;
  position: absolute;
  left: 655px;
}
.el-menu-vertical-demo{

  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
}
.btn1{
  margin: auto;
  position: absolute;
  left: 3150%;
  top:10px
}
.dropdown{
  float: right; /* 浮动在右边 */
  cursor: pointer; /* 鼠标放上去是手的形状 */
  margin-right: 350px;
  margin-top: 10px;
}

.el-dropdown-link{
  color: cornflowerblue;
  cursor: pointer; /* 鼠标放上去是手的形状 */
  float: right; /* 浮动在右边 */
  margin-right: 10px;
  margin-top: -6px;
}
</style>
