<!-- 
    type: text, input, textarea, image, radio, checkbox, dropdown
 -->
<template>
    <div>
    <!-- formText,formTextArea,formInput,formImage,formCheckbox,formRadio,formList -->

        <!-- text -->
        <formText v-if="type=='text'"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :textColor="textColor"
                :lines="lines"
                :inputType="inputType"
                :isLeft="isLeft"
                :hasOpen="hasOpen"
                :lineNumber="lineNumber" 
                @clickOpen="clickOpen" 
                @textClick="textClick"></formText>

        <!-- <formCustom style="justify-content: center;" v-if="type=='text'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="textDiv" @click="textClick">
                <text class="text" :style="{color:textColor,'text-align':isLeft?'left':'right','lines':lines, 'font-size': fontSize}" :type="inputType" :value="textValue"></text>
            </div>
            <div class="inputNum" slot="below" v-if="hasOpen">
                <div class="open" @click="clickOpen">
                    <text :style="{color:'#2F7DCD', 'font-size': fontSize}">{{open}}</text>
                </div>
            </div>
        </formCustom> -->

        <!-- input -->
        <formInput v-if="type=='input'"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :textColor="textColor"
                :placeholder="placeholder"
                :inputType="inputType"
                :isBelow="isBelow"
                :isLeft="isLeft" 
                @formInput="input"></formInput>

        <!-- <formCustom v-if="type=='input'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <input class="input" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize}" v-if="!isBelow" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
            <input slot="below" class="input" v-if="isBelow" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize}" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
        </formCustom>
 -->
        <!-- textarea -->
        <formTextArea v-if="type=='textarea'"
                    :ifRequire="ifRequire"
                    :title="title"
                    :titleColor="titleColor"
                    :textValue="textValue"
                    :textColor="textColor"
                    :lines="lines"
                    :placeholder="placeholder"
                    :inputType="inputType"
                    :maxNum="maxNum"
                    :isBelow="isBelow" 
                    @formInput="input"></formTextArea>


       <!--  <formCustom v-if="type=='textarea'" :ifRequire=ifRequire :titleSize=fontSize>
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
        </formCustom> -->

        <!-- 图片选择 -->
        <formImage v-if="type=='image'"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :canCancel="canCancel"
                :list="list" 
                @imgClick="imgClick"
                @imgCancel="imgCancel"
                @addPic="addPic"></formImage>

        <!-- <formCustom v-if="type=='image'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="group">
                <div class="picBlock" v-for="item,index in list" >
                    <div @click="imgClick(index)">
                        <image class="img" :src="item"></image>
                    </div>
                    <div class="img-cancel" style="width:42;height:42;padding:6;" @click="imgCancel(index)" v-if="canCancel">
                        <image class="img-cancel" src="../../images/tmp/components/erase-normal.png"></image>
                    </div>
                </div>
                <div class="picBlock" v-if="canCancel" @click="addPic(index)">
                    <image class="img" src="../../images/tmp/upload.png"></image>
                </div>
            </div>
        </formCustom> -->

        <!-- 单选框 -->
        <formRadio v-if="type=='radio'"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :isCheck="isCheck"
                :unCheck="unCheck"
                :selectRadio="selectRadio"
                :isLeft="isLeft"
                :list="list"></formRadio>


        <!-- <formCustom v-if="type=='radio'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                <radio-group :selectImg="isCheck" :unselectImg="unCheck" :value="selectRadio" :textSize=fontSize @input="radioSelect">
                    <div v-for="item in list">
                        <radio :label="item"></radio>
                    </div>
                </radio-group>
            </div>
        </formCustom> -->
        <!-- 复选框 -->
        <formCheckbox v-if="type=='checkbox'"
                    :ifRequire="ifRequire"
                    :title="title"
                    :titleColor="titleColor"
                    :isCheck="isCheck"
                    :unCheck="unCheck"
                    :isLeft="isLeft"
                    :list="list"></formCheckbox>


        <!-- <formCustom v-if="type=='checkbox'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                <checkbox-group :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" :textSize=fontSize @input="checkSelect">
                </checkbox-group>
            </div>
        </formCustom> -->
        <!-- 选择列表 -->
        <formList v-if="type=='dropdown'"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :isLeft="isLeft"
                :list="list"
                @ddItemClick="ddItemClick"></formList>

        <!-- <formCustom v-if="type=='dropdown'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="dropdowm-title" @click="dropDown" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                <text class="dropdown-text" :style="{color:titleColor, 'font-size': fontSize}">{{textValue}}</text>
                <image class="icon-arrow" ref="arrowImg" src="../../images/tmp/arrow.png"></image>
            </div>
            <dropdown slot="below" ref="dropdownList" :items="list" :textColor="titleColor" class="dropdowm-list" tag="tag" @dd_itemClick="itemClick"></dropdown>
        </formCustom> -->
    </div>
