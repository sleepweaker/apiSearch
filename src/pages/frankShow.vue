<template>
<div>
<div class="head clear-float">
        <img @click="to" src="../assets/login-log.png">
        <h1 @click="toSearch" >搜索列表</h1>
    </div>
<div class="main">
    <div class="main-color">
    <div class="prjname clear-float">
        <h1 class="fontcolor">项目名：{{this.dataShow.prj_name}}</h1>
        <p class="branch">分支:{{this.dataShow.branch}}</p>
    </div>
    
    <div class="desc fontcolor clear-float">
        <p class="title">接口描述：</p>
        <p class="message" ref="descTitle" title=''>{{this.dataShow.desc}}</p>
        <!-- <div class="author clear-float">
            <div v-for="item in this.dataShow.authors" class="authorMessage">
                <p>{{item.name}}</p>
                <p>{{item.mail}}</p>
            </div>
        </div> -->
    </div>
    <!-- <div class="id-resp clear-float"> -->
    <div class="ID">
        <div class="IDtitle clear-float">
            <p class="method">Method</p>
            <p style="width:70%">Path</p>
        </div>
        <div class="IDmessage clear-float">
            <p class="method">{{this.dataShow.method}}</p>
            <p style="width:70%">{{this.dataShow.path}}</p>
        </div>
    </div>
    <div class="Resp">
        <h2 class="Resptitle">响应:</h2>
        <div v-for="(item,index) in this.respData" class="clear-float">
             <Resp-Show ref="resp" :item="item"></Resp-Show>
        </div>
    </div>
    <!-- </div> -->
    <div class="header-query clear-float">
    <div class="Params">
        <h2>请求头:</h2>
        <div class="Paramstitle clear-float">
            <p>key</p>
            <p>val</p>
        </div>
        <div v-for="item in this.dataShow.headers" class="Paramsmessage clear-float">
            <p>{{item.key}}</p>
            <p>{{item.val}}</p>
        </div>
    </div>
    <div class="Querys">
        <h2>URL参数:</h2>
        <div class="Querystitle clear-float">
            <p>参数名</p>
            <p>参数描述</p>
        </div>
        <div v-for="item in this.dataShow.querys" class="Querysmessage clear-float">
            <p>{{item.name}}</p>
            <p>{{item.desc}}</p>
        </div>
    </div>
    </div>
    
    <div class="Body">
        <h2>请求体:</h2>
        <div class="Bodytitle clear-float">
            <p>参数名</p>
            <p>参数描述</p>
        </div>
        <div v-for="item in this.dataShow.body" class="Bodymessage clear-float">
            <div class="body-and clear-float" style="height=100%">
            <p class="p">{{item.name}}</p>
            <p  class="p">{{item.desc}}</p>
            </div>
        </div>
        <div  class="json-show">
            <h3>JSON请求体：</h3>
            <div v-for="item in this.jsonData">
                <pre>{{item}}</pre>
            </div>
        </div>
    </div>
    <div class="SubApis">
        <h2>负责人:</h2>
        <div class="SubApistitle clear-float">
            <p class="method">姓名：</p>
            <p class="click">邮箱:</p>
        </div>
        <div v-for="item in this.dataShow.authors" class="SubApismessage clear-float">
            <p class="method">{{item.name}}</p>
            <p class="click">{{item.mail}}</p>
        </div>
    </div>
    <div class="SubApis">
        <h2>依赖接口:</h2>
        <div class="SubApistitle clear-float">
            <p style="width:70%">API</p>
            <p class="method">Method</p>
        </div>
        <div v-for="item in this.dataShow.sub_apis" class="SubApismessage clear-float">
            <p class="click" @click="apiSearch(item.api)">{{item.api}}</p>
            <p class="method">{{item.method}}</p>
        </div>
    </div>
</div>
</div>
</div>
</template>
<script>
 import axios from 'axios'
 import RespShow from '../components/respShow';
