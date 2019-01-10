<!-- 
    image
 -->
<template>
    <div>
        <!-- 图片选择 -->
        <formCustom :ifRequire="ifRequire" :titleSize="fontSize">
            <div>
                <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text>
                <text class="maxPrompt" v-if="maxImg!=99&&!isBelow">{{list.length}}/{{maxImg}}</text>
            </div>
            <text class="maxPrompt" v-if="maxImg!=99&&isBelow">{{list.length}}/{{maxImg}}</text>
            <div class="group" v-if="!isBelow"  style="flex-wrap: wrap;flex: 1;"><!--  :style="{'justify-content':isLeft?'flex-start':'flex-end'}" -->
                <div class="picBlock" v-for="(item,index) in list" :key="index">
                    <div style="flex-direction: column;" @click="imgClick(index)">
                        <image class="img" :src="item.src" :style="{width:imgWidth+'px', height:imgHeight+'px'}"></image>
                        <text style="font-size: 28px;lines:2;text-overflow: ellipsis;" v-if="item.text">{{item.text}}</text>
                    </div>
                    <div class="img-cancel" style="width:42px;height:42px;padding:6px;" @click="imgCancel(index)" v-if="canCancel">
                        <image class="img-cancel" :src="imageLoad('erase',true)"></image>
                    </div>
                </div>
                <div class="picBlock" v-if="hasAdd&&list.length<maxImg" @click="addPic(index)">
                    <image class="img" :src="imageLoad('upload',true)" :style="{width:imgWidth+'px', height:imgHeight+'px'}"></image>
                </div>
            </div>
            <div slot="below" class="belowBox" style="flex-wrap: wrap;flex: 1;" v-if="isBelow">
                <div class="picBlock" v-for="(item,index) in list" :key="index">
                    <div style="flex-direction: column;align-items: center;justify-content: center;" @click="imgClick(index)">
                        <image class="img" :src="item.src" :style="{width:imgWidth+'px', height:imgHeight+'px'}"></image>
                        <text style="font-size: 28px;lines:2;text-overflow: ellipsis;max-width: 100px;" v-if="item.text">{{item.text}}</text>
                    </div>
                    <div class="img-cancel" style="width:42px;height:42px;padding:6px;" @click="imgCancel(index)" v-if="canCancel">
                        <image class="img-cancel" :src="imageLoad('erase',true)"></image>
                    </div>
                </div>
                <div class="picBlock" v-if="hasAdd&&list.length<maxImg" @click="addPic(index)">
                    <image class="img" :src="imageLoad('upload',true)" :style="{width:imgWidth+'px', height:imgHeight+'px'}"></image>
                </div>
            </div>
        </formCustom>
    </div>
</template>

<script>
import {imageLoad} from '../imageUtil.js';
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom,
    },
    props:{
        index:      {type: Number, default: 0},
        title:      {type: String, default: ''},        //title
        titleColor: {type: String, default: '#5f5f5f'}, //title颜色
        ifRequire:  {type: Boolean, default: false},    //是否必填
        canCancel:  {type: Boolean, default: true},     //图片是否可删除
        hasAdd:     {type: Boolean, default: true},     //图片是否可添加
        list:       {type: Array, default: []},         //图片列表
        titleWidth: {type: Number, default: 180},       //title宽度
        fontSize:   {type: Number, default: 34},        //文字大小
        isBelow:    {type: Boolean, default: false},    //false：图片在右侧  ture： 图片在下方
        maxImg:     {type: Number, default:9},         //最大图片数量
        imgWidth:   {type: Number, default:100},        //图片的宽
        imgHeight:  {type: Number, default:100},        //图片的高
    },
    watch: {
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        imageLoad,
        output:'',
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
        imgClick(index) {
            this.$emit('imgClick', {
                titile:this.title,
                index:index,
                item:this.list[index]
            });
        },
        imgCancel(index){
            this.$emit('imgCancel', {
                titile:this.title,
                index:index,
                item:this.list[index]
            });
        },
        addPic(index){
            this.$emit('addPic', {
                title:this.title,
                item:this.list[index]
            });
        }
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
.img-cancel{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0px;
    top: 0px;
}
.img{
    width: 100px;
    height: 100px;
    padding: 5px;
}
.picBlock{
    margin-left: 10px;
    margin-right: 10px;
    justify-content: center;
}
.group{
    flex: 1;
    flex-direction:row;
    margin-left: 20px;
}
.maxPrompt{
    flex: 1;
    text-align: right;
    font-size: 28px;
    color: #999999;
    margin-top: 10px;
    margin-bottom: 10px;
}
.belowBox{
    flex-direction: row;
    border-top-width: 1px;
    border-color: #e9e9e9;
    margin-top: 10px;
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
}
.belowPrompt{
    align-self: flex-end;
}
</style>
