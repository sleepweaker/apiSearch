<template>
    <div class="login-in" ref="oneNet">

        <div class="searchInput clear-float" v-if="isTypeApi">
                <input v-model="valueApi" size="large" placeholder="输入项目API" style="width: 480px;" />
                <Button type="primary" icon="ios-search" style="float:left;height:36px;border-radius:0;;" @click="nameSearch(true)">Search</Button>
        </div>
        <div class="searchInput  clear-float" v-if="isTypeName">
                <input v-model="valueName" size="large" placeholder="项目名称" style="width: 150px;float:left" />
                <input v-model="valueAddrs" size="large" placeholder="地址" style="width: 330px;float:left;" />
                <Button type="primary" icon="ios-search" style="float:left;height:36px;border-radius:0;" @click="nameSearch(false)">Search</Button>
        </div>  
    </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp';
import axios from 'axios'
export default {
    props:['loginMessage'],
    data (){
        return{
            isTypeApi:true,
            isTypeName:false,
            valueApi:"",
            valueName:"",
            valueAddrs:""
        }
    },
    created:function(){
        let that = this
        document.onkeydown = function(e){
            if(window.event.keyCode == 13){
            that.nameSearch(that.isTypeApi)
        }
        }
    },
    watch:{
      'loginMessage' : function(){
        this.isTypeApi = !this.isTypeApi
        this.isTypeName = !this.isTypeName
      }
    },
    methods:{
        nameSearch(e){
            if(e){
                    this.$router.push({path:"/show",query:{data:this.valueApi,type:"api"}});
                }else{
                    this.$router.push({path:"/show",query:{dataAddrs:this.valueAddrs,dataName:this.valueName,type:"name"}});
                }
        },

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
       .searchInput{
        padding-top: 50px;
    }
    .searchInput input{
        height:36px;
        padding:4px 7px;
        line-height:1.5;
        color: #495060;
        font-family: inherit;
        overflow: visible;
        /* width: 480px; */
        border: 1px solid #dddee1;
        float:left;
        border-color:#dddee1;
        border-radius:0;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
        font-size:14px;
    }
    ::-webkit-input-placeholder{
        color: #dddee1;
    }

</style>
