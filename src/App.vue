<template>
  <div id="app">
    <router-view />
<!--    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" mode="horizontal" @select="handleSelect" router>-->

<!--      <el-menu-item v-for="(item,i) in navList" :index="item.src" :key="i">{{item.name}}</el-menu-item>-->

<!--      <el-menu-item >-->
<!--        <el-button  class="btn1" @click="logout" autofocus >登出</el-button>-->
<!--      </el-menu-item>-->

<!--    </el-menu>-->

  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      user: {
        name: "",
        token: "",

      },
      // navList:[
      //   {src:'/home',name:'Home'},
      //   {src:'/club',name:'Clubs'},
      //
      // ]
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
    }
  }
};
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -9px;
  /*position: absolute;*/
}
.btn1 {
  float: right;
}
</style>
