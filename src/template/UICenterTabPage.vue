<!-- 
  component: 点击切换栏目 
             单页展示 
             不能滑动
             靠中心显示
  developer: zhengweibin
 -->
<template>
    <div class="page" :style="{'background-color':itemViewColor, height: itemViewHeight + 'px'}">
        <div class="row" v-for="(item, index) in items" :key="index" :ref="'tabItem'+index" @click="touchPage(item,index)">
            <text style="font-family: PingFangSC-Regular;" :style="{'font-size': itemTextFont + 'px', color: item.isSelect?itemSelectColor:itemNormolColor}">{{item.name}}</text>
            <div v-if="item.hasRP" class="redPoint"></div>
            <div v-if="item.isSelect" class="underline" :style="{'background-color':itemSelectColor}"></div>
        </div>
    </div>
</template>

<style scoped>
    .redPoint{
        background-color:red;
        width: 16px;
        height: 16px;
        border-radius: 100px;
        margin-top: -28px;
    }
    .page {
        /* border-bottom-width: 0px;
        border-bottom-color: #D4D4D4; */
        flex-direction: row;
        justify-content: space-around;
        /* padding-left: 30px;
        padding-right: 30px; */
    }
    .scroller {
        flex: 1;
    }
    .row {
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
    }
    .underline {
        position: absolute;
        left: 15px;
        right: 15px;
        bottom: 0px;
        height: 6px;
    }
</style>

<script>
// const dom = weex.requireModule('dom');

export default {
    components: {

    },
    props: {
        itemViewColor:    {type: String, default: '#314D87'},
        itemViewHeight:   {type: String, default: '96'},
        itemTextFont:     {type: String, default: '34'},
        itemNormolColor:  {type: String, default: '#6A84AF'},
        itemSelectColor:  {type: String, default: '#F7F7F7'},
        //此处数据格式必须为 [{name: "value",isSelect: true/false,其他自定义属性}]
        items:        {type: Array,  default: []}
    },
    data() {
        return {

        }
    },
    watch: {
        // items(curVal, oldVal) {
        //   for (var i in curVal) {
        //     if (curVal[i].isSelect) {
        //       // this.touchPage(curVal[i], i);
        //       return;
        //     }
        //   }
        // }
    },
    methods: {
        touchPage(item, index) {
            // //更改选中状态
            // for (var i in this.items) {
            //  this.items[i].isSelect = false;
            // }
            // item.isSelect = true;

            // //切换tab
            // var key = 'tabItem'+(index-1);
            // if (this.$refs[key]) {
            //  dom.scrollToElement(this.$refs[key]);
            // }
            // //传递事件
            // this.$emit("touchPage",{value: item, index: index});
            var ui = function(){
                //更改选中状态
                for (var i in this.items) {
                    this.items[i].isSelect = false;
                }
                item.isSelect = true;
                // item.hasRP = false;
                //切换tab
                // var key = 'tabItem'+(index);
                // if (this.$refs[key]) {
                //     //TODO 安卓中无效果 iOS崩溃
                //     dom.scrollToElement(this.$refs[key],{});
                // }
            }.bind(this);
            //传递事件
            this.$emit("touchPage",{value: item, index: index, ui: ui});
        }
    },
    created() {

    },
    mounted() {
        // for (var i in this.items) {
        //     if (this.items[i].isSelect) {
        //         // this.touchPage(this.items[i], i);
        //         return;
        //     }
        // }
    }
}
</script>