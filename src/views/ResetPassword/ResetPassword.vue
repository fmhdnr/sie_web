<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">

        <div class="form-wrapper" >
          <h5 >Reset password</h5>
          <div class="d2">
            <el-link :underline="false" class="btn1" @click="$router.push({path:'/login'})" icon="el-icon-arrow-left" type="primary">Return</el-link>
<!--            <el-button class="btn1" @click="$router.push({path:'/login'})"  icon="el-icon-arrow-left" disabled>返 回</el-button>-->
          </div>
          <el-steps :active="active" finish-status="success" align-center>
          <el-step title="Account verification"></el-step>
          <el-step title="Finish setting"></el-step>
        </el-steps>
        <br>
          <div v-if="active=='0'">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-position="left"
                label-width="200px"
                class="demo-ruleForm"
            >
              <el-form-item prop="name" label-width="150px">
                <span slot="label">
                <span style="color: #173f8f">Name</span>
                </span>
                <el-input v-model="ruleForm.name" style="width: 220px">
                </el-input>
              </el-form-item>
              <el-form-item prop="question"   label-width="150px">
                <span slot="label">
                <span style="color: #173f8f">Choose question</span>
                </span>
                <el-select v-model="ruleForm.question" class="wid" style="width: 220px" placeholder="Please select">
                  <el-option
                      v-for="item in Question"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="answer" label-width="150px">
                <span slot="label">
                <span style="color: #173f8f">answer</span>
                </span>
                <el-input v-model="ruleForm.answer" type="text" style="width: 220px">
                </el-input>
              </el-form-item>
              <el-form-item label-width="150px" prop="pass">
              <span slot="label">
                <span style="color: #173f8f">Password</span>
                </span>
                <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                    style="width: 220px"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="150px" prop="password">
              <span slot="label">
                <span style="color: #173f8f">Confirm Password</span>
                </span>
                <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    style="width: 220px"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button  @click="submitForm('ruleForm')" round plain type="info">Confirm</el-button>



          </div>
          <div v-if="active=='1'">
            <router-link to="/login">
              <el-button style="margin-left: 10px" round plain type="info" >Sign in</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("The passwords entered twice are inconsistent!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      Question:[
        {
          value: 'who is your dad?',
          label: 'who is your dad?'
        },
        {
          value: 'who is your mom?',
          label: 'who is your mom?'
        }
      ],
      ruleForm: {
        name: "",
        question:"",
        answer:"",
        pass: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "Name cannot be empty!", trigger: "blur" },
        ],
        question :[
          {require: true,trigger: "blur"},
          {
            validator:function(rule,value,callback){
              if (value.length === 0) {
                callback(new Error("Please select a question"));
              } else
                callback();
            }
          }
        ],

        answer:[
          { required: true, message: "Please enter the answer", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true;  // 提交按钮显示加载动画
        if (valid) {
          let _this = this;
          let param = {
            name: _this.ruleForm.name,
            question:_this.ruleForm.question,
            answer:_this.ruleForm.answer,
            password: _this.ruleForm.password,
          };
          this.axios({     // axios 向后端发起请求
            url: "/api/user/forgetPassword",  // 请求地址
            method: "put",             // 请求方法
            headers: {                  // 请求头
              "Content-Type": "application/json",
            },
            data: JSON.stringify(param),
          }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
            console.log(res);
            if (res.data.code === 200) {  // 当响应的编码为 0 时，说明注册成功
              // 显示后端响应的成功信息
              console.log(res);
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              if (this.active++ > 2) this.active = 0;
            }else{  // 当响应的编码不为 0 时，说明注册失败
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
        } else { // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
  }
}


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
.d2 {
  min-width: 100%;
  height: 40px;
  /*position: relative;*/
  display:flex;
  justify-content:flex-end;
  margin-left:-20px;
  margin-top:-30px

}
.btn1 {
  position: relative;
  right: 315px;
  top: -105px;
  /*margin-left:-20px;*/
  /*margin-top:-30px*/
}


.loginbody {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  /*background-image: url("../../assets/login2.jpg");*/
  background-image: url("../../assets/login2.jpg");
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
  color:deepskyblue;
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
