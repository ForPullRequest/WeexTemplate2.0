<template>
    <sheetT ref="list" title="title" barTitleColor="white" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasEnd="pageNo >= totalPage" :maxShowNum="5" :selected="selected" :sheetHeight="sheetHeight" :sheetItemHeight="sheetItemHeight" :items="items" :sheetBorderRadius="sheetBorderRadius" :noContentImg="noContentImg" :noContentTxt="noContentTxt" :customBack="false" :backItemImage="backItemImage" rightItemText="" rightItemColor="#666666" rightItemImage="" :isIndex="false" @sheetBack="sheetBack" @sheetAdapter="getList" @sheetAppear="appear" @sheetDisappear="sheetDisappear" @itemClick="itemClick" @sheetRight="sheetRight" @sheetTitle="sheetTitle">
        <cell v-for="(item, index) in list" :key="index">
            <list-item class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </list-item>
        </cell>
        <!-- <select-section slot="section" :tag="tag" :list="sheetList" :itemHeight="sheetItemHeight" :scrollerHeight="sheetHeight"></select-section> -->
    </sheetT>
</template>

<style scoped>

.itemDiv{
    flex-direction: column;
}
</style>

<script>
import {modal} from '../template/normal.js';
export default{
    components: {
        sheetT: require('../template/sheetT.vue'),
        'list-item': require('../template/UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
        sheetBorderRadius:18,
        sheetHeight:580,
        sheetItemHeight:100,
        selected:[0,0],
        // noContentImg:'../../images/tmp/components/ic_no_content.png',
        // noContentTxt:'暂无数据',
        // backItemImage:"",
        list:[],
        items:[{
            tag:'status',
            text:'全部',
            list:[{
                text:'全部'
            },{
                text:'未审批'
            },{
                text:'待诊断'
            },{
                text:'被退回'
            },{
                text:'未审批'
            },{
                text:'待诊断'
            },{
                text:'被退回'
            },],//'全部','未审批','待诊断','被退回','已诊断','未审批','待诊断','被退回','已诊断','未审批','待诊断','被退回','已诊断'
        },{
            tag:'hospital',
            text:'全部医院',
            list:[{
                text:'全部医院'
            },{
                text:'浙一'
            },{
                text:'浙二'
            },{
                text:'浙三'
            },],//'全部医院','浙一','浙二','浙三'
        }],
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        itemClick(index) {

        },
        getList(sheetT) {
            if(sheetT.isRefresh){
                //刷新
            }else{
                //加载更多
            }
            sheetT.end();
        },
        itemClick(item){
            modal.alert(item);
        },
        // sheetBack(){//customBack为true时可用
        //     modal.alert("sheetBack");
        // },
        sheetDisappear(){

        },
        sheetRight(){
            // modal.alert("This is sheetRight");
        },
        sheetTitle(){
            // modal.alert("This is sheetTitle");
        }
    }
}
</script>