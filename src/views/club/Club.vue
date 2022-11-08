<template>
  <div class="body">
    <h2 style="color: #206BC4">Clubs</h2>
    <el-row>
      <el-col :span="5" :offset="3" class="row1">
        <p>Clubs</p>
        <h5 style="font-weight: lighter;margin-top: -15px;color: darkgray">{{ total }} clubs</h5>
      </el-col>
      <el-col :span="5" :offset="5">
        <el-input placeholder="Please input" v-model="input" class="searchClass">
          <i slot="suffix" class="el-icon-search el-input__icon" @click="searchByPage(currentPage,pageSize)"></i>
        </el-input>
      </el-col>
      <el-col :span="1" :offset="0">
        <el-button class="create-club" icon="el-icon-plus" @click="dialogVisible = true">      Create club</el-button>
      </el-col>
    </el-row>
<!--    <el-empty description="Clubs"></el-empty>-->
    <el-row class="card-row">
      <el-col :span="8" class="card-col" v-for="item in clubData" :key="item.id" >
        <el-card class="card-club" shadow="hover">
          <img src="../../assets/gr.jpg" class="image" style="width: 250px;height: 150px">
          <el-divider></el-divider>
          <el-descriptions :title="item.name" :colon="false">
            <template slot="title">
              <router-link  :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}</router-link>
<!--              <el-link href="/clubDetail" target="_blank" style="font-weight: bold">{{ item.name }}</el-link>-->
            </template>
<!--            <template slot="extra">-->
<!--              <el-button type="primary" size="small">操作</el-button>-->
<!--            </template>-->
            <el-descriptions-item>{{ item.description }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>



    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="8"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
<!--    表单-->
    <el-dialog class="dialog" title="New Club" :visible.sync="dialogVisible" width="40%" append-to-body style="float: right" @close='closeDialog'>
      <el-divider></el-divider>
      <el-form
          ref="clubForm"
          :model="clubForm"
          :rules="rules"
          label-width="80px"
          class="form-club">
        <el-form-item label="Club Name" label-width="150px" prop="name">
          <el-input v-model="clubForm.name" style="width: 420px" required="required" placeholder="Type here..."></el-input>
        </el-form-item>
        <el-form-item label="Club Description" label-width="150px" prop="description">
          <el-input
              v-model="clubForm.description"
              style="width: 420px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="Type here..."
          class="el-textarea"></el-input>
        </el-form-item>
        <el-divider class="club-divider"></el-divider>
        <el-form-item label="imageUrl" label-width="150px" prop="imageUrl">
          <el-input
              v-model="clubForm.imageUrl"
              style="width: 420px"
              placeholder="Type here..."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
        <el-link class="link-icon">Cancel</el-link>
        <el-button class="create-club" icon="el-icon-plus" @click="createClub('clubForm')">      Create club</el-button>
      </span>
    </el-dialog>
  </div>



</template>

<script>


import {getUserInfo} from "@/api/login";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      input: '',
      dialogVisible:false,
      clubData:[],
      clubForm: {
        name: '',
        description:'',
        imageUrl:'',
      },
      user: {
        schoolId:"",
        studentId:"",
      },
      total: 0, //数据库中总数
      pageSize: 8,
      currentPage: 1,

      rules: {
        name: [
          {required: true, message: "Please input name.", trigger: "blur"},
        ],
        description: [
          {required: true, message: "Please input description.", trigger: "blur"},
        ],
        imageUrl:[
          {required: true, message: "Please input an imageUrl.", trigger: "blur"},
        ],

      },
      loading: false, // 是否显示加载动画
    }


  },
  mounted() {
    // document.getElementsByClassName("el-pagination__jump")[0].childNodes[0].nodeValue = "Go to";
    // document.getElementsByClassName("el-pagination__jump")[0].childNodes[2].nodeValue = "Page";
    // document.getElementsByClassName("el-pagination__total")[0].childNodes[0].nodeValue = "Page";

    this.searchByPage(this.currentPage, this.pageSize)
  },
  methods: {
    createClub(formClub){
      this.$refs[formClub].validate((valid) => {
        this.loading = true;
        if (valid) {
          if (localStorage.getItem('userInfo')) {
            getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
              this.user.schoolid = res.data.data.schoolId
              this.user.studentid =  res.data.data.id
          let _this = this;
          // 使用 axios 将登录信息发送到后端
          let param = {
            name: _this.clubForm.name,
            description:_this.clubForm.description,
            schoolId: _this.user.schoolid,
            studentId:_this.user.studentid,
            imageUrl: _this.clubForm.imageUrl,
          };
          this.axios({     // axios 向后端发起请求
            url: "/api/club",  // 请求地址
            method: "post",             // 请求方法
            headers: {                  // 请求头
              "Content-Type": "application/json",
            },
            data: JSON.stringify(param),
          }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
            if (res.data.code === 200) {  // 当响应的编码为 0 时，说明登录成功
              this.dialogVisible = false
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

    },
    closeDialog(){
      this.$refs.clubForm.resetFields()
    },
    //分页
    handleSizeChange: function(size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.searchByPage(this.currentPage, this.pageSize);
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.searchByPage(this.currentPage, this.pageSize);

    },
    searchByPage(currentPage, pageSize) {
      let param = {
        page: currentPage,
        pageSize:pageSize,
        name:this.input,
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
          console.log("分页查询的数据：", response.data.data.records)
          this.clubData = response.data.data.records
        } else {
          console.log("查询失败原因：", response.data.message)
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })

    },

  },



};

</script>
<style>
.dialog .el-dialog__body {
  padding: 0;

}
.dialog .el-dialog__footer {
  padding: 15px;

}
.form-club .el-form-item__label {
  margin-left: 35px;
}
.club-divider .el-divider__horizontal {
  height: 1px;
  margin: 15px 0;
}
.el-textarea .el-textarea__inner{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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
.row1{
  margin-top: -10px;
  height: 24px;
  min-height: 1px;
  text-decoration-color: black;
  font-size:20px;
  font-weight: bold;
}
.searchClass{
  margin-top: 15px;
  width: 200px;
}
.create-club{
  margin-top: 15px;
  margin-left: -50px;
  background-color: #206BC4;
  color: white;
}


.card-club{
  width: 300px;
  height: 320px;
}

.card-col{
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  width: 1%;
}
.link-icon{
  float: left;
  margin-top:27px;
  margin-left: 20px;
}
.block{
  margin-top: 20px;
}

</style>