</template>

<script>
var    animation = require('./animation.js').animation;
const  normal    = require('./normal.js').normal;
import formText  from './form/formText.vue';
import formTextArea from './form/formTextarea.vue';
import formInput from './form/formInput.vue';
import formImage from './form/formImage.vue';
import formCheckbox from './form/formCheckbox.vue';
import formRadio from './form/formRadio.vue';
import formList  from './form/formSelectList.vue';


export default {
    props:{
        'itemData':{
            default:{
                index:0,
                //dropdown:选择列表 image:图片选择 radio:单选框 checkbox:复选框
                type:'text',
                //title
                title:'',
                //title颜色
                titleColor:'#5f5f5f',
                //text文本
                textValue:'',
                //text颜色
                textColor:'#999999',
                //类型为text时文本内容最大行数
                lines:3,
                //input占位符文本
                placeholder:'请输入内容',
                //input类型，日期选择 date
                inputType:'text',
                //textarea可输入最大字数
                maxNum:200,
                //选中img
                isCheck:'',
                //未选中img
                unCheck:'',
                //默认选中（单选）
                selectRadio:-1,
                //是否必填
                ifRequire:false, 
                //false：输入框在右侧
                //ture： 输入框在下方
                isBelow:false,
                //是否靠左
                isLeft:false,
                //图片是否可删除
                canCancel:false,
                //是否有展开
                hasOpen:false,
                //每行的字数
                lineNumber:-1,
                list:[],
                model:[],
            },
        },
    },
    computed: {
        type(){
            return this.itemData.type?this.itemData.type:'text';
        },
        ifRequire() {
            return this.itemData.ifRequire?this.itemData.ifRequire:false;
        },
        title(){
            this.getOutPut();
            return this.itemData.title?this.itemData.title:'';
        },
        titleColor(){
            return this.itemData.titleColor?this.itemData.titleColor:'#5f5f5f';
        },
        textColor(){
            return this.itemData.textColor?this.itemData.textColor:'#999999';
        },
        placeholder(){
            return this.itemData.placeholder?this.itemData.placeholder:'请输入内容';
        },
        textValue(){
            return this.itemData.textValue?this.itemData.textValue:'';
        },
        inputType(){
            return this.itemData.inputType?this.itemData.inputType:'text';
        },
        isBelow(){
            return this.itemData.isBelow?this.itemData.isBelow:false;
        },
        isCheck(){
            return this.itemData.isCheck?this.itemData.isCheck:'';
        },
        unCheck(){
            return this.itemData.unCheck?this.itemData.unCheck:'';
        },
        isLeft(){
            return this.itemData.isLeft?this.itemData.isLeft:false;
        },
        lines(){
            return this.itemData.lines?this.itemData.lines:3;
        },
        canCancel(){
            return this.itemData.canCancel?this.itemData.canCancel:false;
        },
        selectRadio(){
            return this.itemData.selectRadio?this.itemData.selectRadio:-1;
        },
        maxNum(){
            return this.itemData.maxNum?this.itemData.maxNum:200;
        },
        hasOpen(){
            return this.itemData.hasOpen?this.itemData.hasOpen:false;
        },
        list(){
            return this.itemData.list?this.itemData.list:{};
        },
        lineNumber(){
            return this.itemData.lineNumber?this.itemData.lineNumber:-1;
        }
    },
    watch: {
        selectRadio(val){
            this.getOutPut();
        },
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        output:'',
        // selectRadio:-1,
        selectCheck:[],
        fontSize:34,
        numColor:'#999999',
        open:'展开'
    }),
    created(){
        if(this.itemData.type=="text"){
            if(this.itemData.lineNumber>=this.itemData.textValue.length){
                this.itemData.hasOpen=false;
            }
        }
    },
    methods:{
        checkSelect(val){
            this.selectCheck = val;
        },
        radioSelect(val){
            this.selectRadio = val;
        },
        getOutPut(){
            let output = '';
            //text, input, textarea, image, radio, checkbox, dropdown
            switch(this.itemData.type){
                case 'text':
                    output = this.itemData.textValue;
                break;
                case 'input':
                    output = this.itemData.textValue;
                break;
                case 'textarea':
                    output = this.itemData.textValue;
                break;
                case 'image':
                    output = this.itemData.textValue;
                break;
                case 'radio':
                    if(this.selectRadio==-1){
                        output = '';
                    }else{
                        output = this.list[this.selectRadio];
                    }
                break;
                case 'checkbox':
                    let check = [];
                    for (var i = 0; i < this.selectCheck.length; i++) {
                        check.push({
                            text:this.list[this.selectCheck[i]].title,
                            code:this.selectCheck[i]
                        })
                    }
                    output = check;
                break;
                case 'dropdown':
                    output = this.itemData.textValue;
                break;
            }
            // console.log('-----'+this.itemData.index + output + '/'+normal.json(this.itemData))
            this.$emit('getOutPut', {
                output:output?output:'',
                index:this.itemData.index,
            });
        },
        textClick(){
            this.$emit('textClick',{
                title:this.itemData.title,
                index:this.itemData.index,
            });
        },
        clickOpen(){
            if(this.open == '展开'){
                this.open = '收起';
            } else {
                this.open = '展开';
            }
            
            this.$emit('clickOpen',{
                titile:this.itemData.title,
                index:this.itemData.index,
            });
        },
        input(e){
            this.output = e.value;
            this.itemData.textValue=e.value;
            this.getOutPut();
            if(this.textValue.length>this.maxNum){
                this.numColor='red';
            }else{
                this.numColor='#999999';
            }
            this.$emit("formInput",{
                value:e.value,
                title:this.itemData.title,
            });
        },
        imgClick(index) {
            this.$emit('imgClick', {
                titile:this.itemData.title,
                index:index,
            });
        },
        imgCancel(index){
            this.$emit('imgCancel', {
                titile:this.itemData.title,
                index:index,
            });
        },
        addPic(index){
            this.$emit('addPic', {
                title:this.itemData.title,
            });
        },
        ddItemClick(index){
            this.dropDown();
            this.itemData.textValue=this.list[index].name,
            this.$emit('ddItemClick', {
                title:this.itemData.title,
                model:this.list[index],
            });
        },
        dropDown(){
            this.$refs.dropdownList.switchView();
        },
    },
    components:{
        formCustom: require('./formCustom.vue'),
        'list-item': require('./UIListItem.vue'),
        radioGroup: require('./UIRadioGroup.vue'),
        radio: require('./UIRadio.vue'),
        checkboxGroup: require('./UICheckboxGroup.vue'),
        checkbox: require('./UICheckbox.vue'),
        dropdown:require('./UIDropdown.vue'),
        formText,formTextArea,formInput,formImage,formCheckbox,formRadio,formList
    }
}
</script>

<style scoped>
.red {
    background-color: red;
}
.title {
    width: 180;
    margin-top: 10;
    margin-bottom: 10;
}
.textDiv{
    flex: 1;
}
.text {
    margin-top: 10;
    margin-bottom: 10;
    flex: 1;
    text-overflow: ellipsis;
}
.input {
    margin-left: 20;
    height: 60;
    flex: 1;
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
.open{
    width: 100;
    height:50;
    align-items: flex-end;
    justify-content: center;
}
</style>
