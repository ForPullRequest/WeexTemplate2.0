<template>
    <sheetT ref="list" title="title" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasMore="pageNo >= totalPage" :maxShowNum="5" :items="items" @sheetAdapter="getList" @baseAppear="appear" @actionSheet="actionSheet">
        <cell v-for="item, index in list" >
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
const normal = require('./normal.js').normal;
export default{
    components: {
        sheetT: require('./sheetT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        pageNo:1,
        totalPage:1,
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
        actionSheet(sheet){
            normal.toast(sheet);
        }
    }
}
</script>