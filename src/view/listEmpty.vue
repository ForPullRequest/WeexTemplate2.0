<template>
    <listT ref="list" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasEnd="pageNo >= totalPage" barTitleColor="white" :backItemImage="backItemImage" rightItemText="" rightItemColor="#666666" rightItemImage="" :isIndex="false" :customBack="false" :noContentImg="noContentImg" :noContentTxt="noContentTxt" :isShow="isShow" @listBack="listBack" @listAdapter="getList" @listAppear="appear" @listDisappear="listDisappear" @listRight="listRight" @listTitle="listTitle">
        <div slot="noContentAction">
            <div class="myDiv" @click="click">
                <text class="text">点击查看更多</text>
            </div>
        </div>
        <cell v-for="(item, index) in list" :key="index">
            <list-item class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </list-item>
        </cell>
    </listT>
</template>

<style scoped>

.itemDiv{
    flex-direction: column;
}
.myDiv {
    margin-top: 20px;
}
.text {
    color: #4185F3;
    font-size: 28px;
}
</style>

<script>
import {modal} from '../template/normal.js';
export default{
    components: {
        listT: require('../template/listT.vue'),
        'list-item': require('../template/UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,//当前页码
        totalPage:1,//总页数
        pageSize:10,//当前页显示数据的条数
        list:[],
        isShow:true,
        // noContentImg:'../../images/tmp/components/ic_no_content.png',
        // noContentTxt:'暂无数据',
        // backItemImage:'',
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        click() {
            modal.toast('点击查看更多');
        },
        itemClick(index) {

        },
        getList(listT) {
            let pageNo = 0;
            if(listT.isRefresh){
                //刷新
                pageNo = 1;
            }else{
                //加载更多
                pageNo++;
            }
            this.pageNo = pageNo;
            listT.end();
        },
        // listBack(){//customBack为true时可用
        //     modal.alert("listBack");
        // },
        listDisappear(){

        },
        listRight(){
            // modal.alert("This is listRight");
        },
        listTitle(){
            // modal.alert("This is listTitle");
        }
    }
}
</script>