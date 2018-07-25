<template>
    <searchT ref="search" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" :isCenter="true" :noContentImg="noContentImg" :noContentTxt="noContentTxt" @searchAdapter="getList" @searchAppear="appear" @searchInput="searchInput">
        <cell v-for="itemData, index in list" :key="itemData">
            <list-item class="itemDiv" @onclick="itemClick(index)" @longpress="longpress(index)">
                <text class="item" :value="itemData.text"></text>
            </list-item>
        </cell>
    </searchT>
</template>

<style scoped>

.itemDiv{
    padding: 20;
}
.item {
    height: 88px;
    align-items: center;
    font-size: 32
}
</style>

<script>
const normal = require('./normal.js').normal;
import config from './config.js';
export default{
    components: {
        searchT: require('./searchT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
        list:[],//只用于显示
        noContentImg:config.dir+'/images/tmp/components/ic_no_content.png',
        noContentTxt:'暂无数据',
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
        }
    }
}
</script>
