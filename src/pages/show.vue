<template>
    <div class="show">
        <div class="searchIn">
            <div v-if="apiShow">
                <div class="serachInChange clear-float" @click="change('api')">
                    <h3 class="h3">API</h3>
                    <img src="../assets/change.png">
                    <p class="small">项目</p>
                </div>
                <div class="searchInput clear-float">
                    <input v-model="valueApi" size="large" placeholder="输入项目API" style="width:480px" @keydown.enter.native="nameSearch('api')"/>
                    <Button type="primary" style="float:left;height:36px;border-radius:0" icon="ios-search" id="api" @click="nameSearch($event.currentTarget.id)" >搜索</Button>
                    <Button type="primary" style="float:left;height:36px;border-radius:0;margin-left:20px;" id="up" icon="ios-search" @click="nameSearch($event.currentTarget.id)" >反查调用方</Button>
                </div>
            </div>
            <div v-if="nameShow">
                <div  class="serachInChange" @click="change('name')">
                    <h3 class="h3">项目</h3>
                    <img src="../assets/change.png">
                    <p class="small">API</p>
                </div>
                <div class="searchInput clear-float">
                    <input v-model="valueName" style="width:100px" size="large" placeholder="项目名称"  @keyup.enter.native="nameSearch('name')"/>
                    <input v-model="valueAddrs" style="width:380px" size="large" placeholder="地址" @keyup.enter.native="nameSearch('name')"/>
                    <Button type="primary" style="float:left;height:36px;border-radius:0" icon="ios-search" id="name" @click="nameSearch($event.currentTarget.id)">Search</Button>
                </div>
                <div class="searchButton clear-float">
                </div>
            </div>
        </div>
        <div class="searchShow" style="margin-top:10px">
            <Table :columns="columnsApi" :data="dataApi" v-if="apiShows"></Table>
            <Table :columns="columnsName" :data="dataName" v-if="nameShow" :row-class-name='rowClassName'></Table>
            <Table :columns="columnsApi" :data="dataUp" v-if="upShow"></Table>
        </div>

        <Modal
            v-model="nameModal"
            title="项目删除"
            @on-ok="deleteNameQuerry"
            @on-cancel="cancel">
            <p>你确定要删除这个项目吗吗</p>
        </Modal>
    </div>
