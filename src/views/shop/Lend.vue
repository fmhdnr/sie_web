<template>
  <div class="body">
    <div style="margin-top: 70px"></div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div style="text-align: center;font-weight: bold;font-size: 30px" >My Rental List</div>
      </el-col>
      <el-col :span="6" style="text-align: left;">
        <el-button class="btn" icon="el-icon-plus" type="primary" @click="add()">Add</el-button>
      </el-col>
    </el-row>
    <div style="margin-top: 15px"></div>
    <div style="text-align: left;font-weight: bold;font-size: 20px;width:80%;margin:auto" >Idle Items</div>
    <el-row style="width:80%;margin:auto">
      <el-col :span="5" v-for="(item,index) of onSaleList" :key="index"  :offset="index%4==0?0:1">
        <el-card :body-style="{ padding: '0px' }" style="width: 300px;margin-bottom: 20px">
          <img :src="geturl(item.photo)" style="width: 300px;height:300px" @click="open(item.id)"/>
          <el-row style="width:100%;height: 100%;">
            <div style="text-align: center;font-size: 20px;font-weight: bold">{{item.name}}</div>
          </el-row>
          <el-row style="width:100%;height: 30px;margin-bottom: 5px;margin-top: 5px">
            <div style="text-align: left;">{{item.description}}</div>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="14">
              <div class="time" style="font-size: 16px;font-weight: bolder">Deposit:</div>
            </el-col>
            <el-col :span="10">
              <div style="text-align: center;color:orangered">${{item.deposit}}</div>
            </el-col>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="14">
              <div class="time" style="font-size: 16px;font-weight: bolder">Rent:</div>
            </el-col>
            <el-col :span="10">
              <div style="color:orangered;font-size: 16px;">${{item.price}}/day</div>
            </el-col>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="14">
              <div class="time" style="font-size: 16px;font-weight: bolder">State:</div>
            </el-col>
            <el-col :span="10">
              <div style="text-align: center;color:orangered;">Idle</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div style="text-align: left;font-weight: bold;font-size: 20px;width:80%;margin:auto" >Lent</div>

    <el-row style="width:80%;margin:auto">
      <el-col :span="5" v-for="(item,index) of soldList" :key="index"  :offset="index%4==0?0:1">
        <el-card :body-style="{ padding: '0px' }" style="width: 300px;margin-bottom: 20px">
          <img :src="geturl(item.photo)" style="width: 300px;height:300px" @click="open(item.id)"/>
          <el-row style="width:100%;height: 100%;">
            <div style="text-align: center;font-size: 20px;font-weight: bold">{{item.name}}</div>
          </el-row>
          <el-row style="width:100%;height: 30px;margin-bottom: 5px;margin-top: 5px">
            <div style="text-align: left;">{{item.description}}</div>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="14">
              <div class="time" style="font-size: 16px;font-weight: bolder">Rent:</div>
            </el-col>
            <el-col :span="10">
              <div style="color:orangered;font-size: 16px;">${{item.price}}/day</div>
            </el-col>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="14">
              <div class="time" style="font-size: 16px;font-weight: bolder">Lessee:</div>
            </el-col>
            <el-col :span="10">
              <div style="color:orangered;font-size: 16px;">{{item.buyers.name}}</div>
            </el-col>
          </el-row>
          <el-row style="width:100%;height: 100%;">
            <el-col :span="14">
              <div class="time" style="font-size: 16px;font-weight: bolder">Expiration:</div>
            </el-col>
            <el-col :span="10">
              <div style="color:orangered;font-size: 16px;">{{item.deadline}}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog class="dialogStyle" title="Add Merchandise" :visible.sync="addVisible" width="40%">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px">
        <el-row>
          <el-form-item label="Name" prop="name">
            <el-input v-model="addForm.name" placeholder="please input merchandise name"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Price" prop="price">
            <el-input v-model="addForm.price" placeholder="please input the price of merchandise"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Description" prop="description">
            <el-input v-model="addForm.description" placeholder="please input the description of merchandise"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Deposit" prop="deposit">
            <el-input v-model="addForm.deposit" placeholder="please input the deposit of merchandise"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Photo" align="left" prop="photo">
            <input id="my_file" type="file" hidden @change="showPic()">
            <div style="border-color: darkred;border-width:3px;width:200px;height:200px" >
              <img :src="uploadImage" style="width:200px;height:200px" @click="clickTransfer()" />
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-row>
            <el-col :span="8" :offset="8">
              <el-button type="primary" @click="submitAdd('addForm')">Confirm</el-button>
              <el-button type="warning" @click="resetForm('addForm')">Reset</el-button>
            </el-col>
          </el-row>
				</span>
    </el-dialog>
  </div>
