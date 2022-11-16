<template>
  <div class="delete">
    <div class="title">Deleted · {{countShow}}</div>
    <el-row>
      <el-col></el-col>
      <el-col></el-col>
    </el-row>
    <el-row class="subtitle">
      <el-col :span="10">
        <button class="delbtn" @click="Delete()">Delete Permanently</button>
      </el-col>
      <el-col :span="6" :offset="8" style="margin-top: 9px"><el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count="pageCount"
          layout="prev, pager, next, jumper"
          :total="count">
      </el-pagination>
      </el-col>
    </el-row>

    <el-table
        ref="multipleTable"
        :data="mailList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-click="clickDetail">
      <!--:show-header="false"-->
      <el-table-column
          type="selection"
          min-width="50">
      </el-table-column>
      <el-table-column
          prop="receiveName"
          label="Recipient"
          min-width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p style="font-size:18px;font-weight: bold">{{ scope.row.receiveName }}</p>
            <p style="font-size:18px;color: darkgray">{{ scope.row.receiveUser }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.receiveName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          prop="sendSubject"
          label="Subject"
          min-width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div style="color:black">{{ scope.row.sendSubject }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="sendContent"
          label="Content"
          min-width="600"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div style="color:darkgray">{{ scope.row.sendContent }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="sendTime"
          label="Time"
          min-width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div style="color:darkgray">{{ scope.row.sendTime }}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {countDelete, deleteMail} from "@/api/mail";

export default {
  data(){
    return{
      mailList:[],
      count:0,
      countShow:'',
      pageSize:10,
      pageCount:5,
      currentPage:1,
    };
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let params={
        page:val,
        pageSize:this.pageSize,
        sendUser:localStorage.getItem("name")
      }
      deleteMail(params).then(r=>{
        this.mailList=r.data.data.records;
      });

    },
    Delete(){

    },
    clickDetail(row){
      console.log(row)
      this.$router.push({
        name: 'Detail',
        query:row,
      });
    }

  },
  created() {
    let params={
      page:this.currentPage,
      pageSize:this.pageSize
    }
    deleteMail(params).then(r=>{
      this.mailList=r.data.data.records;
    });

    countDelete().then(r=>{
      this.count=this.countShow=r.data.data;
    });
  }
}
</script>

<style scoped>
.delete{
  margin-top: 20px;
  margin-left: 30px;
}
.title{
  margin-bottom: 30px;
  font-weight: 700;
  font-size:18px;
}
.subtitle{
  background-color: #e3ecfa;
  height:50px;
}
.delbtn{
  margin-top: 10px;
  margin-left: 20px;
  border:none;
  height: 30px;
  width:180px;
  text-align: center;
  font-size: 16px;
  background-color:#FFF;
  font-family:Microsoft YaHei;
}
.delbtn:hover{
  background-color:#f0f0f0;
}
</style>