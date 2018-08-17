<!-- 
    type: text, input, textarea, image, radio, checkbox, dropdown
 -->
<template>
    <div>
    <!-- formText,formTextArea,formInput,formImage,formCheckbox,formRadio,formList -->

        <!-- text -->
        <formText v-if="type=='text'"
                :index="index"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :textColor="textColor"
                :lines="lines"
                :isBelow="isBelow"
                :inputType="inputType"
                :isLeft="isLeft"
                :hasOpen="hasOpen"
                :lineNumber="lineNumber"
                :titleWidth="titleWidth"
                :fontSize="fontSize"
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
                :index="index"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :textColor="textColor"
                :placeholder="placeholder"
                :inputType="inputType"
                :isBelow="isBelow"
                :isLeft="isLeft" 
                :titleWidth="titleWidth" 
                :fontSize="fontSize"
                :max="max"
                :min="min"
                @formInput="input"></formInput>

        <!-- <formCustom v-if="type=='input'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <input class="input" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize}" v-if="!isBelow" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
            <input slot="below" class="input" v-if="isBelow" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize}" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
        </formCustom>
 -->
        <!-- textarea -->
        <formTextArea v-if="type=='textarea'"
                :index="index"
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
                :titleWidth="titleWidth" 
                :fontSize="fontSize"
                :areaHeight="areaHeight"
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
                :index="index"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :hasAdd="hasAdd"
                :canCancel="canCancel"
                :list="list"
                :titleWidth="titleWidth" 
                :fontSize="fontSize"
                :isBelow="isBelow"
                :maxImg="maxImg"
                :imgWidth="imgWidth"
                :imgHeight="imgHeight"
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
                :index="index"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :isCheck="isCheck"
                :unCheck="unCheck"
                :selectRadio="selectRadio"
                :isLeft="isLeft"
                :list="list"
                :titleWidth="titleWidth"
                :fontSize="fontSize"
                @radioSelect="radioSelect"
                @getOutPut="getOutPut" ></formRadio>


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
                :index="index"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :isCheck="isCheck"
                :unCheck="unCheck"
                :isLeft="isLeft"
                :list="list"
                :titleWidth="titleWidth"
                :fontSize="fontSize"
                @checkSelect="checkSelect"
                @getOutPut="getOutPut" ></formCheckbox>


        <!-- <formCustom v-if="type=='checkbox'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
                <checkbox-group :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" :textSize=fontSize @input="checkSelect">
                </checkbox-group>
            </div>
        </formCustom> -->
        <!-- 选择列表 -->
        <formList v-if="type=='dropdown'"
                :index="index"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :isLeft="isLeft"
                :list="list"
                :titleWidth="titleWidth"
                :fontSize="fontSize"
                @ddItemClick="ddItemClick"
                @getOutPut="getOutPut" ></formList>

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
import config from './config.js';

export default {
    props:{
        'itemData':{
            default:{
                index:0,
                //dropdown:选择列表 image:图片选择 radio:单选框 checkbox:复选框
                type:'text',
                //字体大小
                fontSize:34,
                //title
                title:'',
                //title颜色
                titleColor:'#5f5f5f',
                //title宽度
                titleWidth:180,
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
                //input为date时的最大选择日期
                max:'',
                //input为date时的最小选择日期
                min:'',
                //最大图片数量
                maxImg:-1,
                //图片的宽
                imgWidth:100,
                //图片的宽
                imgHeight:100,
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
                //是否允许添加图片
                hasAdd:false,
                //图片是否可删除
                canCancel:false,
                //是否有展开
                hasOpen:false,
                //文本区域高度
                areaHeight:160,
                //最大显示字数，hasOpen填了则必需
                lineNumber:-1,
                list:[],
                model:[],
            },
        },
    },
    computed: {
        index(){
            return this.itemData.index!=null?this.itemData.index:0;
        },
        type(){
            return this.itemData.type?this.itemData.type:'text';
        },
        ifRequire() {
            return this.itemData.ifRequire?this.itemData.ifRequire:false;
        },
        fontSize(){
            return this.itemData.fontSize?this.itemData.fontSize:34;
        },
        title(){
            // this.getOutPut();
            return this.itemData.title?this.itemData.title:'';
        },
        titleColor(){
            return this.itemData.titleColor?this.itemData.titleColor:'#5f5f5f';
        },
        titleWidth(){
            return this.itemData.titleWidth?this.itemData.titleWidth:180;
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
            return this.itemData.selectRadio!=null?this.itemData.selectRadio:-1;
        },
        max(){
            return this.itemData.max?this.itemData.max:'';
        },
        min(){
            return this.itemData.min?this.itemData.min:'';
        },
        maxNum(){
            return this.itemData.maxNum?this.itemData.maxNum:200;
        },
        maxImg(){
            return this.itemData.maxImg!=null?this.itemData.maxImg:99;
        },
        hasAdd(){
            return this.itemData.hasAdd?this.itemData.hasAdd:false;
        },
        imgWidth(){
            return this.itemData.imgWidth?this.itemData.imgWidth:100;
        },
        imgHeight(){
            return this.itemData.imgHeight?this.itemData.imgHeight:100;
        },
        hasOpen(){
            return this.itemData.hasOpen?this.itemData.hasOpen:false;
        },
        areaHeight(){
            return this.itemData.areaHeight?this.itemData.areaHeight:160;
        },
        list(){
            return this.itemData.list?this.itemData.list:{};
        },
        lineNumber(){
            return this.itemData.lineNumber!=null?this.itemData.lineNumber:-1;
        }
    },
    watch: {
        selectRadio(val){
            // this.getOutPut();
        },
        textValue(val){
            // this.getOutPut();
        }
    },
    data:()=> ({
        // output:'',
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
            this.$emit('checkSelect',val);
        },
        radioSelect(val){
            this.itemData.selectRadio = val.selected;
            this.$emit('radioSelect',val);
        },
        getOutPut(output){
            // normal.alert(output)
            // let output = '';
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
                    // output = this.itemData.textValue;
                break;
                case 'radio':{
                    output = output
                }
                break;
                case 'checkbox':{
                    output = output;
                }
                break;
                case 'dropdown':
                    output = output;
                break;
            }
            // console.log('-----'+this.itemData.index + output + '/'+normal.json(this.itemData))
            this.$emit('getOutPut', output);
        },
        textClick(e){
            this.$emit('textClick',e);
        },
        clickOpen(e){
            if(this.open == '展开'){
                this.open = '收起';
            } else {
                this.open = '展开';
            }
            
            this.$emit('clickOpen',e);
        },
        input(e){
            // this.output = e.value;
            this.itemData.textValue=e.value;
            // this.getOutPut();
            if(this.textValue.length>this.maxNum){
                this.numColor='red';
            }else{
                this.numColor='#999999';
            }
            this.$emit("formInput",e);
        },
        imgClick(img) {
            let showPic = function(){
                normal.push(config.dir + '/view/template/showPic',{imgUrl:img.item.src});
            }
            img.showPic = showPic;
            this.$emit('imgClick', img);
        },
        imgCancel(img){
            this.$emit('imgCancel', img);
        },
        addPic(img){
            this.$emit('addPic', img);
        },
        ddItemClick(dd){
            this.itemData.textValue=dd.model.name;
            this.$emit('ddItemClick', dd);
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
