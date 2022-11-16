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
        <el-input v-model="receive" placeholder="Email address"></el-input>
      </el-col>
    </el-row>
    <el-row >
      <el-col class="subtitle" :span="3">
        Subject
      </el-col>
      <el-col :span="19">
        <el-input v-model="subject" placeholder="Subject"></el-input>
      </el-col>
    </el-row>
    <div style="height:20px"></div>
    <el-row>
      <el-col :span="22">
        <el-input
            type="textarea"
            :rows="15"
            placeholder="Enter content"
            v-model="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="height:80px"></div>
    <el-row >
      <el-button type="primary">Send</el-button>
      <el-button type="info">Save</el-button>
    </el-row>
    <div style="height:60px"></div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      mailList:[],
      subject:'',
      receive:'',
      textarea:'',
    };
  },
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