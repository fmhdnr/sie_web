<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">

        <div class="form-wrapper" >
          <div class="header">
            Welcome
          </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-position="left"
              label-width="70px"
              class="login-from">
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.name" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  style="width: 220px"
                  show-password></el-input>
            </el-form-item>
          </el-form>
        </el-form>
          <br />
        <el-row :gutter="20">
          <div class="btnGroup">
            <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                v-loading="loading"
                round
                plain>Sign in</el-button>
            <el-button @click="resetForm('ruleForm')" round plain type="warning">Reset</el-button>
            <router-link to="/register">
              <el-button style="margin-left: 10px" round plain type="info">Sign up</el-button>
            </router-link>

          </div>

        </el-row>
          <br /><br />
          <div>
            <router-link to="/resetpassword">
            <el-link type="info" line-height="10px">I forgot password</el-link>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "Please input name.", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input password.", trigger: "blur" },
        ],
      },
      loading: false, // 是否显示加载动画
    };
  },
  methods: {
    submitForm(formName) {
      // 验证表单中的账号密码是否有效，因为在上面rules中定义为了必填 required: true
      this.$refs[formName].validate((valid) => {
        // 点击登录后，让登录按钮开始转圈圈（展示加载动画）
        this.loading = true;
        // 如果经过校验，账号密码都不为空，则发送请求到后端登录接口
        if (valid) {
          let _this = this;
          // 使用 axios 将登录信息发送到后端
          let param = {
            name: _this.ruleForm.name,
            password:_this.ruleForm.password
          };

          this.axios({
            url: "/api/user/login",               // 请求地址
            method: "post",                       // 请求方法
            headers: {                            // 请求头
              "Content-Type": "application/json",
            },
            data: JSON.stringify(param),
            // params:{
            //   name: _this.ruleForm.name,
            //   password: _this.ruleForm.password
            // },
          }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
            console.log(res.data)
            if (res.data.code === 200) {  // 当响应的编码为 0 时，说明登录成功
              // 将用户信息存储到localStorage中
              // sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
              localStorage.setItem("userInfo",JSON.stringify(res.data.data.token))
              console.log(res)
              // 跳转页面到首页
              this.$router.push('/home');
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
          });
        } else {  // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<!--<style lang="less" scoped>-->
<!--// 改变input里的字体颜色-->
<!--/deep/input::-webkit-input-placeholder {-->
<!--  color: #17a1e5;-->
<!--  font-size: 15px;-->
<!--}-->

<!--// 改变input框背景颜色-->
<!--/deep/.el-input__inner {-->
<!--  background-color: transparent !important;-->
<!--  border: 1px solid #1296db;-->
<!--}-->
<!--</style>-->


<style scoped>

 .loginbody {
   width: 100%;
   height: 100%;
   min-width: 1000px;
   background-image: url("../../assets/gr.jpg");
   /*background-image: url("../../assets/login2.jpg");*/
   background-size: 100% 100%;
   background-position: center center;
   overflow: auto;
   background-repeat: no-repeat;
   position: fixed;
   line-height: 100%;
   padding-top: 150px;
 }

.logintext {
  margin-bottom: 20px;
  /*line-height: 50px;*/
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  /*text-shadow: 2px 2px 4px #000000;*/
}

.logindata {
  width: 400px;
  height: 300px;
  transform: translate(-50%);
  margin-left: 50%;
}


/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */

 .form-wrapper {
   width: 340px;
   /*background-color: rgba(41, 45, 62, 0.8);*/
   background-color: rgba(41, 45, 62, 0.75);
   color: #fff;
   border-radius: 3px;
   padding: 50px;

 }

 .form-wrapper .header {
   text-align: center;
   font-size: 35px;
   text-transform: uppercase;
   line-height: 100px;

 }

 /*.form-wrapper .input-wrapper input {*/
 /*  background-color: rgb(41, 45, 62);*/
 /*  border: 0;*/
 /*  width: 100%;*/
 /*  text-align: center;*/
 /*  font-size: 15px;*/
 /*  color: #fff;*/
 /*  outline: none;*/
 /*}*/

 /*.form-wrapper .input-wrapper input::placeholder {*/
 /*  text-transform: uppercase;*/
 /*}*/

 /*.form-wrapper .input-wrapper .border-wrapper {*/
 /*  background-image: linear-gradient(to right, #e8198b, #0eb4dd);*/
 /*  width: 100%;*/
 /*  height: 50px;*/
 /*  margin-bottom: 20px;*/
 /*  border-radius: 30px;*/
 /*  display: flex;*/
 /*  align-items: center;*/
 /*  justify-content: center;*/
 /*}*/

 /*.form-wrapper .input-wrapper .border-wrapper .border-item {*/
 /*  height: calc(100% - 4px);*/
 /*  width: calc(100% - 4px);*/
 /*  border-radius: 30px;*/
 /*}*/

 /*.form-wrapper .action {*/
 /*  display: flex;*/
 /*  justify-content: center;*/
 /*}*/

 /*.form-wrapper .action .btn {*/
 /*  width: 60%;*/
 /*  text-transform: uppercase;*/
 /*  border: 2px solid #0e92b3;*/
 /*  text-align: center;*/
 /*  line-height: 50px;*/
 /*  border-radius: 30px;*/
 /*  cursor: pointer;*/
 /*}*/

 /*.form-wrapper .action .btn:hover {*/
 /*  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);*/
 /*}*/

 /*.form-wrapper .icon-wrapper {*/
 /*  text-align: center;*/
 /*  width: 60%;*/
 /*  margin: 0 auto;*/
 /*  margin-top: 20px;*/
 /*  border-top: 1px dashed rgb(146, 146, 146);*/
 /*  padding: 20px;*/
 /*}*/

 /*.form-wrapper .icon-wrapper i {*/
 /*  font-size: 20px;*/
 /*  color: rgb(187, 187, 187);*/
 /*  cursor: pointer;*/
 /*  border: 1px solid #fff;*/
 /*  padding: 5px;*/
 /*  border-radius: 20px;*/
 /*}*/

 /*.form-wrapper .icon-wrapper i:hover {*/
 /*  background-color: #0e92b3;*/
 /*}*/



</style>
