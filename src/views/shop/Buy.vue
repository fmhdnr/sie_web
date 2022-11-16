<template>
  <div class="body">
    <div style="margin-top: 70px"></div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div style="text-align: center;font-weight: bold;font-size: 30px" >All Merchandise On Sale</div>
      </el-col>
      <el-col :span="6" style="text-align: left;">
        <el-button class="btn" icon="el-icon-goods" type="primary" @click="pay()">Payment</el-button>
      </el-col>
    </el-row>
    <div style="margin-top: 15px"></div>
    <el-row style="width:80%;margin:auto">
      <el-col :span="5" v-for="(item,index) of merchList" :key="index"  :offset="index%4==0?0:1">
        <el-card :body-style="{ padding: '0px' }" style="width: 300px;margin-bottom: 20px">
          <img :src="geturl(item.photo)" style="width: 300px;height:300px" @click="open(item.id)"/>
          <el-row style="width:100%;height: 100%;">
            <div style="text-align: center;font-weight: bold">{{item.name}}</div>
          </el-row>
          <el-row style="width:100%;height: 30px;margin-bottom: 5px;margin-top: 5px">
            <div style="text-align: left;">{{item.description}}</div>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="16">
              <div class="time" style="color:orangered;font-size: 16px;">${{item.price}}</div>
            </el-col>
            <el-col :span="4">
              <el-button type="text"  @click="insertIntoCart(item)" style='margin-top: -20px;'>
                <i class="el-icon-shopping-cart-2" style="color:royalblue ;font-size: 16px;"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {merchList} from '@/api/buy.js'
export default {
  data() {
    return {
      merchList:[],
      itemList:[]
    };
  },
  methods: {
    geturl(pic){
      pic= "http://localhost:8080/static/"+pic;
      console.log(pic)
      return pic;
    },
    insertIntoCart(item){
      this.itemList.push(item);
      this.$alert("It has been added to the shopping list",'Notice',{
        confirmButtonText:"Confirm",
      });
    },
    pay(){
      console.log(this.itemList)
      this.$router.push({
        name: 'Payment',
        query:{
          list:this.itemList,//路由传递数组
        }
      });
    }

  },
  created() {
    let user={
      id:localStorage.getItem("userId")
    }
    merchList(user).then(r=>{
      this.merchList=r.data.data;

    });

  }
}
</script>

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
</style>