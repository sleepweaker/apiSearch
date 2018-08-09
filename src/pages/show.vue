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
                 <Input v-model="valueName" size="large" placeholder="项目名称" style="width: 120px;float:left" @keyup.enter.native="nameSearch('name')"/>
                <Input v-model="valueAddrs" size="large" placeholder="地址" style="width: 300px;float:left;" @keyup.enter.native="nameSearch('name')"/>
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
                        title: 'branch',
                        key: 'branch',
                        width:150,
                    },
                    {
                        title: 'method',
                        key: 'method',
                        width:180,
                           render: (h, params) => {
                            return h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'big'
                                    },
                                    'class':{
                                        [params.row.method]:true,
                                    },
                                    style:{
                                        display:'block',
                                    },
                                },params.row.method)
                           },
                        filters: [
                            {
                                label:'post',
                                value:'post'
                            },
                            {
                                label:'get',
                                value:'get'
                            },
                            {
                                label:'put',
                                value:'put'
                            },
                            {
                                label:'delete',
                                value:'delete'
                            },
                            {
                                label:'patch',
                                value:'patch'
                            },
                        ],
                        filterMethod (value, row) {
                            switch (value) {
                                case 'post':
                                    return row.method =='post'
                                    break;
                                case 'get':
                                    return row.method =='get'
                                    break;
                                case 'put':
                                    return row.method =='put'
                                    break;
                                case 'delete':
                                    return row.method =='delete'
                                    break;
                                case 'patch':
                                    return row.method =='patch'
                                    break;
                                default:
                                    break;
                            }
                        }
                    },

                    {
                        title: 'desc',
                        key: 'desc'
                    },
                    {
                        title: 'path',
                        key: 'path'
                    },
                    {
                        title: 'action',
                        key: 'action',
                        width:180,
                        align: 'center',
                           render: (h, params) => {
                            return h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'big'
                                    },
                                    style:{
                                        display:'block',
                                        backgroundColor:'#2d8cf0',
                                        color:'#fff',
                                        height:'30px',
                                        lineHeight:'30px',
                                        borderRadius:'5px',
                                        cursor:'pointer',
                                    },
                                    on: {
                                        click:()=>{
                                            this.rowClick(params)
                                        }
                                    }
                                },"预览")
                           }
                    },
                ],
                dataApi: [
                    // {addr:"xxxxxxxxxxxxxx",id:"123",desc:"231241324",Desc:"adqfdsfeagf",Method:"Post",Params:[{name:"123",path:"rwwrafdew"},{name:"243",path:"1adsfda"}],PrjName:"test"},
                    // {addr:"xxxxxxxxxxxxxx",id:"123",desc:"231241324",Desc:"adqfdsfeagf",Method:"Get",Params:[{name:"123",path:"rwwrafdew"},{name:"243",path:"1adsfda"}],PrjName:"test"},
                    // {addr:"xxxxxxxxxxxxxx",id:"123",desc:"231241324",Desc:"adqfdsfeagf",Method:"Put",Params:[{name:"123",path:"rwwrafdew"},{name:"243",path:"1adsfda"}],PrjName:"test"},
                    // {addr:"xxxxxxxxxxxxxx",id:"123",desc:"231241324",Desc:"adqfdsfeagf",Method:"Delete",Params:[{name:"123",path:"rwwrafdew"},{name:"243",path:"1adsfda"}],PrjName:"test"},
                    // {addr:"xxxxxxxxxxxxxx",id:"123",desc:"231241324",Desc:"adqfdsfeagf",Method:"Patch",Params:[{name:"123",path:"rwwrafdew"},{name:"243",path:"1adsfda"}],PrjName:"test"},
                ],
                dataName: [
                ],
                columnsName: [
                    {
                        title: 'name',
                        key: 'name'
                    },
                    {
                        title: 'scheme',
                        key: 'scheme'
                    },
                    {
                        title: 'addr',
                        key: 'addr'
                    },
                    
                    {
                        title: 'id',
                        key: 'id'
                    },
                    
                ],
            valueApi:"",
            valueName:"",
            valueAddrs:"",
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
            // this.dataApi.map(this.methodColor)
        },
        created:function(){
        let that = this
        document.onkeydown = function(e){
            let type = ""
            if(window.event.keyCode == 13){
            that.nameSearch(that.apiShow?'api':'name')
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
                            _this.dataApi =JSON.parse(response.data.data)
                            console.log(_this.dataApi)
                            })
                            .catch(function(err){
                            console.log(err);
                        });
                    break;
                case "name":
                        axios.get('http://frank.onenet.com/search/project?addr='+this.valueAddrs+'&prj_name='+this.valueName,{
                            }).then(function(response){
                            _this.dataName = JSON.parse(response.data.data)
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
<style >
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
    /* .searchShow{
       width: 1050px;
       margin: 0 auto;
    } */
    .showTitle Col{
        height: 50px;
        line-height: 50px;
        text-align: center
    }
    .post{
        color: #fff;
        background-color: #19be6b;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .get{
        color: #fff;
        background-color: #2d8cf0;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .put{
        color: #fff;
        background-color: #f90;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .delete{
        color: #fff;
        background-color: #ed3f14;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .patch{
        color: #fff;
        background-color: #f90;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .ivu-table-row{
        /* cursor: pointer; */
    }
    /* .ivu-table .demo-table-info-cell-method{
        background-color: #ff6600;
        color: #fff;
    } */
</style>

