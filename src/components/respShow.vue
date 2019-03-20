<template id="list-item">
<div>    
    <div class="open-json" @click="openShow">{{openValue}}</div>
    <pre class="Respmessage" :class="{resphi:isActive}" ref="respMessage">{{item}}</pre>
</div>
</template>
<script>
export default {
     props: ['item'],
       data() {
    return {
      isActive: true,
      openValue:"+",

    }
  },
  methods: {
    openShow() {
      this.isActive = !this.isActive;
      if(this.openValue=="+"){
          this.openValue="-"
      }else{
          this.openValue="+"
      }
    },

  },

}
</script>
<style scoped>
    .open-json{
        float: right;
        width: 22px;
        font-size: 18px;
        cursor: pointer;
        color: #fff;
        background-color: #3F3F3F
    }
        .Respmessage{
        /* height: 85px; */
        padding-left: 10px;
        text-align: left;
        overflow-y:auto;
        overflow-x:auto;
    }
    .resphi{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>
