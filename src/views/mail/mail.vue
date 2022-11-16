<template>
  <div class="mail">
    <div class="home_content">


          <div class="home_content_left">
            <div class="btn-basic">
              <button class="mybtn" @click="Compose()"><i class="el-icon-edit"></i><span class="main-btn">Compose</span></button>
            </div>
            <div class="btn-basic">
              <button class="mybtn" @click="Inbox()"><i class="el-icon-receiving"></i><span class="main-btn">Inbox</span></button>
            </div>
            <div class="gip2"></div>
            <div class="gip"></div>
            <div class="btn-basic2">
              <button class="mybtn2" @click="Sent()"><i class="el-icon-check"></i><span class="main-btn">Sent</span></button>
            </div>
            <div class="btn-basic2">
              <button class="mybtn2" @click="Drafts()"><i class="el-icon-document-remove"></i><span class="main-btn">Drafts</span></button>
            </div>
            <div class="btn-basic2">
              <button class="mybtn2" @click="Delete()"><i class="el-icon-delete"></i><span class="main-btn">Deleted</span></button>
            </div>

          </div>


          <div class="home_content_right">
            <router-view></router-view>
          </div>

    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{

    };
  },
  created(){
    this.$router.push({
      name: 'Compose',
    });
  },
  methods:{
    Compose(){
      this.$router.push({
        name: 'Compose',
      });
    },
    Inbox(){
      this.$router.push({
        name: 'Inbox',
      });
    },
    Sent(){
      this.$router.push({
        name: 'Sent',
      });
    },
    Drafts(){
      this.$router.push({
        name: 'Drafts',
      });
    },
    Delete(){
      this.$router.push({
        name: 'Delete',
      });
    }
  }
}
</script>

<style scoped>
.mail{
  margin-top: 60px;
  width: 100%;
  height: 100%;
  background-color: #F1F5F9;
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  background-repeat: no-repeat;
  position: fixed;
}
.home_content{
  margin-top: 10px;
  text-align: left;
}
.btn-basic{
  padding-left: 10px;
  height:70px;
}
.mybtn{
  border: none;
  height:50px;
  width:230px;
  text-align: left;
  font-weight: 700;
  font-size: 18px;
  font-family:Microsoft YaHei;
  background-color:#FFF;
}
.btn-basic2{
  padding-left: 10px;
  height:55px;
}
.mybtn2{
  border: none;
  height:40px;
  width:230px;
  text-align: left;
  font-size: 16px;
  font-family:Microsoft YaHei;
  background-color:#FFF;
}
.el-icon-edit{
  color:#47a4fb;
  font-size: 20px;
  margin-right:30px;
  font-weight: 700;
}
.el-icon-receiving{
  color:#f3be28;
  font-size: 20px;
  margin-right:30px;
  font-weight: 700;
}
.el-icon-check{
  color:black;
  font-size: 20px;
  margin-right:30px;

}
.el-icon-document-remove{
  color:black;
  font-size: 20px;
  margin-right:30px;

}
.el-icon-delete{
  color:black;
  font-size: 20px;
  margin-right:30px;

}

.mybtn:hover{
  background-color:#f0f0f0;
}
.mybtn:focus{
  background-color:#4a90e2;
}
.mybtn2:hover{
  background-color:#f0f0f0;
}
.mybtn2:focus{
  background-color:#4a90e2;
}
.gip{
  height: 70px;
}
.gip2{
  height: 10px;
  background-color: #f0f0f0;
}
.home_content_left{
  padding-top: 20px;
  width:250px;
  height:calc(100vh - 60px);
  margin: 0px 8px;
  background-color:#FFF;
  border-style: solid;
  border-width: 1px;
  border-color: #f0f0f0;
  position:fixed /*保证不随滚动条滑动*/
}
.home_content_right{
  margin-left: 270px;
  background-color:#FFF;
  width:calc(100% - 270px);
  height:calc(100vh - 60px);
  border-style: solid;
  border-width: 1px;
  border-color: #f0f0f0;
}
</style>