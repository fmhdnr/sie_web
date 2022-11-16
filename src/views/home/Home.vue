<template>
  <div class="body">
    <div>
    <el-card class="box-card">
        <span>
          <h2 style="color: #206BC4">Welcome to SIE</h2>
        </span>
        <span>
          <h6 style="color: #616876">Hello {{ user.name }}! Here is {{ user.schoolid }}.</h6>
        </span>
<!--      <span>-->
<!--          <h6 style="color: darkgrey">Here is {{ user.schoolid }}.</h6>-->
<!--        </span>-->
      <el-row>
      <span>
          <el-col :span="5" :offset="5">
        <el-input placeholder="Search" v-model="input" class="searchClass" >
          <i slot="suffix" class="el-icon-search el-input__icon" style="margin-top: -5px;margin-right: 30px"></i>
        </el-input>
            <el-autocomplete
                class="inline-input"
                v-model="input"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false">
<!--                @select="handleSelect"-->
            </el-autocomplete>
      </el-col>
      <el-col :span="1" :offset="7">
        <el-button class="search-club" @click="searchAll()">Search</el-button>
      </el-col>
        </span>
      </el-row>
    </el-card>
        <el-row class="row2">
          <el-col :span="5" :offset="3" >
            <p style="margin-left: 100px;margin-top: -5px;" v-if="input.length>0">Search results for {{input}}</p>
            <h5 style="font-weight: lighter;margin-top: -10px;color: #616876;height: 10px" v-if="total>0">{{ total }} results</h5>
          </el-col>
        </el-row>
        <el-row class="row3">
          <el-tabs :tab-position=tabPosition >
            <el-tab-pane :label="'clubs('+clubCount+')'" v-if="clubs.length > 0" >
              <el-col  v-for="item in clubs" :key="item.id" class="card-col">
              <el-card class="card-club" shadow="hover" >
                <img :src="item.imageUrl" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.name" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.description }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>

            <el-tab-pane :label="'merchandises('+merchandiseCount+')'" v-if="merchandises.length > 0">
              <el-col class="card-col" v-for="item in merchandises" :key="item.id">
              <el-card class="card-club" shadow="hover" >
                <!--          <el-image :src="getImage(item.imageUrl)"  style="width: 250px;height: 150px"  alt="图片"></el-image>-->
                                <img :src="item.imageUrl" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.name" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.description }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>
            <el-tab-pane :label="'tutors('+tutorCount+')'" v-if="tutors.length > 0">
              <el-col class="card-col" v-for="item in tutors" :key="item.tid">
              <el-card class="card-club" shadow="hover" >
                <!--          <el-image :src="getImage(item.imageUrl)"  style="width: 250px;height: 150px"  alt="图片"></el-image>-->
                                <img :src="item.image" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.tname" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.tid,name:item.tname}}" style="color: black;text-decoration: none;">{{ item.tname }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.tcontents}}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>
            <el-tab-pane :label="'users('+userCount+')'" v-if="users.length > 0">
              <el-col class="card-col" v-for="item in users" :key="item.key">
              <el-card class="card-club" shadow="hover"  >
                <!--          <el-image :src="getImage(item.imageUrl)"  style="width: 250px;height: 150px"  alt="图片"></el-image>-->
                                <img :src="item.imageUrl" :ref="item.id" class="image" style="width: 200px;height: 80px"  alt="">
                <el-divider></el-divider>
                <el-descriptions :title="item.name" :colon="false">
                  <template slot="title">
                    <router-link :to="{path:'/clubDetail',query:{id:item.id,name:item.name}}" style="color: black;text-decoration: none;">{{ item.name }}
                    </router-link>
                  </template>
                  <el-descriptions-item>{{ item.description }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
              </el-col>
            </el-tab-pane>

          </el-tabs>

        </el-row>

    </div>
  </div>



</template>

<script>
import {getUserInfo} from '@/api/login.js'
import jwtDecode from 'jwt-decode'


export default {

  data() {
    return {
      input: '',
      user: {
        name: "",
        token: "",
      },
      total:'',
      clubCount:'',
      merchandiseCount:'',
      tutorCount:'',
      userCount:'',
      all:[],
      clubs:[],
      merchandises:[],
      tutors:[],
      users:[],
      restaurants:'',
      tabPosition: 'left',
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    // querySearch(queryString, cb) {
    //   let clubs = this.clubs;
    //   let results = queryString ? clubs.filter(this.createFilter(queryString)) : clubs;
    //   // 调用 callback 返回建议列表的数据
    //   let temp = [];
    //   for(let i=0; i<results.length ;i++){
    //     temp.push(results[i].name);
    //   }
    //   console.log(results);
    //   console.log(temp);
    //   cb(temp);
    // },
    // createFilter(queryString) {
    //   return (restaurant) => {
    //     console.log(restaurant);
    //     console.log(restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //     return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },
    querySearch(queryString, cb) {
      var restaurants = this.clubs;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getImage: async  function(url){
      let imgUrll ='';
      return  await this.axios({
        method: 'get',
        url: "/api/common/download?name="+url ,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "token": this.token  // 必须添加的请求头
        },
        responseType: "arraybuffer", // 关键 设置 响应类型为二进制流
      }).then(function (response) {  // 将后台的图片二进制流传华为base64
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }).then(function (data){
        imgUrll = data
        console.log(imgUrll)
        return imgUrll;
      });
    },
    searchAll(){
      this.axios({
        url:"/api/search?name="+this.input,
        method: "get",             // 请求方法
        headers: {                  // 请求头
          "Content-Type": "application/json",
        },
      }).then((response) => { // 当收到后端的响应时执行该括号内的代码，res为响应信息，也就是后端返回的信息
        if (response.data.code === 200) {
          console.log(response.data.data)
          //console.log(response.data.data.length)
          // this.total = response.data.data.length
          this.all = response.data.data
          console.log(this.all)
          //club照片
          let temp = response.data.data.clubs
          console.log(temp);
          for (let i =0; i<temp.length; i++){
            this.getImage(temp[i].imageUrl).then(value => {
              console.log(value);
              temp[i].imageUrl = value;
              this.clubData = temp;
            })
          }
          this.clubs = temp;
          this.clubCount = response.data.data.clubCount
          this.merchandiseCount = response.data.data.merchandiseCount
          this.tutorCount = response.data.data.tutorCount
          this.userCount = response.data.data.userCount
          this.tutors = response.data.data.tutors
          this.merchandises = response.data.data.merchandises
          this.users = response.data.data.users
          this.total = response.data.data.allCount
          console.log("查询失败原因：", response.data.message)
        }
      }).catch((error) => {
        console.log("查询失败的原因：", error)
      })
    },
    logout() {
      // 移除本地用户登录信息
      localStorage.removeItem("userInfo")
      // 跳转页面到登录页
      this.$router.push('/login');
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },

  },
  created() {
    if (localStorage.getItem('userInfo')) {
      getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
        this.user.name = res.data.data.name
        this.user.schoolid = res.data.data.schoolId
        if(this.user.schoolid==1){
          this.user.schoolid = "Northeastern University"
        }else {
          this.user.schoolid = "The University of Texas at Arlington"
        }
      })
    }
  },
  mounted() {
    if (localStorage.getItem('userInfo')) {
      // 将用户信息存储到sessionStorage中
      this.user.token = localStorage.getItem('userInfo');
    }
    this.searchAll()
    this.restaurants = this.clubs;
  },

};
</script>
<style>
.labelcolor{
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
}
.el-tabs__item{
  height: 50px;
  color: black;
  font-weight: lighter;
  width: 200px;

}
.el-tabs__nav-scroll{

  margin: fill;
}

.el-tabs__item.is-active {
  color: black;
  font-weight: normal;
  background-color: #E9EFF7;
}
/*去掉切换时el-tab-pane底部的蓝色下划线*/
.el-tabs__active-bar {
  background-color: transparent !important;
}

/*去掉tabs底部的下划线*/
.el-tabs__nav-wrap::after {
  position: static !important;
}
</style>
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
.box-card {
  width: 1000px;
  /*height: 150px;*/
  background-color: #DBE7F4;
  position: absolute;
  top:90px;
  left: 0;
  right:0;
  margin: auto;
}
.searchClass {
  width: 500px;
  height: 1px;
}

.search-club {
  height: 30px;
  background-color: #206BC4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

}
/deep/ .el-input__inner{
  width: 450px;
  height: 30px;
}
.row2 {
  margin-top: 300px;
  height: 24px;
  min-height: 1px;
  text-decoration-color: black;
  font-size: 20px;
  font-weight: normal;
}
.row3{
  margin-top: 60px;
  margin-left: 330px;

}
.card-club {
  width: 300px;
  height: 250px;
}
.card-col {
  /*margin-top: 30px;*/
  margin-bottom: 30px;
  margin-left: 5%;
  width: 30%;
}

</style>