export default {
    data(){
        return {
            includedComponents: "test-keep-alive",
            dataShow:"",
            dataResp:"",
            // test2:"安徽附件是看能否大家好广佛iu扼腕部分尽快发NSA客服呢哇妇女金额为诺福克三分科三废物那帮弗兰克娃儿那个坑哦呢就跟别人你刚来咯不过",
            resvalue:true,
            respData:[],
            jsonData:[],
            
            // test1:{"code":0, "msg":"success", "msg1":"success","msg2":"success","msg3":{"code":0, "msg":"success", "msg1":"success","msg2":"success","msg3":"success","msg4":"success","msg5":"success","msg6":"success","msg7":"success","msg8":"success","msg9":"success","msg0":"success","msg11":"success","data":""},"msg4":"success","msg5":"success","msg6":"success","msg7":"success","msg8":"success","msg9":"success","msg0":"success","msg11":"success","data":""},
        }
    },  
    mounted(){
            let _this = this;
            let id = this.$route.query.dataId
            axios.get('http://frank.onenet.com/frank-api?id='+id,{
                }).then(function(response){
                _this.dataShow= JSON.parse(response.data.data);
                _this.$refs.descTitle.title = _this.dataShow.desc;
                _this.dataShow.body.forEach(_this.jsonCheck);
                // _this.dataShow.resp="["+_this.dataShow.resp+"]";
                // console.log(_this.dataShow.resp.length)
                _this.respCheck(_this.dataShow.resp);
                // _this.dataShow.resp = JSON.stringify(JSON.parse(_this.dataShow.resp), null, 4);
                
                }).catch(function(err){
                    console.log(err);
                });
        },
    methods:{
        apiSearch(e){
           
            this.$router.push({path:"/show",query:{data:e,type:"api"}})
        },
        to(){
            this.$router.push({path:"/"})
        },
        toSearch(){
            this.$router.push({path:"/show",query:{type:"api"}})
        },
        jsonCheck(e){
            if(e.name == "*json*"){
                this.jsonData.push(JSON.stringify(JSON.parse(e.desc), null, 4))
                this.dataShow.body.splice(this.dataShow.body.indexOf(e),1)
            }
        },

        respCheck(e){
            let i = 0;
            let str = "";
            for (let index = 0; index < e.length; index++) {
                if (e[index] =="{") {
                    i++;

                }else if(e[index] == "}"){
                    i--;
                }
                str = str + e[index]
                if (i == 0) {
                    this.respData.push(JSON.stringify(JSON.parse(str), null, 4))
                    str = "";
                    console.log(this.respData)
                }
            }
        }
    },
      components: {
      RespShow
  }
    
}

