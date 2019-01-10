<!-- 
    dropdown
 -->
<template>
    <div>
        <!-- 选择列表 -->
        <formCustom :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text>
            <div class="dropdowm-title" @click="dropDown" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                <text class="dropdown-text" :style="{color:titleColor, 'font-size': fontSize+'px'}">{{textValue}}</text>
                <image class="icon-arrow" ref="arrowImg" :src="imageLoad('arrow',true)"></image>
            </div>
            <dropdown slot="below" ref="dropdownList" :items="list" :textColor="titleColor" class="dropdowm-list" tag="tag" @dd_itemClick="itemClick"></dropdown>
        </formCustom>
    </div>
</template>

<script>
import {imageLoad} from '../imageUtil.js';
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom,
        dropdown:require('../UIDropdown.vue'),
    },
    props:{
        index:      {type: Number, default: 0},
        tag:        {type: String, default: ''},
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        textValue:  {type: String, default: ''},        //text文本
        ifRequire:  {type: Boolean, default: false},    //是否必填
        isLeft:     {type: Boolean, default: false},    //是否靠左
        list:       {type: Array, default: []},         //列表
        titleWidth: {type: Number, default: 180},       //title宽度
        fontSize:   {type: Number, default: 34},        //文字大小
    },
    watch: {
        textValue(val){

        }
    },
    data:()=> ({
        imageLoad,
        output:'',
        selectCheck:[],
        numColor:'#999999',
    }),
    methods:{
        itemClick(index){
            this.dropDown();
            this.textValue=this.list[index].name,
            this.$emit('ddItemClick', {
                title:this.title,
                selected:index,
                index:this.index,
                tag:this.tag,
                model:this.list[index],
            });
            this.$emit('getOutPut', {
                selected:index,
                index:this.index,
                tag:this.tag,
                output:this.list[index],
            });
        },
        dropDown(){
            this.$refs.dropdownList.switchView();
        },
    },
    created(){
        
    }
}
</script>

<style scoped>
.title {
    margin-top: 10px;
    margin-bottom: 10px;
}
.dropdown-text{
    color:#41484d;
    text-align: right;
    text-overflow: ellipsis;
    lines: 1;
}
.icon-arrow{
    width: 18px;
    height: 24px;
    align-self: center;
    transform: rotate(90deg);
    margin-left: 20px;
    margin-right: 20px;
}
.dropdowm-title{
    flex:1;
    flex-direction:row;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
}
.dropdowm-list{
    align-content: stretch;
    position: relative;
    z-index: 100;
}
</style>