</template>

<script>
import {getSellList} from "@/api/sell";

export default {
  data() {
    return {
      onSaleList:[],
      soldList:[],
      addVisible: false,
      uploadImage:'http://localhost:8080/static/uploadImage2.png',
      addForm:{
        name:'',
        photo:'',
        description:'',
        price:'',
        deposit:'',
        sellerId:'',
        state:1
      },
      rules:{
        name:[
          { required: true, message: 'please input merchandise name', trigger: 'blur' },
        ],
        description:[
          { required: true, message: 'please input the description of merchandise', trigger: 'blur' },
        ],
        price:[
          { required: true, message: 'please input the price of merchandise', trigger: 'blur' },
          { pattern:/^\d*(\.\d{0,2})?$/,message: 'the price format is incorrect',trigger: 'blur'}
        ],
        deposit:[
          { required: true, message: 'please input the deposit of merchandise', trigger: 'blur' },
          { pattern:/^\d*(\.\d{0,2})?$/,message: 'the deposit format is incorrect',trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    geturl(pic){
      pic= "http://localhost:8080/static/"+pic;
      console.log(pic)
      return pic;
    },
    add:function(){
      this.addVisible=true;
    },
    resetForm:function(formName){
      this.$refs[formName].resetFields();
      this.uploadImage='http://localhost:8080/static/uploadImage2.png';
      //清除选定的文件
      let obj=document.getElementById('my_file');
      obj.value='';
    },
    clickTransfer:function(){
      //隐藏了input:file样式后，将点击图片方法转换为点击input:file的方法
      document.getElementById('my_file').click();
    },
    showPic:function(){
      console.log(111);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      /*readAsDataURL 方法会读取指定的 File 对象  读取操作完成的时候result 属性将包含一个data:URL格式的
      字符串（base64编码）以表示所读取文件的内容。
      event.target是事件触发的元素  console.log("target",event.target);会输出
      <input id="my_file" type="file" hidden>
      event.target.files[0]就是文件对象*/
      reader.onload = () => {
        this.uploadImage = reader.result;
      }
    },
    submitAdd:function(formName){
      this.addForm.sellerId=localStorage.getItem("userId")
      console.log(this.addForm.sellerId)
      let formData=new FormData();
      let file = document.getElementById('my_file').files[0];
      console.log(file)
      formData.append('photo', file);
      formData.append('name', this.addForm.name);
      formData.append('description', this.addForm.description);
      formData.append('price', this.addForm.price);
      formData.append('sellerId', this.addForm.sellerId);
      formData.append('state', this.addForm.state);

      this.$refs[formName].validate(r => {
        if(r){
          console.log("jinlaile")

          this.axios({
            method:'post',
            url:"http://localhost:8080/transaction/add",
            data:formData,
            headers:{
              token:localStorage.getItem("userInfo")
            }
          }).then(r=>{
            if(r.data.data){
              //this.reload();
              this.$alert('Added successfully', 'Merchandise', {
                confirmButtonText: '确定',
                callback: this.addVisible = false,
              });
            }
          });

        }
      });
    },

  },
  created() {

    let merchandise={
      sellerId: 0,
      state:3
    }
    merchandise.sellerId=localStorage.getItem("userId")
    getSellList(merchandise).then(r=>{
      this.onSaleList=r.data.data;

    });
    merchandise.state=4
    getSellList(merchandise).then(r=>{
      this.soldList=r.data.data;
      console.log(this.soldList)
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
.btn{
  background-color: #206BC4;
}
.dialogStyle{
  text-align: center;
  font-weight: bold;
}
.dialog-footer{
  margin:auto;
}
.dialog-footer .el-button{
  width:100px;
}
</style>