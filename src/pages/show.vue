<template>
    <div class="">
        <div class="searchIn">
            <Row v-if="apiShow">
                <Col span="3" class="serachInChange" @click.native="change('api')">
                API
                </Col>
                <Col span="18">
                <Input v-model="valueApi" size="large" placeholder="输入项目API" style="width: 480px;float:left"/>
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
                 <Input v-model="valueName" size="large" placeholder="项目名称" style="width: 150px;float:left"/>
                <Input v-model="valueAddrs" size="large" placeholder="地址" style="width: 330px;float:left;"/>
                </Col>
                <Col span="3">
                <Button type="primary" icon="ios-search" id="name" @click="nameSearch($event.currentTarget.id)">Search</Button>
                </Col>
            </Row>
        </div>
        <div class="searchShow" style="margin-top:10px">
            <Table :columns="columnsApi" :data="dataApi" @on-row-click='rowClick' v-if="apiShow"></Table>
            <Table :columns="columnsName" :data="dataName" v-if="nameShow"></Table>
        </div>
    </div>
</template>
<script>
 import expandRow from '../components/table-expand.vue';
 import axios from 'axios'
    export default {
        components: { expandRow },
        data () {
            return {
                apiShow:false,
                nameShow:false,
                columnsApi: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                },
                            })
                        }
                    },
                    {
                        title: 'addr',
                        key: 'addr'
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
        methods:{
            rowClick (data) {
                let _this = this
                console.log(data.id)
                axios.get('http://192.168.201.60:8080/frank-api?id='+data.id,{
                }).then(function(response){
                        _this.$router.push({path:"/frankShow",query:{dataAll:JSON.parse(response.data.Data)}})
                    }).catch(function(err){
                            console.log(err);
                        });

            },
            change (e) {
                console.log("sss")
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
            console.log(e);
            switch (e) {
                case "api":

                        axios.get('http://192.168.201.60:8080/search/api?api='+this.valueApi,{
                            }).then(function(response){
                            console.log(response.data.Data)
                            _this.dataApi =JSON.parse(response.data.Data)
                            console.log(_this.dataName)  
                            })
                            .catch(function(err){
                            console.log(err);
                        });
                    break;
                case "name":
                        axios.get('http://192.168.201.60:8080/search/project?addr='+this.valueAddrs+'&prj_name='+this.valueName,{
                            }).then(function(response){
                            _this.dataName = JSON.parse(response.data.Data)
                            console.log(_this.dataApi) 
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
</style>

