<template>
  <div class="title">
    <el-row>
      <el-col :span="8">
        <span class="user">{{send.sendUser}}</span>  <span style="margin:0px 10px">To</span>  <span class="user">{{send.receiveName}}</span>
      </el-col>
      <el-col :span="4" :offset="12">
        <div class="time">{{send.sendTime}}</div>
      </el-col>
    </el-row>
    <div class="Content">
      {{send.sendContent}}
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      send:{

      },
    };
  },
  created(){
    if(this.$route.query){
      this.send=this.$route.query;
      console.log(this.send);
    }
  }

}
</script>

<style scoped>
.title{
  margin-top: 50px;
  margin-left: 30px;
}
.user{
  font-size:20px;
}
.time{
  color:darkgray;
  margin-top: 15px;

}
.Content{
  margin-top: 100px;
}
</style>