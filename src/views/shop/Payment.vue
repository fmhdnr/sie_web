<template>
  <div class="body">
    <div style="margin-top: 70px"></div>
    <div style="text-align: center;font-weight: bold;font-size: 30px" >My Shopping List</div>
    <div style="margin-top: 15px"></div>
    <el-form :rules="rules" :model="addFrom" ref="addFrom">
      <el-form-item prop="card">
        <el-input v-model="addFrom.card"  placeholder="Please input credit card number" style="background-color:rgba(255,218,180,0.5);width:500px;"></el-input>
        <el-button style="margin-left: 20px" type="primary" @click="pay()">Pay</el-button>
      </el-form-item>
    </el-form>
    <el-row style="width:80%;margin:auto">
      <el-col :span="5" v-for="(item,index) of itemList" :key="index"  :offset="index%4==0?0:1">
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
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="this.itemList.length==0" style="margin-top: 200px;color:grey;font-size:30px">
      There is no merchandise.
    </div>


  </div>

</template>

<script>
import {buy} from "@/api/buy";
export default {

  data() {
    return {
      card:"",
      itemList:[],
      addFrom:{
        card:"4013864618847798",
      },
      rules:{
        card:[
          { required: true, message: 'Please input credit card number', trigger: 'blur' },
          { pattern:/^\d{16}$/,message: 'Credit card number format is incorrect',trigger: 'blur'},
        ]
      }
    };
  },
  created() {
    if(this.$route.query.list){
      this.itemList=this.$route.query.list;
    }
  },
  methods:{
    geturl(pic){
      pic= "http://localhost:8080/static/"+pic;
      console.log(pic)
      return pic;
    },

    pay(){
      let merchandise={
        id:this.itemList[0].id,
        state:2,
        buyId:localStorage.getItem("userId"),
      }
      buy(merchandise);
      if(this.addFrom.card.match(/^4[0-9]{12}(?:[0-9]{3})?$/)){
        this.$alert("This is a visa credit card. Payment Succeeded. ",'Notice',{
          confirmButtonText:"Confirm",
          callback:this.itemList.length=0
        });
      }
      else if(this.addFrom.card.match(/^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/) ){
        this.$alert("This is a maestro credit card. Payment Succeeded.",'Notice',{
          confirmButtonText:"Confirm",
          callback:this.itemList.length=0
        });
      }
      else{
        this.$alert("This is a third party credit card. Payment Succeeded.",'Notice',{
          confirmButtonText:"Confirm",
          callback:this.itemList.length=0
        });
      }

    }
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