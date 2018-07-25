<!-- 
    dropdown
 -->
<template>
    <div>
        <!-- 选择列表 -->
        <formCustom :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="dropdowm-title" @click="dropDown" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                <text class="dropdown-text" :style="{color:titleColor, 'font-size': fontSize}">{{textValue}}</text>
                <image class="icon-arrow" ref="arrowImg" :src="config.dir+'/images/tmp/arrow.png'"></image>
            </div>
            <dropdown slot="below" ref="dropdownList" :items="list" :textColor="titleColor" class="dropdowm-list" tag="tag" @dd_itemClick="itemClick"></dropdown>
        </formCustom>
    </div>
</template>

<script>
import formCustom from '../formCustom.vue';
import config from '../config.js';
export default {
    components:{
        formCustom,
        dropdown:require('../UIDropdown.vue'),
    },
    props:{
        index:      {type: Number, default: 0},
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        textValue:  {type: String, default: ''},        //text文本
        ifRequire:  {type: Boolean, default: false},    //是否必填
        isLeft:     {type: Boolean, default: false},    //是否靠左
        list:       {type: Array, default: []},
    },
    watch: {
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        config,
        output:'',
        selectCheck:[],
        fontSize:34,
        numColor:'#999999',
    }),
    methods:{
        getOutPut(){
            let output = this.textValue;
            this.$emit('getOutPut', {
                output:output?output:'',
                index:this.index,
            });
        },
        itemClick(index){
            this.dropDown();
            this.textValue=this.list[index].name,
            this.$emit('ddItemClick', {
                title:this.title,
                model:this.list[index],
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
    width: 180;
    margin-top: 10;
    margin-bottom: 10;
}
.dropdown-text{
    color:#41484d;
    text-align: right;
    text-overflow: ellipsis;
    lines: 1;
}
.icon-arrow{
    width: 18;
    height: 24;
    align-self: center;
    transform: rotate(90deg);
    margin-left: 20;
    margin-right: 20;
}
.dropdowm-title{
    flex:1;
    flex-direction:row;
    padding-top: 10;
    padding-bottom: 10;
    margin-left: 20;
}
.dropdowm-list{
    align-content: stretch;
    position: relative;
    z-index: 100;
}
</style>
