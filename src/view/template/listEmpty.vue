<template>
    <listT ref="list" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" :noContentImg="noContentImg" :noContentTxt="noContentTxt" @listAdapter="getList" @listAppear="appear">
        <cell v-for="item, index in list" >
            <list-item class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </list-item>
        </cell>
    </listT>
</template>

<style scoped>

.itemDiv{
    flex-direction: column;
}
</style>

<script>
const normal = require('./normal.js').normal;
export default{
    components: {
        listT: require('./listT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
        pageSize:10,
        list:[],
        noContentImg:'../../images/tmp/components/ic_no_content.png',
        noContentTxt:'暂无数据',
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        itemClick(index) {

        },
        getList(listT) {
            if(listT.isRefresh){
                //刷新
                this.pageNo = 1;
            }else{
                //加载更多
                this.pageNo++;
            }
            listT.end();
        },
    }
}
</script>