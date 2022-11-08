<template>
  <div class="body">
    <el-row >
      <el-col :span="16"  :offset="4" class="card-col">
        <el-card class="card-club">
          <img src="../../assets/gr.jpg" class="image" style="width: 950px;height: 600px;margin-top: 15px;margin-bottom: 10px">

          <el-descriptions  :colon="false" :title=$route.query.name>
<!--            <template slot="title">-->
<!--              <h5 style="font-weight: bold;color: black">1</h5>-->
<!--            </template>-->
            <el-descriptions-item >{{clubData[0].description}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-divider></el-divider>
        <div class="footer">
          <el-button class="but-join" @click="joinClub()">Join</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="card-row">
      <el-col :span="16"  :offset="4" class="card-col">
        <el-card class="card-club">
          <el-descriptions  :colon="false" title="Members">
          </el-descriptions>
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                Member Name
              </template>
                <el-row>
                  <el-col :span="6" v-for="item in members" :key="item.name">
                    <img src="../../assets/img.svg" height="30" width="30"/>
                    <h4>{{item.name}}</h4>
                  </el-col>
                </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="card-row">
      <el-col :span="16"  :offset="4" class="card-col">
        <el-card class="card-club">
          <el-descriptions  :colon="false" title="Post">
          </el-descriptions>
              <el-row>
                <el-col :span="4" >
                  <div v-for="item in members" :key="item.name" >
                    <img src="../../assets/img.svg" height="30" width="30"/>
                    <h4>{{item.name}}</h4>
                  </div>
                </el-col>
              </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>


import {getUserInfo} from "@/api/login";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      clubData: [],
      members: [],
      total: '',
      user: {
        schoolId:"",
        studentId:"",
        id:""
      },
    }

  },
  mounted() {
    this.searchByPage()
    this.searchName()


  },
  methods: {
    joinClub() {
      if (localStorage.getItem('userInfo')) {
        getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
          this.user.id = res.data.data.id
          console.log(this.user.id)
          let _this = this;
      let param = {
        clubId:this.$route.query.id,
        studentId:_this.user.id
      };
      console.log(param)
      this.axios({     // axios 向后端发起请求
        url: "/api/club/member/",  // 请求地址
        method: "post",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
        data: JSON.stringify(param),
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            message: response.data.msg,
            type: "warning",
          });
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })
    })
  }
},


    searchName(){
      let param = {
        page: 1,
        pageSize:10000,
      };
      this.axios({     // axios 向后端发起请求
        url: "/api/club/member/"+this.$route.query.id,  // 请求地址
        method: "get",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
        params: param,
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          this.total = response.data.data.total
          this.members = response.data.data
        } else {
          console.log("查询失败原因：", response.data.message)
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })

    },
    searchByPage() {
      let param = {
        page: 1,
        pageSize:1,
        name:this.$route.query.name,
      };
      console.log(param);
      this.axios({     // axios 向后端发起请求
        url: "/api/club/page",  // 请求地址
        method: "get",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
        params: param,
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          console.log(response.data);
          this.total = response.data.data.total
          // console.log("分页查询的数据：", response.data.data.records)
          this.clubData = response.data.data.records
        } else {
          console.log("查询失败原因：", response.data.message)
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })

    },



  }
};
</script>
<style>
.club-divider .el-divider__horizontal {
  margin: 0;
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
.card-col{
  margin-top: 70px;
}

.but-join{
  margin-top: 100px;
  bottom:0;
  height: 50px;
  line-height: 1px;
  width: 1127px;
  float: left;
}
.footer{

  position: absolute;
  bottom:0;
}
.title{
  margin-top: 100px;
}
</style>
