<template>
  <div class="body">
    <div >
    <el-card class="box-card">
        <span>
          <h2 style="color: #206BC4">Welcome to SIE</h2>
        </span>
        <span>
          <h6 style="color: darkgrey">Hello {{ user.name }}!</h6>
        </span>
<!--      <el-empty description="Home"></el-empty>-->
    </el-card>
    </div>
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

<style scoped>
.body{
  width: 100%;
  height: 100%;
  background-color: #F1F5F9;
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
}
.box-card {
  width: 1000px;
  /*height: 150px;*/
  background-color: #DBE7F4;
  position: absolute;
  top:90px;
  left: 0;
  right:0;
  margin: auto;
}
</style>
