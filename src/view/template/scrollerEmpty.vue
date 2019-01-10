<template>
    <scrollerT ref="list" title="title" barTitleColor="white" :backItemImage="backItemImage" rightItemText="" rightItemImage="" :isIndex="false" :customBack="false" @scrollerBack="scrollerBack" @scrollerAppear="scrollerAppear" @scrollerDisappear="scrollerDisappear" @scrollerRight="scrollerRight" @scrollerTitle="scrollerTitle">
        <div v-for="(item, index) in list" :key="index">
            <list-item class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </list-item>
        </div>
    </scrollerT>
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
        scrollerT: require('./scrollerT.vue'),
        'list-item': require('./UIListItem.vue'),
    },
    data:()=>({
        list:[],
        // backItemImage:'',
    }),
    created(){
        
    },
    methods:{
        scrollerAppear() {
            this.$refs.list.refresh();
        },
        itemClick(index) {

        },
        // listBack(){//customBack为true时可用
        //     normal.alert("listBack");
        // },
        scrollerDisappear(){

        },
        scrollerRight(){
            // normal.alert("This is scrollerRight");
        },
        scrollerTitle(){
            // normal.alert("This is scrollerTitle");
        },
        // scrollerBack(){//customBack为true时可用
        //     // normal.alert("scrollerBack");
        // }
    }
}
</script>