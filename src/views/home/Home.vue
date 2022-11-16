<template>
  <div class="body">
    <div>
    <el-card class="box-card">
        <span>
          <h2 style="color: #206BC4">Welcome to SIE</h2>
        </span>
        <span>
          <h6 style="color: #616876">Hello {{ user.name }}! Here is {{ user.schoolid }}.</h6>
        </span>
<!--      <span>-->
<!--          <h6 style="color: darkgrey">Here is {{ user.schoolid }}.</h6>-->
<!--        </span>-->
      <el-row>
      <span>
          <el-col :span="5" :offset="5">
<!--        <el-input placeholder="Search" v-model="input" class="searchClass" >-->
<!--          <i slot="suffix" class="el-icon-search el-input__icon" style="margin-top: -5px;margin-right: 30px"></i>-->
<!--        </el-input>-->
            <el-autocomplete
                class="searchClass"
                v-model="input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false">
            </el-autocomplete>
      </el-col>
      <el-col :span="1" :offset="7">
        <el-button class="search-club" @click="searchAll()">Search</el-button>
      </el-col>
        </span>
      </el-row>
    </el-card>
        <el-row class="row2">
          <el-col :span="5" :offset="3" >
            <p style="margin-left: 100px;margin-top: -5px;" v-if="input.length>0">Search results for {{input}}</p>
            <h5 style="font-weight: lighter;margin-top: -10px;color: #616876;height: 10px" v-if="total>0">{{ total }} results</h5>
          </el-col>
        </el-row>
        <el-row class="row3">
          <el-tabs :tab-position=tabPosition >
            <el-tab-pane :label="'clubs('+clubCount+')'" v-if="clubs.length > 0" >
              <el-col  v-for="item in clubs" :key="item.id" class="card-col">
              <el-card class="card-club" shadow="hover" >
                <img :src="item.imageUrl" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.name" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.description }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>

            <el-tab-pane :label="'merchandises('+merchandiseCount+')'" v-if="merchandises.length > 0">
              <el-col class="card-col" v-for="item in merchandises" :key="item.id">
              <el-card class="card-club" shadow="hover" >
                <!--          <el-image :src="getImage(item.imageUrl)"  style="width: 250px;height: 150px"  alt="图片"></el-image>-->
                                <img :src="item.imageUrl" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.name" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.description }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>
            <el-tab-pane :label="'tutors('+tutorCount+')'" v-if="tutors.length > 0">
              <el-col class="card-col" v-for="item in tutors" :key="item.tid">
              <el-card class="card-club" shadow="hover" >
                <!--          <el-image :src="getImage(item.imageUrl)"  style="width: 250px;height: 150px"  alt="图片"></el-image>-->
                                <img :src="item.image" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.tname" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.tid,name:item.tname}}" style="color: black;text-decoration: none;">{{ item.tname }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.tcontents}}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>
            <el-tab-pane :label="'users('+userCount+')'" v-if="users.length > 0">
              <el-col class="card-col" v-for="item in users" :key="item.key">
              <el-card class="card-club" shadow="hover"  >
                <!--          <el-image :src="getImage(item.imageUrl)"  style="width: 250px;height: 150px"  alt="图片"></el-image>-->
                                <img :src="item.imageUrl" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.name" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.description }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>

          </el-tabs>

        </el-row>

    </div>
  </div>



</template>

<script>
import {getUserInfo} from '@/api/login.js'
import jwtDecode from 'jwt-decode'


