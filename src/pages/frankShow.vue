<template>
<div>
<div class="head clear-float">
        <img @click="to" src="../assets/login-log.png">
    </div>
<div class="main">
    <!-- <ol class="clear-float">
        <li>
            <h1>
                Desc:
            </h1>
            <span>{{this.dataShow.Desc}}</span>
        </li>
        <li>
            <h1>
                ID:
            </h1>
            <span>{{this.dataShow.ID}}</span>
        </li>
        <li>
            <h1>
                Method:
            </h1>
            <span>{{this.dataShow.Method}}</span>
        </li>
        <li>
            <h1>
                Params:
            </h1>
            <div v-for="item in this.dataShow.Params" class="divFor">
                <span>Name:{{item.Name}}</span>
                <span>Desc:{{item.Desc}}</span>
            </div>
        </li> 
        <li>
            <h1>
                Path:
            </h1>
            <span>{{this.dataShow.Path}}</span>
        </li>
        <li>
            <h1>
                PrjName:
            </h1>
            <span>{{this.dataShow.PrjName}}</span>
        </li>
        <li>
            <h1>
                Querys:
            </h1>
            <div v-for="item in dataShow.Querys" class="divFor">
                <span>Name:{{item.Name}}</span>
                <span>Desc:{{item.Desc}}</span>
            </div>
        </li>
        <li>
            <h1>
                Resp:
            </h1>
            <span>{{this.dataShow.Resp}}</span>
        </li>
        <li>
            <h1>
                SubApis:
            </h1>
            <div v-for="item in dataShow.SubApis" class="divFor">
                Api:<span class="click" @click="apiSearch(item.Api)">{{item.Api}}</span>
                Method:<span>{{item.Method}}</span>
            </div>
        </li>
    </ol> -->
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
    <div class="id-resp clear-float">
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
        <p class="Resptitle">响应:</p>
        <pre class="Respmessage">{{this.dataShow.resp}}</pre>
    </div>
    </div>
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
            <p>参数Name</p>
            <p>参数Desc</p>
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
            <p>参数Name</p>
            <p>参数Desc</p>
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

export default {
    data(){
        return {
            includedComponents: "test-keep-alive",
            dataShow:"",
            dataResp:"",
            jsonData:[],
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
                _this.dataShow.resp = JSON.stringify(JSON.parse(_this.dataShow.resp), null, 4);
                }).catch(function(err){
                    console.log(err);
                });
        },
    methods:{
        apiSearch(e){
           
            this.$router.push({path:"/show",query:{data:e,type:"api"}})
        },
        to(){
            this.$router.push({path:"/show",query:{type:"api"}})
        },
        jsonCheck(e){
            if(e.name == "*json*"){
                this.jsonData.push(JSON.stringify(JSON.parse(e.desc), null, 4))
                this.dataShow.body.splice(this.dataShow.body.indexOf(e),1)
                console.log(this.dataShow.body) 
            }
        }
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
    .author{
        float: right;
        height: 100px;
    }
    .authorMessage{
    }
    .authorMessage p{
        margin-left: 10px;
    }
    .id-resp{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
        border-bottom: 1px solid #aaa;
    }
    .ID{
        float: left;
        width: 40%;
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
        float: right;
        width: 40%;
    }
    .Resp p{
        font-size: 18px;
    }
    .Resptitle{
        text-align: left;
    }
    .Respmessage{
        height: 85px;
        padding-left: 10px;
        text-align: left;
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
</style>

