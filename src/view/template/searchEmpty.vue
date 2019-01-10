//customBack为true时可用<template>
    <searchT ref="search" title="title" barTitleColor="white" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasEnd="pageNo >= totalPage" :isCenter="true" :noContentImg="noContentImg" :hasSearch="true" :placeholder="placeholder" :noContentTxt="noContentTxt" :customBack="false" :backItemImage="backItemImage" rightItemText="" rightItemColor="#666666" rightItemImage="" :isIndex="false" @searchBack="searchBack" @searchAdapter="getList" @searchDisappear="searchDisappear" @searchAppear="appear" @searchInput="searchInput" @searchRight="searchRight" @searchTitle="searchTitle">
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
const normal = require('./normal.js').normal;
export default{
    components: {
        searchT: require('./searchT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
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
            normal.toast('refresh')
            //模拟数据获取
            setTimeout(function() {
                //赋值total
                this.totalPage = 3;
                //赋值list
                this.list = [{
                    text:'text'+searchT.isRefresh
                },{
                    text:'text'+'end'
                },{
                    text:'text'+searchT.keyword
                },];
                //结束
                searchT.end();
            }.bind(this), 1000);
        },
        load(searchT) {
            normal.toast('load')
            //模拟数据获取
            setTimeout(function() {
                //赋值list 一般为list的concat操作
                this.list.push({
                    text:'empty'+searchT.keyword,
                })
                //结束
                searchT.end();
            }.bind(this), 1000);
        },
        searchInput(input){
            normal.log('input======='+input.value);
            input.refresh();
        },
        // searchBack(){//customBack为true时可用
        //     normal.alert("searchBack");
        // },
        searchDisappear(){

        },
        searchRight(){
            // normal.alert("This is searchRight");
        },
        searchTitle(){
            // normal.alert("This is searchTitle");
        },
    }
}
</script>