export default {

  data() {
    return {
      input: '',
      user: {
        name: "",
        token: "",
      },
      clubsDes:[],
      total:'',
      clubCount:'',
      merchandiseCount:'',
      tutorCount:'',
      userCount:'',
      all:[],
      clubs:[],
      merchandises:[],
      tutors:[],
      users:[],
      restaurants:'',
      tabPosition: 'left',
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    // querySearch(queryString, cb) {
    //   let clubs = this.clubs;
    //   let results = queryString ? clubs.filter(this.createFilter(queryString)) : clubs;
    //   // 调用 callback 返回建议列表的数据
    //   let temp = [];
    //   for(let i=0; i<results.length ;i++){
    //     temp.push(results[i].name);
    //   }
    //   console.log(results);
    //   console.log(temp);
    //   cb(temp);
    // },
    // createFilter(queryString) {
    //   return (restaurant) => {
    //     console.log(restaurant);
    //     console.log(restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //     return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },
    querySearch(queryString, cb) {
      let restaurants = this.clubsDes;
      console.log(this.restaurants)
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        // console.log(restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getImage: async  function(url){
      let imgUrll ='';
      return  await this.axios({
        method: 'get',
        url: "/api/common/download?name="+url ,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "token": this.token  // 必须添加的请求头
        },
        responseType: "arraybuffer", // 关键 设置 响应类型为二进制流
      }).then(function (response) {  // 将后台的图片二进制流传华为base64
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }).then(function (data){
        imgUrll = data
        console.log(imgUrll)
        return imgUrll;
      });
    },
    searchAll(){
      this.axios({
        url:"/api/search?name="+this.input,
        method: "get",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          console.log(response.data.data)
          //console.log(response.data.data.length)
          // this.total = response.data.data.length
          this.all = response.data.data
          console.log(this.all)
          //club照片
          let temp = response.data.data.clubs
          console.log(temp);
          for (let i =0; i<temp.length; i++){
            this.getImage(temp[i].imageUrl).then(value => {
              console.log(value);
              temp[i].imageUrl = value;
              this.clubData = temp;
            })
          }
          this.clubs = temp;
          this.clubCount = response.data.data.clubCount
          this.merchandiseCount = response.data.data.merchandiseCount
          this.tutorCount = response.data.data.tutorCount
          this.userCount = response.data.data.userCount
          this.tutors = response.data.data.tutors
          this.merchandises = response.data.data.merchandises
          this.users = response.data.data.users
          this.total = response.data.data.allCount
          console.log("查询失败原因：", response.data.message)
          if(this.clubCount === 0 && this.tutorCount === 0 && this.userCount === 0 && this.merchandiseCount ===0){
              this.$notify({
                title: 'Remind',
                message: 'No Results',
                type: 'warning'
              });

          }
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })
    },
    logout() {
      // 移除本地用户登录信息
      localStorage.removeItem("userInfo")
      // 跳转页面到登录页
      this.$router.push('/login');
    },
    loadAll() {
      this.axios({
        url:"/api/club/nameAndDescription",
        method: "get",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          // console.log(response.data.data)
          this.clubsDes = response.data.data
          console.log(this.clubsDes)
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })
    },

  },
  created() {
    if (localStorage.getItem('userInfo')) {
      getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
        this.user.name = res.data.data.name
        this.user.schoolid = res.data.data.schoolId
        if(this.user.schoolid==1){
          this.user.schoolid = "Northeastern University"
        }else {
          this.user.schoolid = "The University of Texas at Arlington"
        }
      })
    }
  },
  mounted() {
    if (localStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user.token = localStorage.getItem('userInfo');
    }
    this.loadAll()





  },

};
</script>
<style>
.labelcolor{
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
}
.el-tabs__item{
  height: 50px;
  color: black;
  font-weight: lighter;
  width: 200px;

}
.el-tabs__nav-scroll{

  margin: fill;
}

.el-tabs__item.is-active {
  color: black;
  font-weight: normal;
  background-color: #E9EFF7;
}
/*去掉切换时el-tab-pane底部的蓝色下划线*/
.el-tabs__active-bar {
  background-color: transparent !important;
}

/*去掉tabs底部的下划线*/
.el-tabs__nav-wrap::after {
  position: static !important;
}
</style>
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
.searchClass {
  width: 500px;
  height: 1px;
}

.search-club {
  height: 30px;
  background-color: #206BC4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

}
/deep/ .el-input__inner{
  width: 450px;
  height: 30px;
}
.row2 {
  margin-top: 300px;
  height: 24px;
  min-height: 1px;
  text-decoration-color: black;
  font-size: 20px;
  font-weight: normal;
}
.row3{
  margin-top: 60px;
  margin-left: 330px;

}
.card-club {
  width: 300px;
  height: 250px;
}
.card-col {
  /*margin-top: 30px;*/
  margin-bottom: 30px;
  margin-left: 5%;
  width: 30%;
}

</style>