</template>
<script>
 import axios from 'axios'
 import Vue from 'vue'
 let look = require('../assets/textshow.png')
 let delImg = require('../assets/delete.png')
 let fold = require('../assets/fold.png')
 axios.defaults.withCredentials=true
 Vue.prototype.$axios = axios
    export default {
        // components: { expandRow },
        data () {
            return {
                apimodal:false,
                nameModal:false,
                textHid:false,
                texShow:true,
                apiShow:false,
                apiShows:false,
                fold:true,
                nameShow:false,
                upShow:false,
                columnsApi: [
                    {
                        title: '请求方式',
                        key: 'method',
                        width:180,
                           render: (h, params) => {
                            return h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'big'
                                    },
                                    'class':{
                                        [params.row.method.toLowerCase()]:true,
                                    },
                                },params.row.method)
                           },
                        filters: [
                            {
                                label:'POST',
                                value:'POST'
                            },
                            {
                                label:'GET',
                                value:'GET'
                            },
                            {
                                label:'PUT',
                                value:'PUT'
                            },
                            {
                                label:'DELETE',
                                value:'DELETE'
                            },
                            {
                                label:'PATHCH',
                                value:'PATHCH'
                            },
                        ],
                        filterMethod (value, row) {
                            switch (value) {
                                case 'POST':
                                    return row.method =='POST'
                                    break;
                                case 'GET':
                                    return row.method =='GET'
                                    break;
                                case 'PUT':
                                    return row.method =='PUT'
                                    break;
                                case 'DELETE':
                                    return row.method =='DELETE'
                                    break;
                                case 'PATHCH':
                                    return row.method =='PATHCH'
                                    break;
                                default:
                                    break;
                            }
                        }
                    },
                    {
                        title: '地址',
                        key: 'path'
                    },  
                    {
                        title: '描述',
                        key: 'desc'
                    },
                    
                     {
                        title: '分支',
                        key: 'branch',
                        width:150,
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
                                        size: 'big',
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
                                        },
                                       
                                    }
                                },"预览"),
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'big',
                                        
                                    },
                                    domProps:{
                                        src:delImg,
                                        alt:'删除'
                                    },
                                    'class':{
                                        // textclasshid:this.textHid,
                                        textclassshow:this.texShow
                                    },
                                    style:{
                                        display:'inline-block',
                                        // backgroundColor:'#2d8cf0',
                                        color:'#000',
                                        height:'30px',
                                        lineHeight:'30px',
                                        borderRadius:'5px',
                                        cursor:'pointer',
                                        margin: '0 auto',
                                    },
                                    on: {
                                        click:()=>{
                                            this.deletePro(params)
                                        },
                                    }
                                },)
                           }
                    },
                                        
                ],
                columnsUp: [
                    {
                        title: '请求方式',
                        key: 'method',
                        width:180,
                           render: (h, params) => {
                            return h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'big'
                                    },
                                    'class':{
                                        [params.row.method.toLowerCase()]:true,
                                    },
                                },params.row.method)
                           },
                        filters: [
                            {
                                label:'POST',
                                value:'POST'
                            },
                            {
                                label:'GET',
                                value:'GET'
                            },
                            {
                                label:'PUT',
                                value:'PUT'
                            },
                            {
                                label:'DELETE',
                                value:'DELETE'
                            },
                            {
                                label:'PATHCH',
                                value:'PATHCH'
                            },
                        ],
                        filterMethod (value, row) {
                            switch (value) {
                                case 'POST':
                                    return row.method =='POST'
                                    break;
                                case 'GET':
                                    return row.method =='GET'
                                    break;
                                case 'PUT':
                                    return row.method =='PUT'
                                    break;
                                case 'DELETE':
                                    return row.method =='DELETE'
                                    break;
                                case 'PATHCH':
                                    return row.method =='PATHCH'
                                    break;
                                default:
                                    break;
                            }
                        }
                    },
                    {
                        title: '地址',
                        key: 'path'
                    },  
                    {
                        title: '描述',
                        key: 'desc'
                    },
                    
                     {
                        title: '分支',
                        key: 'branch',
                        width:150,
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
                                        size: 'big',
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
                                        },
                                       
                                    }
                                },"预览")
                           }
                    },

                ],
                dataApi: [],
                dataName: [],
                dataup:[],
                columnsName: [
                    {
                        width: 50,
                        render: (h, params) => {
                            return h('span', {
                                // domProps:{
                                //     src:fold,                                   
                                // },
                                style:{
                                    display:(params.row.expend=='true')?'inline-block' : 'none',
                                    cursor:'pointer'
                                },
                                class:{
                                    'fold':params.row.fold,
                                    'openFold':!params.row.fold
                                },
                                on: {
                                    click:()=>{
                                        this.changeFold(params)
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '项目名',
                        key: 'name',
                        type:'expend',

                    },
                    {
                        title: '分支',
                        key: 'branch'
                    },
                    {
                        title: 'scheme',
                        key: 'scheme'
                    },
                    {
                        title: '地址',
                        key: 'addr'
                    },
                    
                    {
                        title: 'id',
                        key: 'id'
                        
                    },
                    {
                        title: 'action',
                        key: 'action',
                        align: 'center',
                        
                        width:180,
                           render: (h, params) => {
                            return h('div',[
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'big',
                                        
                                    },
                                    domProps:{
                                        src:look,
                                        alt:'预览'
                                    },
                                    'class':{
                                        // textclasshid:this.textHid,
                                        textclassshow:this.texShow
                                    },
                                    style:{
                                        display:(params.row.expend=='true')?'none' : 'inline-block',
                                        // backgroundColor:'#2d8cf0',
                                        color:'#000',
                                        height:'30px',
                                        lineHeight:'30px',
                                        borderRadius:'5px',
                                        // backgroundColor:(params.row.expend=='true')?'#D1D1D1':'',
                                        cursor:'pointer',
                                        margin: '0 20px',
                                    },
                                    on: {
                                        click:()=>{
                                            this.prjClick(params)
                                        },
                                    }
                                },),
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'big',
                                        
                                    },
                                    domProps:{
                                        src:delImg,
                                        alt:'删除'
                                    },
                                    'class':{
                                        // textclasshid:this.textHid,
                                        textclassshow:this.texShow
                                    },
                                    style:{
                                        display:(params.row.expend=='true')?'none' : 'inline-block',
                                        // backgroundColor:'#2d8cf0',
                                        color:'#000',
                                        height:'30px',
                                        lineHeight:'30px',
                                        borderRadius:'5px',
                                        // backgroundColor:(params.row.expend=='true')?'#D1D1D1':'',
                                        cursor:'pointer',
                                        margin: '0 auto',
                                    },
                                    on: {
                                        click:()=>{
                                            this.deleteNAmePro(params)
                                        },
                                    }
                                },
                                ),
                                h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'big',
                                        
                                    },
                                    
                                    style:{
                                        display:(params.row.expend=='true'&&params.row.fold!=true)?'inline-block' : 'none',
                                        // backgroundColor:'#2d8cf0',
                                        color:'#000',
                                        height:'30px',
                                        lineHeight:'30px',
                                        borderRadius:'5px',
                                        // backgroundColor:(params.row.expend=='true')?'#D1D1D1':'',
                                        cursor:'pointer',
                                        margin: '0 auto',
                                    },

                                },'action')
                                ],)
                           }
                    },

                ],
            valueApi:"",
            valueName:"",
            valueAddrs:"",
            isSelectionData:true,
            isSelect:false,
            deleteData:[],
            }
        },
        mounted(){
            if(this.$route.query.type=="api"){
                this.apiShow = true
                this.apiShows = true
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
                let _this = this
                let hrf = _this.$router.resolve({name:"FrankShow",query:{dataId:data.row.id}})
                window.open(hrf.href,'_blank')
            },
            prjClick (data) {
                let _this = this
                 _this.$router.push({path:"/prjSub",query:{dataName:data.row.name,dataBranch:data.row.branch}})
            },
            change (e) {
                if(e == "api"){
                    this.apiShow = false
                    this.apiShows = false
                    this.upShow = false
                    this.nameShow = true
                }else{
                    this.apiShow = true
                    this.apiShows = true
                    this.upShow = false
                    this.nameShow = false
                }
            },
            xin(e){
                if (e == '*') {
                    return "xin"
                }
            },
            nameSearch(e){
            let _this = this
            switch (e) {
                case "api":
                    
                        axios.get('http://frank.onenet.com/search/api?api='+this.valueApi,{
                        }).then(function(response){
                            _this.dataApi =JSON.parse(response.data.data)
                            _this.upShow = false;
                            _this.apiShows = true;
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                        // _this.dataApi =[{method:'POST',path:213,desc:123,branch:3211,id:12},{method:'post',path:213,desc:123,branch:3211,id:11},{method:'post',path:213,desc:123,branch:3211},{method:'post',path:213,desc:123,branch:3211}]
                    break;
                case "name":
                        axios.get('http://frank.onenet.com/search/project?addr='+this.valueAddrs+'&prj_name='+this.valueName,{
                        }).then(function(response){
                            _this.dataName = _this.dataFold(JSON.parse(response.data.data))
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                        
                        // _this.dataName =[{name:123,branch:'a',scheme:123,addr:3211,id:1},{name:1234,branch:'b',scheme:123,addr:3211,id:2},{name:123,branch:'c',scheme:123,addr:3211,id:3},{name:123,branch:'d',scheme:123,addr:3211,id:4},{name:'asdf',branch:213,scheme:123,addr:'g',id:5},{name:'asdf',branch:213,scheme:123,addr:'e',id:6},{name:'asdf',branch:213,scheme:123,addr:'as',id:7},{name:'asdf',branch:213,scheme:123,addr:'bc',id:8}]
                        // _this.dataName = this.dataFold(_this.dataName)
                    break;
                case "up":
                    axios.get('http://frank.onenet.com/search/upper-apis?sub_api='+this.valueApi,{
                    }).then(function(response){
                            _this.dataUp =JSON.parse(response.data.data)
                            _this.upShow = true;
                            _this.apiShows = false;
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                break;
                default:
                    break;
                }
            },
            
            deleteNAmePro(data){
                this.deleteNameData = data.row.id;
                this.nameModal = true;
            },
            deleteQuerry(){
                let _this = this
                this.$axios.post('http://frank.onenet.com/api/batch-del?id_list='+this.deleteData).then(response => {
                    _this.$Message.success('删除成功');
                    _this.nameSearch('api')
                }).catch(err => {
                    // _this.$Message.error(err);
                })
            },
            
            cancel(){
                this.apimodal = false;
                this.nameModal = false;
            },
            deleteNameQuerry(){
                let _this = this
                this.$axios.post('http://frank.onenet.com/project/del?pid='+this.deleteNameData).then(response => {
                    _this.$Message.success('删除成功')
                    let path = null
                    let foldpath = null
                    path = _this.dataName.findIndex(e=>{
                        return e.id == _this.deleteNameData;
                    })
                    _this.dataName.splice(path,1)
                    foldpath = _this.dataName.findIndex(e=>{
                        e.name == _this.dataName[path].name;
                    })
                    _this.dataName[foldpath].expendValue = _this.dataName[foldpath].expendValue.filter(e=>{
                        e.id != _this.deleteNameData;
                    })
                }).catch(err => {
                    
            })
                
            },
            //处理数据进行折叠
            dataFold(data){
                let fold = []
                let newData = data
                let oldFind = [];
                data.forEach(e => {
                    if(oldFind.find(name => {name==e.name})){
                    }else{
                        fold = data.filter(element => {
                            return element.name == e.name
                        })
                        fold.sort((a,b)=>{
                            let addra = a.branch;
                            let addrb = b.branch;
                            if(addra < addrb){
                                return -1;
                            }
                            if(addra  >addrb){
                                return 1;
                            }
                            return 0;
                        });
                        newData = newData.filter(element => {
                            return element.name != e.name
                        })
                        newData.push({name:e.name,expend:'true',expendValue:fold,fold:true})
                        oldFind.push(e.name)
                        
                    }
                });
                
                return newData
            },
            //数据展开
            changeFold(data){
                let num = this.dataName.findIndex(e=>{return e.name== data.row.name});
                // data.fold = !this.fold;
                if(data.row.fold == true){
                    data.row.expendValue.unshift(num+1,0)
                    this.dataName[num].branch='分支';
                    this.dataName[num].scheme='scheme';
                    this.dataName[num].addr='地址';
                    this.dataName[num].id='id';
                    Array.prototype.splice.apply(this.dataName, data.row.expendValue)
                    console.log(this.dataName)
                    //通过这个才会重新渲染
                    this.dataName.splice()
                    this.dataName[data.index].fold = false
                }else{
                    this.dataName.splice(num+1,data.row.expendValue.length)
                    this.dataName[num].branch='';
                    this.dataName[num].scheme='';
                    this.dataName[num].addr='';
                    this.dataName[num].id='';
                    data.row.fold = true
                    this.dataName[data.index].fold = true
                }
                
                // console.log()
            },
            rowClassName(row, index){
                // console.log(row)
                if(row.expend == "true"){
                    return 'expendColor';
                }
            }
        }
    }
</script>
<style>
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
    body{
        background-color: #e1e1e1
    }
    .show{
        width: 1250px;
       margin: 0 auto;
       height: 100%;
       background-color: #fff;
    }
    .searchIn{
        /* width:100%; */
        padding-top: 20px;
        padding-bottom: 30px;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    }
    .searchIn img{
        display: inline-block;
        width: 50px;
        height: 50px;
        float: left;
    }
    /* .textclasshid{
        display: none
    } */
    .textclassshow{
        display: block
    }
    .textclassshow:hover{
        border: #e1e1e1 1px solid
    }
    .searchIn .small{
        font-size: 5px;
        line-height: 60px;
        display: inline-block;
        width: 50px;
        height: 50px;
        float: left;
    }
    .searchIn .h3{
        width: 60px;
        line-height: 50px;
        display: inline-block;
        height: 50px;
        float: left;
    }
    .searchInput{
        padding-top: 8px;
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
    .searchButton{

    }
    .serachInChange{
        /* width: 200px; */
        text-align: center;
        float: left;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
        cursor: pointer;
        padding-left: 20px;
    }
    /* .searchShow{
       width: 1250px;
       margin: 0 auto;
    } */
    .showTitle Col{
        height: 50px;
        line-height: 50px;
        text-align: center
    }
    .post{
        color: #fff;
        background-color: #19be6b !important;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .get{
        color: #fff;
        background-color: #2d8cf0 !important;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .put{
        color: #fff;
        background-color: #f90 !important;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .delete{
        color: #fff;
        background-color: #ed3f14 !important;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .patch{
        color: #fff;
        background-color: #f90 !important;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
    }
    .xing{
        color: #fff;
        background-color: #8B2323;
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
    .isSelection{
        visibility:hidden
    }
    .fold{
        width: 15px;
        height: 15px;
        background: url('../assets/fold.png') no-repeat;
    }
    .openFold{
        width: 15px;
        height: 15px;
        background: url('../assets/open.png') no-repeat;
    }
     .ivu-table .expendColor td{
        background-color: #F5F5F5 !important;
    }
</style>

