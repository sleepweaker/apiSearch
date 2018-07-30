<template>
<div>
    <h1>Desc:{{this.dataShow.Desc}}</h1>
    <h1>ID:{{this.dataShow.ID}}</h1>
    <h1>Method:{{this.dataShow.Method}}</h1>
    <h1>Params:{{this.dataShow.Params}}</h1>
    <h1>Path:{{this.dataShow.Path}}</h1>
    <h1>PrjName:{{this.dataShow.PrjName}}</h1>
    <h1>Querys:{{this.dataShow.Querys}}</h1>
    <h1>Resp:{{this.dataShow.Resp}}</h1>
    <h1>SubApis:{{this.dataShow.SubApis}}</h1>
</div>
</template>
<script>
export default {
    data(){
        return {
            dataShow:""
        }
    },
    mounted(){
            this.dataShow=this.$route.query.dataAll;
            console.log(this.dataShow)
        },
}
</script>
<style>

</style>
