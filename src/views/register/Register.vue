<template>
  <div class="loginbody">
    <div class="logindata">
      <div class="logintext">

        <div class="form-wrapper" >
      <h5 >Create new account</h5>
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
                <span style="color: white">Name</span>
          </span>
          <el-input v-model="ruleForm.name" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item prop="email" label-width="150px">
          <span slot="label">
                <span style="color: white">Email</span>
          </span>
            <el-input v-model="ruleForm.email" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item prop="question" label-width="150px" :required="true">
          <span slot="label">
                <span style="color: white">Question</span>
          </span>
          <el-select v-model="ruleForm.question" clearable placeholder="Please select" style="width: 220px">
            <el-option
                v-for="item in Question"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="answer" label-width="150px">
          <span slot="label">
                <span style="color: white">Answer</span>
          </span>
          <el-input v-model="ruleForm.answer"  style="width: 220px"></el-input>
        </el-form-item>
          <el-form-item prop="school" label-width="150px" :required="true">
            <span slot="label">
                <span style="color: white">School</span>
          </span>
            <el-select v-model="ruleForm.school" placeholder="Please select" clearable style="width: 220px">
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

        <el-form-item prop="pass" label-width="150px">
          <span slot="label">
                <span style="color: white">Password</span>
          </span>
          <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item  prop="password" label-width="150px">
          <span slot="label">
                <span style="color: white">Confirm Password</span>
          </span>
          <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              style="width: 220px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')" round plain >Sign up</el-button>
        <el-button @click="resetForm('ruleForm')" round plain type="warning">Reset</el-button>
        <el-button @click="goBack" round plain type="info">Return</el-button>
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
        email:"",
        question:"",
        answer:"",
        school:"",
        pass: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "Name cannot be empty!", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Please enter your email", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value) == false) {
                callback(new Error("Email format error"));
              } else {
                //????????????
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        question :[
          { require: true,trigger: "blur"},
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
        school :[
          {require: true,trigger: "blur" },
          {
            validator:function(rule,value,callback){
              if (value.length === 0) {
                callback(new Error("Please select a school"));
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
          this.loading = true;  // ??????????????????????????????
          if (valid) {
            let _this = this;
            // if(_this.resetForm.school==="Northeastern University"){
            //   _this.resetForm.school = 1
            // }else {
            //   _this.resetForm.school = 2
            // }
            let param = {
              name: _this.ruleForm.name,
              password: _this.ruleForm.password,
              email:_this.ruleForm.email,
              question:_this.ruleForm.question,
              answer:_this.ruleForm.answer,
              schoolId:_this.ruleForm.school
            };
            this.axios({     // axios ?????????????????????
              url: "/api/user/signUp",  // ????????????
              method: "post",             // ????????????
              headers: {                  // ?????????
                "Content-Type": "application/json",
              },
              data: JSON.stringify(param),
            }).then((res) => { // ?????????????????????????????????????????????????????????res ????????????????????????????????????????????????
              console.log(res);
              if (res.data.code === 200) {  // ????????????????????? 0 ????????????????????????
                // ?????????????????????????????????
                console.log(res);
                this.$router.push("/login")
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });

              }else{  // ???????????????????????? 0 ????????????????????????
                // ?????????????????????????????????
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                });
              }
              // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
              _this.loading = false;
              console.log(res);
            });
          } else { // ?????????????????????????????????????????????????????????????????????????????????
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
</style>
