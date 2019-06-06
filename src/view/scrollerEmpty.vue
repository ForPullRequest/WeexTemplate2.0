<template>
    <scrollerT ref="list" title="title" barTitleColor="white" :backItemImage="backItemImage" rightItemText="" rightItemImage="" :isIndex="false" :customBack="false" @scrollerBack="scrollerBack" @scrollerAppear="scrollerAppear" @scrollerDisappear="scrollerDisappear" @scrollerRight="scrollerRight" @scrollerTitle="scrollerTitle">
        
        <div slot="float" class="float" @click="float">
            <text class="text">+</text>
        </div>
        <list-item v-for="(item, index) in list" :key="index">
            <div class="itemDiv" :hasTouchStyle="true" @onclick="itemClick(index)">
            </div>
        </list-item>
    </scrollerT>
</template>

<style scoped>

.itemDiv{
    flex-direction: column;
    height:100px;
    width: 750px;
}
.float {
    width:100px;
    height:100px;
    position: absolute;
    bottom: 50px;
    right: 50px;
    background-color: red;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
}
.text {
    font-size: 42px;
    color: white;
}
</style>

<script>
import {modal} from '../template/normal.js';
export default{
    components: {
        scrollerT: require('../template/scrollerT.vue'),
        'list-item': require('../template/UIListItem.vue'),
    },
    data:()=>({
        list:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        // backItemImage:'',
    }),
    created(){
        
    },
    methods:{
        float(){
            modal.alert('1231231231')
        },
        scrollerAppear() {
            // this.$refs.list.refresh();
        },
        itemClick(index) {

        },
        // listBack(){//customBack为true时可用
        //     modal.alert("listBack");
        // },
        scrollerDisappear(){

        },
        scrollerRight(){
            // modal.alert("This is scrollerRight");
        },
        scrollerTitle(){
            // modal.alert("This is scrollerTitle");
        },
        // scrollerBack(){//customBack为true时可用
        //     // modal.alert("scrollerBack");
        // }
    }
}
</script>