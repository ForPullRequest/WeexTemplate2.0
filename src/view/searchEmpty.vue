<template>
    <searchT ref="search" title="title" barTitleColor="white" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasEnd="pageNo >= totalPage" :noContentImg="noContentImg" :hasSearch="true" :placeholder="placeholder" :noContentTxt="noContentTxt" :customBack="false" :backItemImage="backItemImage" rightItemText="" rightItemColor="#666666" rightItemImage="" :isIndex="false" @searchBack="searchBack" @searchAdapter="getList" @searchDisappear="searchDisappear" @searchAppear="appear" @searchInput="searchInput" @searchRight="searchRight" @searchTitle="searchTitle">
        <cell v-for="(itemData, index) in list" :key="index">
            <list-item class="itemDiv" @onclick="itemClick(index)" @longpress="longpress(index)">
                <text class="item">{{itemData.text}}</text>
            </list-item>
        </cell>
    </searchT>
</template>

<style scoped>

.itemDiv{
    padding: 20px;
}
.item {
    height: 88px;
    align-items: center;
    font-size: 32px;
}
</style>

<script>
import {modal} from '../template/normal.js';
export default{
    components: {
        searchT: require('../template/searchT.vue'),
        'list-item': require('../template/UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        pageSize:10,
        totalPage:1,
        list:[],//只用于显示
        // noContentImg:'../../images/tmp/components/ic_no_content.png',
        // noContentTxt:'暂无数据',
        placeholder:"请输入关键字"
        // backItemImage:"",
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.search.refresh();
        },
        getList(searchT) {
            console.log(searchT.keyword)
            if(searchT.isRefresh){//刷新
                //当缓存中有数据时且是通过tab取缓存
                this.pageNo = 1;
                this.refresh(searchT);
            }else{//加载更多
                this.pageNo++;
                this.load(searchT);
            }
        },
        refresh(searchT) {
            modal.log('refresh')
            //模拟数据获取
            setTimeout(function() {
                //赋值total
                this.totalPage = 2;
                //赋值list
                // this.list = [];
                // for (var i = 0; i < this.pageSize; i++) {
                //     this.list.push({
                //         text:'text'+i
                //     })
                // }
                //结束
                searchT.end();
            }.bind(this), 1000);
        },
        load(searchT) {
            modal.toast('load')
            //模拟数据获取
            setTimeout(function() {
                //赋值list 一般为list的concat操作
                for (var i = 0; i < this.pageSize; i++) {
                    this.list.push({
                        text:'empty'+i,
                    })
                }
                //结束
                searchT.end();
            }.bind(this), 1000);
        },
        searchInput(input){
            modal.log('input======='+input.value);
            // input.refresh();
        },
        // searchBack(){//customBack为true时可用
        //     modal.alert("searchBack");
        // },
        searchDisappear(){

        },
        searchRight(){
            // modal.alert("This is searchRight");
        },
        searchTitle(){
            // modal.alert("This is searchTitle");
        },
    }
}
</script>
