<template>
    <div class="login-in" ref="oneNet">

        <div class="username-in clear-float" v-if="isTypeApi">
                <Input v-model="valueApi" size="large" placeholder="输入项目API" style="width: 480px;float:left" />
                <Button type="primary" icon="ios-search" id="api" style="float:left;margin-left:20px;width:100px" @click="nameSearch($event.currentTarget.id)">Search</Button>
        </div>
        <div class="username-in  clear-float" v-if="isTypeName">
                <Input v-model="valueName" size="large" placeholder="项目名称" style="width: 150px;float:left" />
                <Input v-model="valueAddrs" size="large" placeholder="地址" style="width: 330px;float:left;" />
                <Button type="primary" icon="ios-search" id="name" style="float:left;margin-left:20px" @click="nameSearch($event.currentTarget.id)">Search</Button>
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
    mounted () {
        
    },
    created:function(){
        let that = this
        document.onkeydown = function(e){
            let type = ""
            if(window.event.keyCode == 13){
            that.nameSearch(that.isTypeApi?'api':'name')
        }
        }
    },
    watch:{
      'loginMessage' : function(){
          this.valueChange();
      }
    },
    methods:{
        nameSearch(e){
            let _this = this
            console.log(e);
            switch (e) {
                case "api":
                    this.$router.push({path:"/show",query:{data:this.valueApi,type:"api"}});
                    break;
                case "name":
                    this.$router.push({path:"/show",query:{dataAddrs:this.valueAddrs,dataName:this.valueName,type:"name"}});
                    break;
                default:
                    break;
            }
        },
        valueChange(){
            console.log(this.loginMessage)
            switch (this.loginMessage) {
                case "Api":
                    this.isTypeApi = true
                    this.isTypeName = false
                    break;
                case "Name":
                    this.isTypeApi = false
                    this.isTypeName = true
                    break;
                default:
                    break;
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
    .username-in{
        margin-top: 50px;
    }

</style>