</script>
<style scoped>
    .clear-float:after{
        display:block;
        clear:both;
        content:"";
        visibility:hidden;
        height:0
    }
    .clear-float{
        zoom:1
    }
    body{
        background-color: #fdfcf8;
    }
    p{
        height: auto;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
    }
    .head{
        width: 100%;
        padding-left: 50px;
        padding-top: 5px;
        margin: 0 auto;
    }
    .head img{
        float: left;
        width: 150px;
        cursor: pointer;
    }
    .head h1{
        float: left;
        height: 67.5px;
        /* width: 20%; */
        text-align: center;
        line-height: 67.5px;
        cursor: pointer;
        margin-left: 50px;
    }
    .main{
        padding-top: 20px;
        background-color: #f5f6f7;
        
    }
    .main-color{
        width: 60%;
        min-width: 1027px;
        margin: 0 auto;
        background-color: #fff;
    }
    .prjname{
        width: 90%;
        margin: 0 auto;
        padding-bottom: 20px;
        /* height: 80px; */
        font-size: 20px;
    }
    .branch{
        float: right;
        margin-right: 10px;
        color: #515a6e;
    }
    .fontcolor{
        color: #515a6e;
    }
    .desc{
        /* padding-top: 30px; */
        width: 90%;
        margin: 0 auto;
        font-size: 18px;
        height: 60px;
        border-bottom: 1px solid #aaa;
    }

    .desc p{
        float: left;
    }
    .title{
        width: 12%;
        font-weight: 900;
    }
    .message{
        /* width: 88%; */
        font-weight: 900;
        display: block;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
    }
    /* .author{
        float: right;
        height: 100px;
    }
    .authorMessage{
    }
    .authorMessage p{
        margin-left: 10px;
    } */
    .id-resp{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
        border-bottom: 1px solid #aaa;
    }
    .ID{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
    }
    .IDtitle{
        background-color: #3F3F3F;
    }
    .IDtitle p{
        float: left;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
        height: 40px;
        line-height: 40px;
    }
    .IDmessage p{
        float: left;
        padding: 6px 15px 6px 6px;
        border: 1px solid #aaa;
        font-size: 18px
    }
    .Resp{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
    }
    .Resp p{
        font-size: 18px;
    }
    .Resptitle{
        text-align: left;
        font-size: 18px;
    }
    .Respmessage{
        /* height: 85px; */
        padding-left: 10px;
        text-align: left;
    }
    .resphi{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
    }
    .header-query{
        width: 90%;
        margin: 0 auto;
    }
    .Params{
        width: 40%;
        padding-top: 40px;
        float: left;
        margin: 0 auto;
        padding-bottom: 40px;
        /* border-bottom: 1px solid #aaa; */
    }
    .Params h2{
        text-align: left
    }
    .Paramstitle{
        background-color: #3F3F3F;
    }
    .Paramstitle p{
        float: left;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
        height: 40px;
        line-height: 40px;
        width: 50%;
    }
    .Paramsmessage p{
        float: left;
        width: 50%;
        padding: 6px 15px 6px 6px;
        border: 1px solid #aaa;
        font-size: 18px
    }
    .Querys{
        width: 50%;
        padding-top: 40px;
        float: right;
        margin: 0 auto;
        padding-bottom: 40px;
        /* border-bottom: 1px solid #aaa; */
    }
    .Querys h2{
        text-align: left
    }
    .Querystitle{
        background-color: #3F3F3F;
    }
    .Querystitle p{
        float: left;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
        height: 40px;
        line-height: 40px;
        width: 50%;
    }
    .Querysmessage p{
        float: left;
        width: 50%;
        padding: 6px 15px 6px 6px;
        border: 1px solid #aaa;
        font-size: 18px
    }
    .SubApis{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
    }
    .SubApis h2{
        text-align: left
    }
    .SubApistitle{
        background-color: #3F3F3F;
    }
    .SubApistitle p{
        float: left;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
        height: 40px;
        line-height: 40px;
        /* width: 50%; */
    }
    .SubApismessage p{
        float: left;
        /* width: 50%; */
        padding: 6px 15px 6px 6px;
        border: 1px solid #aaa;
        font-size: 18px
    }
    .click{
        cursor: pointer;
        width: 70%;
    }
    .method{
        width: 30%;
    }
        .Body{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
    }
    .Body h2{
        text-align: left
    }
    .Bodytitle{
        background-color: #3F3F3F;
    }
    .Bodytitle p{
        float: left;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
        height: 40px;
        line-height: 40px;
        width: 50%;
    }
    .Bodymessage .p{
        float: left;
        width: 50%;
        height: 100%;
        /* text-align: left; */
        margin: 0;
        border-right: 1px solid #aaa;
        padding: 6px 15px 6px 6px;
        font-size: 18px
    }
    .body-and{
        border: 1px solid #aaa;
    }
    .json-show{
        text-align: left;
        border: 1px solid #aaa;
    }
    .open{
        display: inline-block;
        width: 22px;
        font-size: 14px;
        cursor: pointer;
        color: #fff;
        background-color: aquamarine
    }
</style>

