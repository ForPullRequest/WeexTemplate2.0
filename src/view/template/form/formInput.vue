<!-- 
    input
 -->
<template>
    <!-- input -->
    <formCustom :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}" >{{title}}</text>
        <!-- :type 导致px2rem失效, 使用多个input代替 -->
        <input class="input" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize+'px'}" v-if="(!isBelow)&&inputType=='text'"  v-model="textValue"
         type="text" :max="max" :min="min" @input="input" @change="onchange" :placeholder="placeholder" :placeholder-color="placeholderColor"/>
         <input class="input" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize+'px'}" v-if="(!isBelow)&&inputType=='date'"  v-model="textValue"
         type="date" :max="max" :min="min" @input="input" @change="onchange" :placeholder="placeholder" :placeholder-color="placeholderColor"/>
         <input class="input" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize+'px'}" v-if="(!isBelow)&&inputType=='number'"  v-model="textValue"
         type="number" :max="max" :min="min" @input="input" @change="onchange" :placeholder="placeholder" :placeholder-color="placeholderColor"/>

        <input slot="below" class="input" v-if="isBelow&&inputType=='text'" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize+'px'}" 
        type="text" v-model="textValue" :max="max" :min="min" @input="input" @change="onchange" :placeholder="placeholder" :placeholder-color="placeholderColor"/>
        <input slot="below" class="input"  v-if="isBelow&&inputType=='date'" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize+'px'}" 
        type="date" v-model="textValue" :max="max" :min="min" @input="input" @change="onchange" :placeholder="placeholder" :placeholder-color="placeholderColor"/>
        <input slot="below" class="input"  v-if="isBelow&&inputType=='number'" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize+'px'}" 
        type="number" v-model="textValue" :max="max" :min="min" @input="input" @change="onchange" :placeholder="placeholder" :placeholder-color="placeholderColor"/>
    
    
    
    </formCustom>
</template>

<script>
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom,
    },
    props:{
        index:      {type: Number, default: 0},
        title:      {type: String, default: ''},            //title
        titleColor: {type: String, default: '#5f5f5f'} ,    //title颜色
        textValue:  {type: String, default: ''},            //text文本
        textColor:  {type: String, default: '#999999'},     //text颜色
        placeholder:{type: String, default: '请输入内容'},  //input占位符文本
        placeholderColor:{type: String, default: ''},       //placeholderColor默认颜色
        inputType:  {type: String, default: 'text'},        //input类型，日期选择 date
        ifRequire:  {type: Boolean, default: false},        //是否必填
        isBelow:    {type: Boolean, default: false},        //false：输入框在右侧  ture： 输入框在下方
        isLeft:     {type: Boolean, default: false},        //是否靠左
        titleWidth: {type: Number, default: 180},           //title宽度
        fontSize:   {type: Number, default: 34},            //文字大小
        max:        {type: String, default: ''},  //当type属性为date时选择日期的最大时间，格式为yyyy-MM-dd
        min:        {type: String, default: ''},  //当type属性为date时选择日期的最小时间，格式为yyyy-MM-dd
    },
    computed:{

    },
    watch: {
        // textValue(val){
            // this.getOutPut();
            // if(this.textValue.length>this.maxNum){
            //     this.numColor='red';
            // }else{
            //     this.numColor='#999999';
            // }
        // }
    },
    data:()=> ({
        output:'',
        numColor:'#999999',
    }),
    methods:{
        // getOutPut(){
        //     let output = this.textValue;
        //     console.log('+++++'+this.textValue)
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
        },
        onchange(e) {
            if ((this.inputType=="time" || this.inputType=="date") && weex.config.env.platform.toLowerCase()=="ios") {
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
    },
    created(){
    },
}
</script>

<style scoped>
.title {
    margin-top: 10px;
    margin-bottom: 10px;
}
.input {
    margin-left: 20px;
    height: 60px;
    flex: 1;
}
</style>
