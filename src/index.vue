<template>
    <listT backItemImage="./images/tmp/back.png" ref="list" :title="getTitle()" :hasData="true" :hasRefresh="false" :hasLoad="false" :hasMore="pageNo >= totalPage" @listAdapter="getList" @listAppear="appear">
        <cell>
            <div class="column topDiv">
                <image class="topBack absolute" src="./images/ic_index_back.png" ></image>
                <div class="row">
                    <image src="./images/ic_index_bell.png" class="bell"></image>
                    <text class="text32 fontWhite">待办工作</text>
                </div>
                <div class="row" style="width: 396">
                    <div v-if="isPro" class="column waitDiv flex">
                        <div class="asCenter">
                            <text class="text78 fontWhite">{{waitNum>999?'999+':waitNum}}</text>
                        </div>
                        <div class="waitTxtDiv asCenter">
                            <text class="text28 fontWhite waitTxt">我会诊的 ></text>
                        </div>
                    </div>
                    <div class="column waitDiv flex" style="margin-left: 44;">
                        <div class="asCenter">
                            <text class="text78 fontWhite">{{launchNum>999?'999+':launchNum}}</text>
                        </div>
                        <div class="waitTxtDiv asCenter">
                            <text class="text28 fontWhite waitTxt">我发起的 ></text>
                        </div>
                    </div>
                </div>
            </div>
        </cell>
        <cell v-for="item, index in list">
            <div class="itemDiv white" @click="itemClick(index)">
                <div class="padding20 aiCenter row">
                    <div style="background-color: #457ecf;width: 6;height: 30;border-radius: 10;margin-right: 12;"></div>
                    <text class="text32 fontBlack">{{item.tab}}</text>
                </div>
                <div class="row padding20">
                    <div class="column width200 aiCenter" @click="childClick(index,cIndex)" v-for="child,cIndex in item.child">
                        <image :style="{width:(item.tab=='申请未完成'?'60':'110'),height:(item.tab=='申请未完成'?'60':'110')}" :src="child.icon"></image>
                        <text class="text32 fontBlack marginTop16 lines1">{{child.name}}</text>
                    </div>
                </div>
            </div>
        </cell>
    </listT>
</template>

<style scoped>
.lines1{
    lines: 1;
    text-overflow: ellipsis;
}
.white{
    background-color: white;
}
.flex{
    flex: 1;
}
.width200{
    width: 200;
}
.img{
    width: 110;
    height: 110;
}
.imgSmall{
    width: 60;
    height: 60;
}
.padding20{
    padding: 20;
}
.marginTop16{
    margin-top: 16;
}
.text78{
    font-size: 78;
}
.text28{
    font-size: 28;
}
.text32{
    font-size: 32;
}
.row{
    flex-direction: row;
}
.column{
    flex-direction: column;
}
.jcCenter{
    justify-content: center;
}
.aiCenter{
    align-items: center;
}
.asCenter{
    align-self: center;
}
.itemDiv{
    margin-top: 40;
}
.fontWhite{
    color: white;
}
.fontBlack{
    color: #333333;
}
.topDiv{
    /*background-color: #0070F4;*/
    width: 696;
    height: 340;
    border-radius: 12;
    margin-top: 40;
    margin-left: 30;
    margin-right: 30;
    padding-top: 24;
    padding-left: 16;
}
.topBack{
    width: 696;
    height: 340;
    border-radius: 12;
}
.absolute{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.bell{
    width: 40;
    height: 40;
    margin-right: 12;
}
.waitDiv{
    margin-top: 50;
}
.waitTxtDiv{
    width: 176;
    border-radius: 100;
    border-color: #4286e9;
    border-width: 3;
    background-color: #367ce9;
    margin-top: 16;
    padding-top: 6;
    padding-bottom: 6;
    padding-left: 20;
    padding-right: 20;
}
.waitTxt{
}
</style>

<script>
const normal = require('./view/template/normal.js').normal;
import { push } from "tesla-native-js"
// import keys  from '../js/keys.js';
import myCache  from "./js/cache/myCache.js";
import business  from './business.js';
export default{
    components: {
        listT: require('./view/template/listT.vue'),
        // 'list-item': require('./template/UIListItem.vue'),
    },
    data:()=>({
        isPro:true,//是否专家
        source:'',//病理影像会诊
        hasRegisted:false,
        config:{
            url: '',
            imurl: '',
            visiturl: '',
            diagnoseurl: '',
        },
        pageNo:1,
        totalPage:1,
        waitNum:0,
        launchNum:0,
        list:[],
    }),
    created(){
        this.setList();
        //test
        this.source = 'bl';
        this.setAmount(true, 5)
        this.setAmount(false, 500)
        // normal.alert('token:'+this.token+'=====config:'+this.config);
        myCache.saveAppcode(this.appcode);
        myCache.saveAppid(this.appcode);
        myCache.saveUrl(this.config);
    },
    mounted(){
        myCache.saveToken(this.token, function(){
            //开始网络请求
        }.bind(this));
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        setList(){
            let apply = {
                    tab:'申请未完成',
                    child:[{
                        name:'立即申请',
                        icon:'./images/ic_index_start.png',
                        src:'',//./view/commonSelectPro/index
                    },{
                        name:'草稿',
                        icon:'./images/ic_index_list.png',
                        src:'',//./view/hzApply/index
                    },{
                        name:'待支付',
                        icon:'./images/ic_index_list.png',
                        src:'',
                    }]
                };
            let mine = {
                    tab:'我的',
                    child:[{
                        name:'我会诊的',
                        icon:'./images/ic_index_record.png',
                        src:'./view/commonMain/index',
                        model:{isMyApply:false},
                    },{
                        name:'我发起的',
                        icon:'./images/ic_index_plan.png',
                        src:'./view/commonMain/index',
                        model:{isMyApply:true},
                    },]
                };
            let mineDoc = {
                    tab:'我的',
                    child:[{
                        name:'我发起的',
                        icon:'./images/ic_index_plan.png',
                        src:'./view/commonMain/index',
                        model:{isMyApply:true},
                    },]
                };
            if(this.isPro){
                this.list.push(mine);
                this.list.push(apply);
            }else{
                this.list.push(apply);
                this.list.push(mineDoc);
            }
        },
        setAmount(isDraft, num){
            let name = isDraft
            ? '草稿(' + (num > 99 ? '99+' : num) + ')'
            : '待支付(' + (num > 99 ? '99+' : num) + ')';
            let indexList = this.isPro ? 1 : 0;
            let indexChild = isDraft ? 1 : 2;
            this.list[indexList].child[indexChild].name = name;
        },
        getTitle(){
            if(this.source=='bl'){
                return '远程病理';
            }else if(this.source=='yx'){
                return '远程影像';
            }else if(this.source=='hz'){
                return '远程会诊';
            }
        },
        getList(listT) {
            if(this.hasRegisted){
                //获取页面数据
            }
            listT.end();
        },
        childClick(index,cIndex) {
            
        }
    }
}
</script>