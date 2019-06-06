<template>
    <div class="dataDiv" onclick="empty" append = "node">
        <!-- <div class="upView" v-if="false">
            <text class="title">{{tag}}</text>
            <div v-if="false" class="cancelDiv" @click="cancel">
                <image class="cancelImg" :src="config.dir+'/images/tmp/ic_close.png'"></image>
            </div>
        </div> -->
        <scroller :style="{height: scrollerHeight+'px'}">
            <div :style="{height: itemHeight+'px'}" v-for="(item, index) in list" :key="index">
                <div style="flex-direction: row" @click="itemClick(index)">
                    <text class="text" >{{item.text}}</text>
                    <text class="selectText" v-if="index==selectedIndex">√</text>
                </div>
                <div class="line"></div>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
.cancelDiv{
    width: 100px;
    height: 100px;
    justify-content: center;
    position: absolute;
    right: 0;
}
.line{
    height: 2px;
    background-color: #f2f2f2
}
.dataDiv{
    width: 750px;
    height: 580px;
    background-color: white;
    border-radius: 6px;
    border-width: 1px;
    border-color: #F3F3F3;
}
.upView{
    flex-direction: row;
    height: 100px;
    background-color: #FAFAFA;
    border-top-left-radius: 4.4px;
    border-top-right-radius: 4.4px;
}
.title{
    flex: 1;
    align-self: center;
    text-align: center;
    font-size: 32px;
    color: #6C7880;
}
.cancelImg{
    align-self: center;
    width: 40px;
    height: 40px;
}
.text{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 30px;
    padding-bottom: 30px;
    text-overflow: ellipsis;
    font-size: 28px;
    color:#41484d;
    flex: 1;
    lines:1;
}
.selectText{
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 30px;
    padding-bottom: 30px;
    text-overflow: ellipsis;
    font-size: 28px;
    color:#41484d;
    lines:1;
}
</style>
<script>
export default {
    data:()=> ({
        list:[],
        tag:'',
    }),
    props:{
        selectedIndex:{
            default:0
        },
        tag:{
            default:''
        },
        list:{
            default:[]
        },
        itemHeight:{
            default:94
        },
        scrollerHeight:{
            default:94
        }
    },
    created() {
        // modal.alert({message:this.list.length});
    },
    methods: {
        empty:function(){

        },
        cancel:function(){
            // normal.notify('cancelModal', {});
        },
        itemClick(index) {
            this.$emit("itemClick",{tag:this.tag, text:this.list[index].text, index:index});
            // normal.notify('cancelModal', {tag:this.tag, item:this.list[index], index:index});
            // modal.toast({message:JSON.stringify(this.list[index])});
        },
    }
}
</script>