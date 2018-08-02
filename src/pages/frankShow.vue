<template>
<div class="main">
    <ol class="clear-float">
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
            <span>{{this.dataShow.Desc}}</span>
        </li>
        <li>
            <h1>
                Method:
            </h1>
            <span>{{this.dataShow.Desc}}</span>
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
            <h3>Code:{{this.dataResp.code}}</h3>
            <h3>Msg:{{this.dataResp.msg}}</h3>
            <h3>Data:{{this.dataResp.data}}</h3 >
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
    </ol>
</div>
</template>
<script>
 import axios from 'axios'

export default {
    data(){
        return {
            includedComponents: "test-keep-alive",
            dataShow:"",
            dataResp:""
        }
    },
    mounted(){
            let _this = this;
            let id = this.$route.query.dataId
            
            axios.get('http://frank.onenet.com/frank-api?id='+id,{
                }).then(function(response){
                _this.dataShow= JSON.parse(response.data.Data);
                _this.dataResp=JSON.parse(_this.dataShow.Resp)
                }).catch(function(err){
                    console.log(err);
                });
            
           
        },
    methods:{
        apiSearch(e){
            this.$router.push({path:"/show",query:{data:e,type:"api"}})
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
    .main{
        height: 80%;
        /* width: 80%;
        margin: 0 auto; */
        display: -webkit-box;
        -webkit-box-pack:center;
        -webkit-box-align:center;
        -webkit-box-orient: vertical;
        text-align: center
    }
    h1{
        width: 600px;
        text-align: center;
    }
    li{
        float: left;
        width: 600px;
        height: 150px;
        list-style: none;
        border: 1px solid #e1e4e8;
        margin-top: 20px;
        margin-right: 30px;
    }
    h3{
        text-align: left;
        margin-left: 150px;
        margin-top: 5px;
    }
    span{
        display: inline-block;
        margin-right: 20px;
        font-size: 18px;
        margin-top: 10px;
    }
    .click{
        cursor: pointer;
        /* color: aqua; */
    }
    .divfor{
        font-size: 18px;
    }
</style>

