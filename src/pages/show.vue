<template>
    <div class="">
        <div class="searchIn">
            <Row v-if="apiShow">
                <Col span="3" class="serachInChange" @click.native="change('api')">
                API
                </Col>
                <Col span="18">
                <Input v-model="valueApi" size="large" placeholder="输入项目API" style="width: 480px;float:left" @keydown.enter.native="nameSearch('api')"/>
                </Col>
                <Col span="3">
                <Button type="primary" icon="ios-search" id="api" @click="nameSearch($event.currentTarget.id)" >Search</Button>
                </Col>
            </Row>
            <Row v-if="nameShow">
                <Col span="3" class="serachInChange" @click.native="change('name')">
                Name
                </Col>
                <Col span="18">
                 <Input v-model="valueName" size="large" placeholder="项目名称" style="width: 150px;float:left" @keyup.enter.native="nameSearch('name')"/>
                <Input v-model="valueAddrs" size="large" placeholder="地址" style="width: 330px;float:left;" @keyup.enter.native="nameSearch('name')"/>
                </Col>
                <Col span="3">
                <Button type="primary" icon="ios-search" id="name" @click="nameSearch($event.currentTarget.id)">Search</Button>
                </Col>
            </Row>
        </div>
        <div class="searchShow" style="margin-top:10px">
            <Table :columns="columnsApi" :data="dataApi" v-if="apiShow"></Table>
            <Table :columns="columnsName" :data="dataName" v-if="nameShow"></Table>
        </div>
    </div>
</template>
<script>
 import axios from 'axios'
    export default {
        // components: { expandRow },
        data () {
            return {
                apiShow:false,
                nameShow:false,
                columnsApi: [
                    {
                        title: 'addr',
                        key: 'addr',
                        width:500,
                           render: (h, params) => {
                            return h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style:{
                                        display:'block',
                                        height:'48px',
                                        lineHeight:'48px'
                                    },
                                    on: {
                                        click: () => {
                                            this.rowClick(params)
                                        }
                                    }
                                },params.row.addr)
                           }
                    },
                    {
                        title: 'desc',
                        key: 'desc'
                    },
                    {
                        title: 'id',
                        key: 'id'
                    },
                ],
                dataApi: [
                ],
                dataName: [
                ],
                columnsName: [
                    {
                        title: 'addr',
                        key: 'addr'
                    },
                    {
                        title: 'scheme',
                        key: 'scheme'
                    },
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'name',
                        key: 'name'
                    },
                ],
            valueApi:"",
            valueName:"",
            valueAddrs:""
            }
        },
        mounted(){
            if(this.$route.query.type=="api"){
                this.apiShow = true
                this.valueApi = this.$route.query.data
                this.nameSearch("api")
            }else{
                this.nameShow = true
                this.valueAddrs = this.$route.query.dataAddrs
                this.valueName = this.$route.query.dataName
                this.nameSearch("name")
            }
        },
        created:function(){
        let that = this
        document.onkeydown = function(e){
            let type = ""
            if(window.event.keyCode == 13){
            if(that.apiShow==true){
                type = "api"
            }else{
                type = "name"
            }
            that.nameSearch(type)
            }
            }
        },
        methods:{
            rowClick (data) {
                console.log(data)
                let _this = this
                 _this.$router.push({path:"/frankShow",query:{dataId:data.row.id}})
                   

            },
            change (e) {
                if(e == "api"){
                    this.apiShow = false
                    this.nameShow = true
                }else{
                    this.apiShow = true
                    this.nameShow = false
                }
            },
            nameSearch(e){
            let _this = this
            switch (e) {
                case "api":

                        axios.get('http://frank.onenet.com/search/api?api='+this.valueApi,{
                            }).then(function(response){
                            _this.dataApi =JSON.parse(response.data.Data)
                            })
                            .catch(function(err){
                            console.log(err);
                        });
                    break;
                case "name":
                        axios.get('http://frank.onenet.com/search/project?addr='+this.valueAddrs+'&prj_name='+this.valueName,{
                            }).then(function(response){
                            _this.dataName = JSON.parse(response.data.Data)
                            })
                            .catch(function(err){
                            console.log(err);
                        });
                    break;
                default:
                    break;
            }
        },
        }
    }
</script>
<style scoped>
    .searchIn{
        width:40%;
        margin-top: 20px;
    }
    .serachInChange{
        text-align: center;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
        cursor: pointer;
    }
    .showTitle Col{
        height: 50px;
        line-height: 50px;
        text-align: center
    }
    .ivu-table-row{
        cursor: pointer;
    }
</style>

