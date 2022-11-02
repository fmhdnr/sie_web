<template>
  <div>
    <h2>欢迎{{ user.name }}！您的 token 为{{ user.token }}</h2>
    <el-button @click="logout"> 登出</el-button>
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
        token: ""
      },
    };
  },
  methods: {
    logout() {
      // 移除本地用户登录信息
      localStorage.removeItem("userInfo")
      // 跳转页面到登录页
      this.$router.push('/login');
    }
  },
  created() {
    if (localStorage.getItem('userInfo')) {
      getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
        console.log(res.data.data)
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

<style scoped>
</style>
