<template>
    <div class="index-login-banner">
        <div class="index-login-main">
            <div class="index-login-main-header">
            </div>
            <div class="index-login-main-center">
                <div class="login-chioce clear-float">
                    <h2 class="login-onenet" v-bind:class="{onenetactive:oneIsActive}" @click="cleanHover($event.target.id)" id="oneNet" ref="one">API</h2>
                    <h2 class="login-heport" v-bind:class="{heportactive:heIsActive}" @click="cleanHover($event.target.id)" id="hePort" ref="port">项目名字</h2>
                </div>
            </div>
            <Search-Input ref="SearchInput" v-bind:loginMessage="message"></Search-Input>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import SearchInput from '../components/searchInput';
export default {
   data () {
  	return {    
        portNow:"oneNet",
        oneIsActive:false,
        heIsActive:false,
        message:"API",
  	}
  },
  mounted () {
    this.init();
  },
  methods:{
    init() {

    },
    cleanHover(e){
        switch (e) {
            case "oneNet":
                if(e==this.portNow){    
                }else{
                    this.oneIsActive = false;
                    this.heIsActive = false;
                    this.portNow = "oneNet";
                    this.message = "Api"
                    //这个方法目前有个问题，子组件无法及时改变值
                    // this.$refs.loginInput.valueChange();
                }
                break;
            case "hePort":
                if(e==this.portNow){    
                }else{
                    this.oneIsActive = true;
                    this.heIsActive = true;
                    this.portNow = "hePort";
                    this.message = "Name";
                    // this.$refs.loginInput.valueChange();
                }
                break;
            default:
                break;
        }
    },
  },
  components: {
      SearchInput
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
    .index-login-banner{
        height: 80%;
        display: -webkit-box;
        -webkit-box-pack:center;
        -webkit-box-align:center;
        -webkit-box-orient: vertical;
        text-align: center
    }
    .index-login-main{
        width: 600px;
        height: 373px;
        margin: 0 auto;
    }
    .index-login-main-header{
        width: 600px;
        height: 135px;
        background: url("../assets/login-log.png")no-repeat center;
    }
    .index-login-main-center{
        width: 352px;
        margin: 0 auto;
    }
    .login-chioce{
        height: 54px;
        color: rgb(170, 170, 170);
    }
    .login-onenet{
        float: left;
        width: 132px;
        text-align: center;
        line-height: 52px; 
        font-size: 16px;
        cursor: pointer;
        margin: 0;
        color: #19bbff;
        border-bottom: 2px solid #19bbff;    
    }
    .onenetactive{
        color: rgb(170, 170, 170);
        border: none;
    }
    .onenetactive:hover{
        border-bottom: 2px solid #aaa;
    }
    .login-heport{
        float: right;
        width: 132px;
        text-align: center;
        line-height: 52px; 
        font-size: 16px;
        cursor: pointer;
        margin: 0;  
    }
    .login-heport:hover{
        border-bottom: 2px solid #aaa;
    }
    .heportactive{
        color: #19bbff;
        border-bottom: 2px solid #19bbff;
    }
    .heportactive:hover{
        border-bottom: 2px solid #19bbff;
    }
    .login-in-heport{
        display: none;
    }


</style>
