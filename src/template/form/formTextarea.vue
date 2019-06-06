<!-- 
    textarea
 -->
<template>
    <!-- textarea -->
    <formCustom :ifRequire="ifRequire" :title="title" :isRequireLeft="isRequireLeft" :titleSize="fontSize" :titleColor="titleColor" :isTitleRight="isTitleRight" :titleWidth="titleWidth">
        <!-- <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text> -->
        <textarea class="textarea" :style="{color:textColor, 'font-size': fontSize+'px', 'lines': lines, 'height':areaHeight+'px'}" v-if="!isBelow" :type="inputType" v-model="textValue" @input="input" :placeholder="placeholder" :placeholder-color="placeholderColor"></textarea>
        <div class="inputNum" slot="below" v-if="!isBelow && maxNum>0">
            <text :style="{color:numColor, 'font-size': fontSize+'px'}">{{textValue.length}}</text>
            <text :style="{color:numColor, 'font-size': fontSize+'px'}">/{{maxNum}}</text>
        </div>

        <text v-if="isBelow&&rightTitle" :style="{flex: 1,'text-align':'right',color:rightTitleColor, 'font-size': fontSize+'px',}" @click="rightClick">{{rightTitle}}</text>

        <div slot="below" style="flex-direction: column;">
            <textarea class="textarea" v-if="isBelow" :style="{color:textColor, 'font-size': fontSize+'px', 'lines': lines, 'height':areaHeight+'px'}" :type="inputType" v-model="textValue" @input="input" :placeholder="placeholder" :placeholder-color="placeholderColor"></textarea>
            <div class="inputNum" v-if="isBelow && maxNum>0">
                <text :style="{color:numColor, 'font-size': fontSize+'px'}">{{textValue.length}}</text>
                <text :style="{color:numColor, 'font-size': fontSize+'px'}">/{{maxNum}}</text>
            </div>
        </div>
    </formCustom>
</template>

<script>
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom
    },
    props:{
        index:      {type: Number, default: 0},             //该行的索引
        tag:        {type: String, default: ''},            //该行的标签
        title:      {type: String, default: ''},            //title
        rightTitle: {type: String, default: ''},            //右侧标题
        titleColor: {type: String, default: '#5f5f5f'},     //title颜色
        rightTitleColor: {type: String, default: '#5f5f5f'},//右侧title颜色
        textValue:  {type: String, default: ''},            //text文本
        textColor:  {type: String, default: '#999999'},     //text颜色
        lines:      {type: String, default: 3},             //类型为text时文本内容最大行数
        placeholder:{type: String, default: '请输入内容'},   //input占位符文本
        placeholderColor:{type: String, default: ''},       //placeholderColor默认颜色
        inputType:  {type: String, default: 'text'},        //input类型，日期选择 date
        maxNum:     {type: Number, default: 200},           //textarea可输入最大字数
        ifRequire:  {type: Boolean, default: false},        //是否必填
        isBelow:    {type: Boolean, default: false},        //false：输入框在右侧  ture： 输入框在下方
        titleWidth: {type: Number, default: 180},           //title宽度
        fontSize:   {type: Number, default: 34},            //文字大小
        rightFontSize:{type: Number, default: 34},          //右侧文字大小
        areaHeight: {type: Number, default: 120},           //文本区域高度
    },
    watch: {
        textValue(val){
            // this.getOutPut();
            if(this.textValue.length>this.maxNum){
                this.numColor='red';
            }else{
                this.numColor='#999999';
            }
        }
    },
    data:()=> ({
        output:'',
        numColor:'#999999',
    }),
    methods:{
        // getOutPut(){
        //     let output = this.itemData.textValue;
        //     this.$emit('getOutPut', {
        //         output:output?output:'',
        //         index:this.index,
        //     });
        // },
        input(e){
            this.output = e.value;
            this.textValue=e.value;
            // this.getOutPut();
            this.$emit("formInput",{
                value:e.value,
                title:this.title,
                index:this.index,
                tag: this.tag
            });
        },
        rightClick(){
            this.$emit('rightClick');
        },
    },
    created(){
    
    }
}
</script>

<style scoped>
.title {
}
.textarea{
    height: 160px;
    flex: 1;
    padding-top:-4px;
    /* background-color:red; */
}
.inputNum{
    flex-direction: row;
    justify-content: flex-end;
}
</style>
