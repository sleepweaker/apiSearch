<template>
<div>
<div class="head clear-float">
        <img @click="to" src="../assets/login-log.png">
    </div>
<div class="main">
    <div class="main-color clear-float">
    <div class="prjname clear-float">
        <h1 class="fontcolor">项目名：{{this.dataShow.prj_name}}</h1>
        
    </div>
    
    <div class="desc fontcolor clear-float">
        <p class="title">接口描述：</p>
        <p class="message" ref="descTitle" title=''>{{this.dataShow.desc}}</p>
        <h4 class="branch">分支:{{this.dataShow.branch}}</h4>
        <!-- <div class="author clear-float">
            <div v-for="item in this.dataShow.authors" class="authorMessage">
                <p>{{item.name}}</p>
                <p>{{item.mail}}</p>
            </div>
        </div> -->
    </div>
    <div class="clear-float" style="width:90%;margin:0 auto;">
        <Button type="primary" style="margin-top:10px;margin-bottom:10px;float:right" @click="mockQuerry">MOCK地址&nbsp&nbsp{{mockName}}</Button>
    </div>
        <div class="mock" v-if="mockShow">
            <div class="mocktitle clear-float">
                <p class="mockmethod">Method</p>
                <p class="mockpath">Mock地址</p>
                <p class="mockaction">action</p>
            </div>
            <div v-for="(item,index) in this.mockData" class="mockmessage clear-float">
                <p class="mockmethod" style="color:#515a6e;float:none">{{dataShow.method}}</p>
                <p class="mockpath" style="color:#515a6e;float:none;word-wrap:break-word">{{item}}</p>
                <div class="mockaction" style="border: 1px solid #aaa;float:none">
                    <Button type="primary" v-bind:id='index' v-bind:data-clipboard-text="item" @click="mockCopy(index)">复制</Button>
                </div>
            </div>
        </div>
    
    <!-- <div class="id-resp clear-float"> -->
    <div class="ID">
        <div class="IDtitle clear-float">
            <p class="method">Method</p>
            <p style="width:70%">Path</p>
        </div>
        <div class="IDmessage clear-float">
            <p class="method scroll">{{this.dataShow.method}}</p>
            <p class="seven scroll">{{this.dataShow.path}}</p>
        </div>
    </div>
    <div class="Resp">
        <h2 class="Resptitle">响应:</h2>
        <div v-for="(item,index) in this.respData" class=" clear-float">
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
            <p class="scroll">{{item.key}}</p>
            <p class="scroll">{{item.val}}</p>
        </div>
        <p class="oldtitle" title="曾用请求头" v-if="this.fadHeaders">？</p>
        <div v-for="item in this.fad.headers" class="Paramsmessageold clear-float">
            <p class="scroll">{{item.key}}</p>
            <p class="scroll">{{item.val}}</p>
        </div>
    </div>
        <div class="Authors">
        <h2>负责人:</h2>
        <div class="SubApistitle clear-float">
            <p class="method">姓名：</p>
            <p class="click">邮箱:</p>
        </div>  
        
        <div v-for="item in this.dataShow.authors" class="SubApismessage clear-float">
            <p class="method scroll">{{item.name}}</p>
            <p class="click scroll">{{item.mail}}</p>
        </div>
        <p class="oldtitle" title="曾经负责，但现在已不再负责" v-if="this.fadAuthors">？</p>
        <div v-for="item in this.fad.authors" class="SubApismessageto old clear-float">
            <p class="method scroll">{{item.name}}</p>
            <p class="click scroll">{{item.mail}}</p>
        </div>
    </div>
    </div>
       <div class="Querys">
        <h2>URL参数:</h2>
        <div class="Querystitle clear-float">
            <p class="three">参数名</p>
            <p class="seven">参数描述</p>
            
        </div>
        <div v-for="item in this.dataShow.querys" class="Querysmessage clear-float">
            <p class="three test">{{item.name}}</p>
            <p class="seven" style="word-wrap:break-word">{{item.desc}}</p>
        </div>
        <p class="oldtitle" title="曾用URL参数" v-if="this.fadQuerys">？</p>
        <div v-for="item in this.fad.querys" class="Querysmessageto old clear-float">
            <p class="three test">{{item.name}}</p>
            <p class="seven " style="word-wrap:break-word">{{item.desc}}</p>
        </div>
    </div>
    <div class="Body">
        <h2>请求体:</h2>
        <div class="Bodytitle clear-float">
            <p class="three">参数名</p>
            <p class="seven">参数描述</p>
        </div>
        <div v-for="item in this.dataShow.body" class="Bodymessage clear-float">
            <div class="body-and clear-float" style="height=100%">
            <p class=" three">{{item.name}}</p>
            <p  class=" seven">{{item.desc}}</p>
            </div>
        </div>
        <div  class="json-show">
            <h3>JSON请求体：</h3>
            <div v-for="item in this.jsonData">
                <pre>{{item}}</pre>
            </div>
        </div>
        <p class="oldtitle" title="曾用请求体" v-if="this.fadBody">？</p>
        <div v-for="item in this.fad.body" class="Bodymessageto old clear-float">
            <div class=" old clear-float" style="height=100%">
            <p class=" three">{{item.name}}</p>
            <p  class=" seven">{{item.desc}}</p>
            </div>
        </div>
        <div  class="json-old" v-if="this.fadJsonData.length">
            <h3>JSON请求体：</h3>
            <div v-for="item in this.fadJsonData">
                <pre class="">{{item}}</pre>
            </div>
        </div>
    </div>

    <div class="SubApis">
        <h2>依赖接口:</h2>
        <div class="SubApistitle clear-float">
            <p style="width:70%">API</p>
            <p class="method">Method</p>
        </div>
        <div v-for="item in this.dataShow.sub_apis" class="SubApismessage clear-float">
            <p class="click scroll" @click="apiSearch(item.api)">{{item.api}}</p>
            <p class="method scroll">{{item.method}}</p>
        </div>
        <p class="oldtitle" title="曾用下游接口" v-if="this.fadSub">？</p>
        <div v-for="item in this.fad.sub_apis" class="SubApismessageto old clear-float">
            <p class="click scroll" @click="apiSearch(item.api)">{{item.api}}</p>
            <p class="method scroll">{{item.method}}</p>
        </div>
    </div>
