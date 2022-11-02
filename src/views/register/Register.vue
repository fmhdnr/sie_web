<template>
  <div>
    <el-card class="box-card">
      <h2>注册</h2>
      <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="200px"
          class="demo-ruleForm"

      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email" ></el-input>
        </el-form-item>
        <el-form-item label="Question" prop="question">
          <el-select v-model="ruleForm.question" clearable placeholder="Please select" >
            <el-option
                v-for="item in Question"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Answer" prop="answer">
          <el-input
              v-model="ruleForm.answer"
          ></el-input>

        </el-form-item>
          <el-form-item label="School" prop="school">
            <el-select v-model="ruleForm.school" placeholder="Please select" clearable>
              <el-option
                  v-for="item in School"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
<!--                <span style="float: left">{{ item.label }}</span>-->
<!--                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Password" prop="pass">
          <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="password">
          <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')"
        >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      School:[
        {
        value: '1',
        label: 'Northeastern University'
        },
        {
        value: '2',
        label: 'The University of Texas at Arlington'
        }
      ],
      Question:[
        {
          value: 'Dad',
          label: 'who is your dad?'
        },
        {
          value: 'Mom',
          label: 'who is your mom?'
        }
      ],
      ruleForm: {
        name: "",
        email:"",
        question:"",
        answer:"",
        school:"",
        pass: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value) == false) {
                callback(new Error("请输入邮箱"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        question :[
          {require: true,trigger: "blur"},
          {
            validator:function(rule,value,callback){
              if (value.length === 0) {
                callback(new Error("请选择问题"));
              } else
                callback();
            }
          }
        ],
        answer:[
          { required: true, message: "请输入回答", trigger: "blur" }
        ],
        school :[
          {require: true,trigger: "blur" },
          {
            validator:function(rule,value,callback){
              if (value.length === 0) {
                callback(new Error("请选择学校"));
              } else
                callback();
              }
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.loading = true;  // 提交按钮显示加载动画
          if (valid) {
            let _this = this;
            if(_this.resetForm.school==="Northeastern University"){
              _this.resetForm.school = 1
            }else {
              _this.resetForm.school = 2
            }
            let param = {
              name: _this.ruleForm.name,
              password: _this.ruleForm.password,
              email:_this.ruleForm.email,
              question:_this.ruleForm.question,
              answer:_this.ruleForm.answer,
              schoolId:_this.ruleForm.school
            };
            this.axios({     // axios 向后端发起请求
              url: "/api/user/signUp",  // 请求地址
              method: "post",             // 请求方法
              headers: {                  // 请求头
                "Content-Type": "application/json",
              },
              data: JSON.stringify(param),
            }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
              console.log(res);
              if (res.data.code === "200") {  // 当响应的编码为 0 时，说明注册成功
                // 显示后端响应的成功信息
                console.log(res);
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: auto auto;
  width: 500px;
}
.login-from {
  margin: auto auto;
}
</style>
