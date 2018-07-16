<!-- 
    textarea
 -->
<template>
    <!-- textarea -->
    <formCustom :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
        <textarea class="textarea" :style="{color:textColor, 'font-size': fontSize, 'lines': lines}" v-if="!isBelow" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></textarea>
        <div class="inputNum" slot="below" v-if="!isBelow && maxNum>0">
            <text :style="{color:numColor, 'font-size': fontSize}">{{textValue.length}}</text>
            <text :style="{color:numColor, 'font-size': fontSize}">/{{maxNum}}</text>
        </div>
        <div slot="below" style="flex-direction: column;margin-right: 16;padding-left: 16">
            <textarea style="" class="textarea" v-if="isBelow" :style="{color:textColor, 'font-size': titleSize, 'lines': lines}" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></textarea>
            <div class="inputNum" v-if="isBelow && maxNum>0">
                <text :style="{color:numColor, 'font-size': fontSize}">{{textValue.length}}</text>
                <text :style="{color:numColor, 'font-size': fontSize}">/{{maxNum}}</text>
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
        index:      {type: Number, default: 0},
        title:      {type: String, default: ''},            //title
        titleColor: {type: String, default: '#5f5f5f'},     //title颜色
        textValue:  {type: String, default: ''},            //text文本
        textColor:  {type: String, default: '#999999'},     //text颜色
        lines:      {type: String, default: 3},             //类型为text时文本内容最大行数
        placeholder:{type: String, default: '请输入内容'},   //input占位符文本
        inputType:  {type: String, default: 'text'},        //input类型，日期选择 date
        maxNum:     {type: Number, default: 200},           //textarea可输入最大字数
        ifRequire:  {type: Boolean, default: false},        //是否必填
        isBelow:    {type: Boolean, default: false},        //false：输入框在右侧  ture： 输入框在下方
    },
    watch: {
        textValue(val){
            // this.getOutPut();
        }
    },
    data:()=> ({
        output:'',
        fontSize:34,
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
            if(this.textValue.length>this.maxNum){
                this.numColor='red';
            }else{
                this.numColor='#999999';
            }
            this.$emit("formInput",{
                value:e.value,
                title:this.title,
            });
        }
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
.textarea{
    margin-top: 10;
    margin-bottom: 10;
    margin-left: 20;
    height: 160;
    flex: 1;
}
.inputNum{
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 20;
}
</style>