</div>
</div>
</div>
</template>
<script>
 import Clipboard from 'clipboard';
 import axios from 'axios'
 import RespShow from '../components/respShow';
export default {
    data(){
        return {
            includedComponents: "test-keep-alive",
            dataShow:"",
            dataResp:"",
            resvalue:true,
            respData:[],
            jsonData:[],
            fad:[],
            fadAuthors:'',
            fadBody:'',
            fadSub:'',
            fadQuerys:'',
            fadHeaders:'',
            fadJsonData:[],
            strs:'',
            mockShow:false,
            mockData:[],
            copyBtn:null,
            mockName:"十"
        }
    },  
    mounted(){
            let _this = this;
            let id = this.$route.query.dataId
            if(this.$route.query.datapId){
                axios.get('http://frank.onenet.com/frank-api?id='+_this.$route.query.datapId).then(function(response){
                    // console.log(JSON.parse(response.data.data)[_this.$route.query.dataIndex])
                _this.dataShow= JSON.parse(response.data.data);
                _this.$refs.descTitle.title = _this.dataShow.desc;
                _this.fad = _this.dataShow.fad;
                _this.dataShow.body.forEach(_this.jsonCheck);
                _this.dataShow.fad.body.forEach(_this.fadJsonCheck);
                // _this.dataShow.resp="["+_this.dataShow.resp+"]";
                
                _this.fadAuthors = !!_this.fad.authors.length;
                _this.fadBody = !!_this.fad.body.length;
                _this.fadSub = !!_this.fad.sub_apis.length;
                _this.fadQuerys = !!_this.fad.querys.length;
                _this.fadHeaders = !!_this.fad.headers.length;
                _this.respCheck(_this.dataShow.resp);
                // _this.dataShow.resp = JSON.stringify(JSON.parse(_this.dataShow.resp), null, 4);
                
                }).catch(function(err){
                    console.log(err);
                });
            }else if(id!=undefined){
                axios.get('http://frank.onenet.com/frank-api?id='+id,{
                }).then(function(response){
                _this.dataShow= JSON.parse(response.data.data);
                _this.$refs.descTitle.title = _this.dataShow.desc;
                _this.dataShow.body.forEach(_this.jsonCheck);
                _this.respCheck(_this.dataShow.resp);
                // _this.dataShow.resp = JSON.stringify(JSON.parse(_this.dataShow.resp), null, 4);
                
                }).catch(function(err){
                    console.log(err);
                });
            }
        },
        updated(){
            let btns = document.querySelectorAll('Button');
            this.copyBtn = new Clipboard(btns);
        },
    methods:{
        apiSearch(e){
           
            this.$router.push({path:"/show",query:{data:e,type:"api"}})
        },
        to(){
            this.$router.push({path:"/"})
        },

        jsonCheck(e,name){
            if(e.name == "*json*"){
                this.jsonData.push(JSON.stringify(JSON.parse(e.desc), null, 4))
                this.dataShow.body.splice(this.dataShow.body.indexOf(e),1)
            }
        },
        fadJsonCheck(e,name){
            
            if(e.name == "*json*"){
                this.fadJsonData.push(JSON.stringify(JSON.parse(e.desc), null, 4))
                this.dataShow.fad.body.splice(this.dataShow.fad.body.indexOf(e),1)
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
                    try {
                        this.respData.push(JSON.stringify(JSON.parse(str), null, 4))
                    } catch (error) {
                        this.respData.push(str)
                    }
                    
                    str = "";
                    // console.log(this.respData)
                }
            }
        },
        mockQuerry(){
            let _this = this
            if (_this.mockShow == true) {
                _this.mockShow = !_this.mockShow;
                _this.mockName = "十" 
            }else if(_this.mockData==""){
                axios.get(Host+"/mock/url?api_id="+this.dataShow.id).then(function(response){
                if (response.data.code!=0) {
                    alert("无MOCK接口地址");
                }else{
                    _this.mockShow = !_this.mockShow;
                    _this.mockName = "一";
                    _this.mockData = JSON.parse(response.data.data)
                    // _this.mockData = ["sdkjgfnakjgnkjerageranglkjaenfklnfm;lewngfkerwnglkanglksangddsgfadjgnnrkjdgnlkdagnvkadgnewaljngflksadnglkdsngvl","那附近科比嘎机阿尔堡肯付货款是念佛i九二南风化工IKEA就是看不惯科萨的"]
                }
            })
            }else{
               _this.mockShow = !_this.mockShow; 
               _this.mockName = "一";
            }
        },
        mockCopy(e){
            this.new();
            let cop = this.copyBtn;
        },
        new(){
            let btns = document.querySelectorAll('Button');
            this.copyBtn = new Clipboard(btns);
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
    .scroll{
        overflow-y:auto;
        overflow-x:auto;
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
        width: 45%;
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
    .Paramsmessageold p{
        float: left;
        width: 50%;
        padding: 6px 15px 6px 6px;
        border: 1px solid #DCDCDC;
        color: #A9A9A9;
        font-size: 18px
    }
    .Authors{
        width: 50%;
        padding-top: 40px;
        float: right;
        margin: 0 auto;
        padding-bottom: 40px;
    }
    .Querys{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        padding-bottom: 40px;
    }
    .Querys h2{
        text-align: left
    }
    .Querystitle{
        
        background-color: #3F3F3F;
        width: 100%;
    }
    .Querystitle p{
        float: left;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
        height: 40px;
        line-height: 40px;
    }
    .Querysmessage{
        /* position: relative; */
        display: -webkit-box;
    }
    .Querysmessage p{
        /* float: left; */
        padding: 6px 15px 6px 6px;
        border: 1px solid #aaa;
        font-size: 18px;
        /* display: inline-block; */
    }
    .Querysmessageto{
        /* position: relative; */
        display: -webkit-box;
    }
    .Querysmessageto p{
        /* float: left; */
        padding: 6px 15px 6px 6px;
        border: 1px solid #DCDCDC;
        font-size: 18px;
        /* display: inline-block; */
    }
    .test{
        /* position: absolute;
        top: 0;
        right: 0;
        bottom: 0 */
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
    .SubApismessage{
        display: -webkit-box
    }
    .SubApismessage p{
        /* float: left; */
        /* width: 50%; */
        padding: 6px 15px 6px 6px;
        border: 1px solid #aaa;
        font-size: 18px
    }
    .SubApismessageto{
        display: -webkit-box
    }
    .SubApismessageto p{
        /* float: left; */
        /* width: 50%; */
        padding: 6px 15px 6px 6px;
        border: 1px solid #DCDCDC;
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
    }
    .Bodymessage p{
        float: left;
        height: 100%;
        /* text-align: left; */
        margin: 0;
        border-right: 1px solid #aaa;
        padding: 6px 15px 6px 6px;
        font-size: 18px
    }
    .Bodymessageto p{
        float: left;
        height: 100%;
        /* text-align: left; */
        margin: 0;
        border-right: 1px solid #DCDCDC;
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
    .json-old{
        text-align: left;
        border: 1px solid #DCDCDC;
    }
    /* .open{
        display: inline-block;
        width: 22px;
        font-size: 18px;
        cursor: pointer;
        color: #fff;
        background-color: aquamarine
    } */
    .old{
        border: #DCDCDC 1px solid;
        color: #A9A9A9
    }
    .oldtitle{
        font-size: 18px;
        text-align: left;
        cursor: pointer;
        color: rgb(221,17,68)
        /* border: 1px solid  rgb(221,17,68) */
    }
    .three{
        width: 30%;
    }
    .seven{
        width: 70%;
    }
    .mocktitle{
        width: 90%;
        margin: 0 auto;
        background-color: #3F3F3F;
    }
    .mockmethod{
        float: left;
        width: 20%;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;
    }
    .mockpath{
        float: left;
        width: 70%;
        color: #fff;
        font-weight: bold;
        padding: 5px 15px 5px 6px;

    }
    .mockaction{
        color: #fff;
        text-align: center;
        float: left;
        width: 10%;
        padding: 5px 15px 5px 6px;
    }
    .mockmessage{
        width: 90%;
        margin: 0 auto;
        display: -webkit-box
    }
    .mockmessage p{
        border: 1px solid #aaa;
        font-size: 18px;
        font-weight: 100;
        padding: 6px 15px 6px 6px;
    }
</style>

