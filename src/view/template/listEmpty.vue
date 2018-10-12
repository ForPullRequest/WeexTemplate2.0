<template>
    <listT ref="list" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" barTitleColor="white" :backItemImage="backItemImage" rightItemText="" rightItemImage="" :isIndex="false" :customBack="false" :noContentImg="noContentImg" :noContentTxt="noContentTxt" :isShow="isShow" @listBack="listBack" @listAdapter="getList" @listAppear="appear" @listDisappear="listDisappear" @listRight="listRight" @listTitle="listTitle">
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
        //     normal.alert("listBack");
        // },
        listDisappear(){

        },
        listRight(){
            // normal.alert("This is listRight");
        },
        listTitle(){
            // normal.alert("This is listTitle");
        }
    }
}
</script>