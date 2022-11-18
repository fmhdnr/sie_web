<template>
  <div class="compose">

    <el-row class="title">
      New Mail
    </el-row>
    <el-row >
      <el-col class="subtitle" :span="3">
        To
      </el-col>
      <el-col :span="19">
        <el-input v-model="User.receiveUser" placeholder="Email address"></el-input>
      </el-col>
    </el-row>
    <el-row >
      <el-col class="subtitle" :span="3">
        Subject
      </el-col>
      <el-col :span="19">
        <el-input v-model="User.sendSubject" placeholder="Subject"></el-input>
      </el-col>
    </el-row>
    <div style="height:20px"></div>
    <el-row>
      <el-col :span="22">
        <el-input
            type="textarea"
            :rows="15"
            placeholder="Enter content"
            v-model="User.sendContent">
        </el-input>
      </el-col>
    </el-row>
    <div style="height:80px"></div>
    <el-row >
      <el-button type="primary" @click="send()">Send</el-button>
      <el-button type="info" @click="save()">Save</el-button>
    </el-row>
    <div style="height:60px"></div>

  </div>
</template>

<script>
import {addMail} from "@/api/mail";

export default {
  data(){
    return{
      mailList:[],
      User:{
        sendState:"",
        sendUser:"",
        sendContent:'',
        sendSubject:'',
        sendEmail:"",
        receiveUser:'',
        receiveName:"",
      }
    };
  },
  created(){
    if(this.$route.query){
      console.log('you');
      this.User.receiveUser=this.$route.query.receiveUser;
      this.User.sendSubject=this.$route.query.sendSubject;
      this.User.sendContent=this.$route.query.sendContent;
    }
  },
  methods:{
    send(){
      this.User.sendState=1;
      this.User.sendUser=localStorage.getItem("name");
      this.User.sendEmail=localStorage.getItem("name")+'@163.com';
      this.User.receiveName=this.User.receiveUser;
      this.axios({
        method:'post',
        url:"http://localhost:8080/send/add",
        data:this.User,
        headers:{
          token:localStorage.getItem("userInfo")
        }
      }).then(r=>{
        if(r.data){
          this.$alert("Send successfully. ",'Notice',{
            confirmButtonText:"Confirm",
          });
        }
      });
    },
    save(){
      this.User.sendState=0;
      this.User.sendUser=localStorage.getItem("name");
      this.User.sendEmail=localStorage.getItem("name")+'@163.com';
      this.User.receiveName=this.User.receiveUser;
      this.axios({
        method:'post',
        url:"http://localhost:8080/send/add",
        data:this.User,
        headers:{
          token:localStorage.getItem("userInfo")
        }
      }).then(r=>{
        if(r.data){
          this.$alert("Save to drafts.",'Notice',{
            confirmButtonText:"Confirm",
          });
        }
      });
    },
  }
}
</script>

<style scoped>
.compose{
  margin-top: 20px;
  margin-left: 30px;
}
.title{
  margin-bottom: 30px;
  font-weight: 530;
  font-size:18px;
}
.subtitle{
  line-height: 40px;
  height:40px;
  margin-bottom: 15px;
}
.el-button{
  width:120px;
  height:40px;
}
</style>