<!-- 
    image
 -->
<template>
    <div>
        <!-- 图片选择 -->
        <formCustom :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize, 'width': titleWidth}" :value="title"></text>
            <div class="group" v-if="!isBelow"><!--  :style="{'justify-content':isLeft?'flex-start':'flex-end'}" -->
                <div class="picBlock" v-for="item,index in list" >
                    <div @click="imgClick(index)">
                        <image class="img" :src="item" :style="{width:imgWidth, height:imgHeight}"></image>
                    </div>
                    <div class="img-cancel" style="width:42;height:42;padding:6;" @click="imgCancel(index)" v-if="canCancel">
                        <image class="img-cancel" :src="config.dir+'/images/tmp/components/erase-normal.png'"></image>
                    </div>
                </div>
                <div class="picBlock" v-if="hasAdd&&list.length<maxImg" @click="addPic(index)">
                    <image class="img" :src="config.dir+'/images/tmp/upload.png'"></image>
                </div>
                <text class="maxPrompt" v-if="maxImg!=-1">{{list.length}}/{{maxImg}}</text>
            </div>
            <div slot="below" class="belowBox" style="flex-wrap: wrap;flex: 1;" v-if="isBelow">
                <div class="picBlock" v-for="item,index in list" >
                    <div @click="imgClick(index)">
                        <image class="img" :src="item" :style="{width:imgWidth, height:imgHeight}"></image>
                    </div>
                    <div class="img-cancel" style="width:42;height:42;padding:6;" @click="imgCancel(index)" v-if="canCancel">
                        <image class="img-cancel" :src="config.dir+'/images/tmp/components/erase-normal.png'"></image>
                    </div>
                </div>
                <div class="picBlock" v-if="hasAdd&&list.length<maxImg" @click="addPic(index)">
                    <image class="img" :src="config.dir+'/images/tmp/upload.png'"></image>
                </div>
                <text class="maxPrompt belowPrompt" v-if="maxImg!=-1">{{list.length}}/{{maxImg}}</text>
            </div>
        </formCustom>
    </div>
</template>

<script>
import formCustom from '../formCustom.vue';
import config from '../config.js';
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
        maxImg:     {type: Number, default:-1},         //最大图片数量
        imgWidth:   {type: Number, default:100},        //图片的宽
        imgHeight:  {type: Number, default:100},        //图片的高
    },
    watch: {
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        config,
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
    margin-top: 10;
    margin-bottom: 10;
}
.img-cancel{
    width: 30;
    height: 30;
    position: absolute;
    right: 0;
    top: 0;
}
.img{
    width: 100;
    height: 100;
    padding: 5;
}
.picBlock{
    margin-left: 10;
    margin-right: 10;
    justify-content: center;
}
.group{
    flex: 1;
    flex-direction:row;
    margin-left: 20;
}
.maxPrompt{
    flex: 1;
    text-align: right;
    font-size: 28;
    color: #999999;
}
.belowBox{
    flex-direction: row;
    border-top-width: 1;
    border-color: #e9e9e9;
    margin-top: 10;
    padding-top: 20;
    padding-right: 20;
    padding-left: 20;
}
.belowPrompt{
    align-self: flex-end;
}
</style>
