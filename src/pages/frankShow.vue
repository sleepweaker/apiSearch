<template>
<div class="main">
    <div class="num clear-float">
    <h1>Desc:</h1>
    <span>{{this.dataShow.Desc}}</span>
    </div><div class="num clear-float">
    <h1>ID:</h1>
    <span>{{this.dataShow.ID}}</span>
    </div><div class="num clear-float">
    <h1>Method:</h1>
    <span>{{this.dataShow.Method}}</span>
    </div><div class="num clear-float">
    <h1>Params:</h1>
    <div v-for="item in dataShow.Params" class="divFor">
        <span>Name:{{item.Name}}</span>
        <span>Desc:{{item.Desc}}</span>
    </div>
    </div><div class="num clear-float">
    <h1>Path:</h1>
    <span>{{this.dataShow.Path}}</span>
    </div><div class="num clear-float">
    <h1>PrjName:</h1>
    <span>{{this.dataShow.PrjName}}</span>
    </div><div class="num clear-float">
    <h1>Querys:</h1>
    <div v-for="item in dataShow.Querys" class="divFor">
        <span>Name:{{item.Name}}</span>
        <span>Desc:{{item.Desc}}</span>
    </div>
    </div><div class="num clear-float">
    <h1>Resp:</h1>
    <span>Code:{{this.dataResp.code}}</span>
    <span>Msg:{{this.dataResp.msg}}</span>
    <span>Data:{{this.dataResp.data}}</span>
    </div><div class="num clear-float">
    <h1>SubApis:</h1>
    <div v-for="item in dataShow.SubApis" class="divFor">
        Api:<span class="click" @click="apiSearch(item.Api)">{{item.Api}}</span>
        Method:<span>{{item.Method}}</span>
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
        display: -webkit-box;
        -webkit-box-pack:center;
        -webkit-box-align:center;
        -webkit-box-orient: vertical;
        text-align: center
    }
    label{
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        text-align: left;
    }
    h1{
        float: left;
        width: 100px;
        text-align: left;
    }
    .num{
        width: 800px;
        height: 50px;
    }
    .divFor{
        margin-left: 50px;

    }
    span{
        margin-left: 20px;
        margin-right: 20px;
        font-size: 14px;
        font-weight: normal;
    }
    .click{
        cursor: pointer;
        /* color: aqua; */
    }
</style>

