<template>
    <div class="login-in" ref="oneNet">

        <div class="username-in clear-float" v-if="isTypeApi">
                <Input v-model="valueApi" size="large" placeholder="输入项目API" style="width: 480px;float:left"/>
                <router-link to="/show">
                    <Button type="primary" icon="ios-search" style="float:left;margin-left:20px;width:100px" @click="nameSearch">Search</Button>
                </router-link>
        </div>
        <div class="username-in  clear-float" v-if="isTypeName">
                <Input v-model="valueName" size="large" placeholder="项目名称" style="width: 150px;float:left"/>
                <Input v-model="valueAddrs" size="large" placeholder="地址" style="width: 330px;float:left;"/>
                <router-link to="/show">
                    <Button type="primary" icon="ios-search" style="float:left;margin-left:20px" @click="nameSearch">Search</Button>
                </router-link>
        </div>  
    </div>
</template>

<script>
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
    watch:{
      'loginMessage' : function(){
          this.valueChange();
      }
    },
    methods:{
        nameSearch(){
            console.log(this.loginMessage)
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
