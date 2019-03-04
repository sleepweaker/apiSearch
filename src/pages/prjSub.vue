<template>

    <div class="show">
        <div class="searchIn">
            <h1>接口列表</h1>
            
        </div>
        <div class="searchShow" style="margin-top:10px">
            <Table :columns="columnsBranch" ref="sss" :data="dataBranch" ></Table>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
export default {
    props:[],
    data(){
        return{
            addrSearch:'',
            dataCopy:[],
            columnsBranch: [
                 {
                        title: '请求方式',
                        key: 'method',
                        class:'addrbro',
                        width:180,
                           render: (h, params) => {
                            return h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'big'
                                    },
                                    'class':{
                                        
                                        [params.row.method.toLowerCase()]:true,
                                        'xing':true,
                                    },
                                    // style:{
                                    //     display:'block',
                                    // },
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
                        key: 'path',
                        ref:'address',
                        renderHeader:(h,params)=>{
                            var self = this;
                        	return h('div', {style: {
										display: 'table',
										height: '23px'
					            	}},[
					        	h('span', 
					        		{style: {
					                	display: 'inline-block',
					                	overflow: 'hidden',
					                	textOverflow: 'ellipsis',
					                	whiteSpace: 'nowrap',
					                	lineHeight: '23px',
					                	display: 'auto'
                                    },
                                    attrs: {
                                        id: 'foo'
                                    },
                                    ref:'address',
					        	}, '地址'), 
				        		h('input',{
                                    domProps:{
                                        value: this.addrSearch,
                                    },
                                    on:{
                                        input:function(event){
                                            // console.log(event.target.value)
                                            self.addrSearch = event.target.value
                                        }
                                    },
                                    style:{
                                        display:'inline-block',
                                        width:'80%',
                                        borderRadius:'5px',
                                        marginLeft:'5px'
                                    },

                                }),
                        	]);
                        },
                        render: (h, params) => {
                            return h('div', {
                                    props: {
                                        type: 'primary',
                                        size: 'big',
                                    },
                                    'class':{
                                        'addr':true
                                    },
                                    ref:'addres',
                                    // style:{
                                    //     display:'block',
                                    // },
                                },params.row.path)
                           },
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
                                            this.apiSearch(params)
                                        },
                                       
                                    }
                                },"预览")
                           }
                    },
                    // {
                    //     title: 'action',
                    //     key: 'action',
                    //     width:180,
                    //     align: 'center',
                    //        render: (h, params) => {
                    //         return h('div', {
                    //                 props: {
                    //                     type: 'primary',
                    //                     size: 'big',
                    //                 },
                    //                 style:{
                    //                     display:'block',
                    //                     backgroundColor:'#2d8cf0',
                    //                     color:'#fff',
                    //                     height:'30px',
                    //                     lineHeight:'30px',
                    //                     borderRadius:'5px',
                    //                     cursor:'pointer',
                    //                 },
                    //                 on: {
                    //                     click:()=>{
                    //                         this.rowClick(params)
                    //                     },
                                       
                    //                 }
                    //             },"预览")
                    //        }
                    // },
                ],
            dataBranch:[],
            name:'',
            branch:'',
        }
    },
    watch:{
        'addrSearch':{
            handler(curval,oldval){
                this.heightLight(curval)
            }
        }
    },
    mounted(){
        let _this = this    
        if (_this.$route.query.dataUp!=undefined) {
            Axios.get('http://frank.onenet.com/search/upper-apis?sub_api='+_this.$route.query.dataUp).then(function(response){
                _this.dataBranch = JSON.parse(response.data.data);
                _this.name = _this.dataBranch[0].prj_name;
                _this.branch = _this.dataBranch[0].branch;
            })
        }else{
            Axios.get('http://frank.onenet.com/search/apis?prj_name='+_this.$route.query.dataName+'&branch='+_this.$route.query.dataBranch).then(function(response){
                _this.dataBranch = JSON.parse(response.data.data)
                _this.id = _this.dataBranch[0].prj_name;
                _this.branch = _this.dataBranch[0].branch;
            })
            // _this.dataBranch = [{method:'get',path:123,desc:'message',branch:'123'},{method:'GET',path:'/asd/b',desc:'message',branch:'123'},{method:'GET',path:'/asd/b123',desc:'message',branch:'123'}]
            this.dataCopy = {...this.dataBranch}
        }
    },
    methods:{
        apiSearch(data,index){
            let hrf = this.$router.resolve({name:"FrankShow",query:{datapId:data.row.id,dataName:this.name,dataBranch:this.branch}})
            window.open(hrf.href,'_blank')
        },
        // addrSearchFun(){     
        //     this.$on('inputAddr',function(value){
        //         console.log(value)
        //     })
        // }
      

        heightLight(str){
            this.changeData(str)
            var allAddress = document.getElementsByClassName('addr');
            setTimeout(()=>{
                for(let i = 0; i < allAddress.length; i++){
                    allAddress[i].innerHTML = this.deleteCode(allAddress[i].innerHTML)
                    allAddress[i].innerHTML = allAddress[i].innerHTML.toString().replace(str,`<span class='heightLight' style='background-color: #f90;color:#fff'>${str}</span>`)
                }
            },10)
        },

        deleteCode(str){
            let trueStr  = str.match(/>(.*)</);
            if(trueStr){
                return str.replace(/<span(.*?)span>/,trueStr[1]) 
            }else{
                return str
            }
        },  

        changeData(str){
            this.dataBranch = [];
            let reg = new RegExp(str)
            for(let i in this.dataCopy){
                if(this.dataCopy[i].path.toString().match(reg)){
                    this.dataBranch.push(this.dataCopy[i]);
                }
            }
            if(this.dataBranch.length==0){
                for(let i in this.dataCopy){
                    this.dataBranch.push(this.dataCopy[i]);
                }
            }
            

            
            
        }
        
        // clearColor(){
        //     let lightArr = document.getElementsByClassName('heightLight')
        //     for(let i = 0; i<lightArr.length;i++){
        //         lightArr[i].style.backgroundColor = '#fff';
        //         lightArr[i].style.color = '#000';
        //     }
        // }
    },
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
    body{
    background-color: #e1e1e1
    }
    .show{
        width: 1250px;
       margin: 0 auto;
       height: 100%;
       background-color: #fff;
    }

    .xing{
        color: #fff;
        background-color: #f90;
        text-align: center;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        line-height: 30px;  
    }
    .searchIn{
        /* width:100%; */
        padding-top: 20px;
        padding-bottom: 30px;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    }
    .height-light{
        background-color: black;
    }
</style>
