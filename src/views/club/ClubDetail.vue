<template>
    <div class="body">
      <el-row style="height: 800px">
        <el-col :span="16"  :offset="4" class="card-col">
          <el-card class="card-club" shadow="never">
            <img src="../../assets/gr.jpg" class="image" style="width: 850px;height: 500px;margin-top: 15px;margin-bottom: 10px">
            <el-descriptions  :colon="false" :title=$route.query.name>
              <el-descriptions-item >{{clubData[0].description}}</el-descriptions-item>
            </el-descriptions>
            <el-button class="but-join" @click="joinClub()" plain>Join</el-button>
          </el-card>
          <div class="footer">

          </div>
        </el-col>
      </el-row>
      <el-row class="card-row" >
        <el-col :span="16"  :offset="4" class="card-col">
          <el-card class="card-club" style="margin-top: -100px">
            <el-descriptions  :colon="false" title="Members">
            </el-descriptions>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  Member Name
                </template>
                <el-row>
                  <el-col :span="6" v-for="item in members" :key="item.name">
                    <el-avatar>{{item.name}}</el-avatar>
                    <!--                    <h4>  {{item.name}}</h4>-->
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
            <el-collapse>
              <el-collapse-item class="deploy-setting" v-for="(item) in posts" :key="item.id">
                <template slot="title" >
<!--                  <span style="float:top;font-weight:bold;font-size:5px;color:black;margin-left: 10px">{{item.studentName}}</span>-->
                  <el-avatar style="margin-left: 10px"> {{item.studentName}} </el-avatar>
                  <span style="float:left;font-weight:bold;font-size:15px;margin-left: 20px">{{item.title}}</span>
                </template>
<!--                <div style="float:top;font-weight:bold;font-size:25px;color:black;">{{item.title}} <br /></div>-->
                <div style="float: left;margin-left: 100px">{{item.content}}</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 100px">
        <el-col :span="16"  :offset="4" class="card-col">
          <el-card class="card-club">
            <el-descriptions  :colon="false" title="Post Something">
            </el-descriptions>
            <el-row>
              <el-col :span="6">
                <el-form
                    ref="postForm"
                    :model="postForm"
                    :rules="rules"
                    label-width="80px"
                    class="form-club">
                  <el-form-item label="Title" label-width="100px" prop="title">
                    <el-input v-model="postForm.title" style="width: 850px" required="required" placeholder="Type here..."></el-input>
                  </el-form-item>
                  <el-form-item label="Content" label-width="100px" prop="content">
                    <el-input
                        v-model="postForm.content"
                        style="width: 850px"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="Type here..."
                        class="el-textarea"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-button style="width: 500px;  background-color: #206BC4;color: white;" @click="createPost('postForm')">Post</el-button>
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
      postForm:{
        title:'',
        content:''
      },
      clubData: [],
      members: [],
      posts:[],
      total: '',
      user: {
        schoolId:"",
        studentId:"",
        id:""
      },
      rules: {
        title: [
          {required: true, message: "Please input title.", trigger: "blur"},
        ],
        content: [
          {required: true, message: "Please input content.", trigger: "blur"},
        ],
      },
    }

  },
  mounted() {
    this.searchByPage()
    this.searchName()
    this.searchPost()

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
    searchPost(){
      this.axios({
        url:"/api/club/post?clubId="+this.$route.query.id,
        method: "get",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          console.log(response.data.data)
          this.total = response.data.data.length
          this.posts = response.data.data
        } else {
          console.log("查询失败原因：", response.data.message)
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })
    },
    createPost(postForm){
      this.$refs[postForm].validate((valid) => {
        this.loading = true;
        if (valid) {
          if (localStorage.getItem('userInfo')) {
            getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
              this.user.studentid =  res.data.data.id
              let _this = this;
              // 使用 axios 将登录信息发送到后端
              let param = {
                title:_this.postForm.title,
                content:_this.postForm.content,
                clubId:this.$route.query.id,
                studentId:_this.user.studentid,
              };
              this.axios({     // axios 向后端发起请求
                url: "/api/club/post",  // 请求地址
                method: "post",             // 请求方法
                headers: {                  // 请求头
                  "Content-Type": "application/json",
                },
                data: JSON.stringify(param),
              }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
                if (res.data.code === 200) {  // 当响应的编码为 0 时，说明登录成功
                  // 显示后端响应的成功信息
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                  });
                } else {  // 当响应的编码不为 0 时，说明登录失败
                  // 显示后端响应的失败信息
                  this.$message({
                    message: res.data.msg,
                    type: "warning",
                  });
                }
                // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
                _this.loading = false;
                console.log(res);
              });})
          }
        } else {  // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }

      });
    }
  }
};
</script>
<style>
.club-divider .el-divider__horizontal {
  margin: 0;
}
.deploy-setting .el-collapse-item__header {
  /*flex-direction: row-reverse;*/
  height: 96px;
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
  height: 50px;
  line-height: 1px;
  width: 1327px;
  float: left;
  margin-left: -110px;
  /*color: #DBE7F4;*/
}
.el-card{
  margin-bottom:-50px;
}
/*.card-row .el-row{*/
/*  margin-bottom:50px;*/
/*}*/
</style>
