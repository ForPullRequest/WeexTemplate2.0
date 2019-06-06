<!-- 
    type: text, input, textarea, image, radio, checkbox, dropdown
 -->
<template>
    <div>
    <!-- formText,formTextArea,formInput,formImage,formCheckbox,formRadio,formList -->

        <!-- text -->
        <formText v-if="type=='text'"
                :index="index"
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textValue="textValue"
                :textColor="textColor"
                :lines="lines"
                :isBelow="isBelow"
                :inputType="inputType"
                :isLeft="isLeft"
                :isTitleRight="isTitleRight"
                :isTitleBold="isTitleBold"
                :hasOpen="hasOpen"
                :lineNumber="lineNumber"
                :titleWidth="titleWidth"
                :fontSize="fontSize"
                :isRequireLeft="isRequireLeft"
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
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :rightTitle="rightTitle"
                :titleColor="titleColor"
                :rightTitleColor="rightTitleColor"
                :textValue="textValue"
                :textColor="textColor"
                :placeholder="placeholder"
                :placeholderColor="placeholderColor"
                :inputType="inputType"
                :isBelow="isBelow"
                :isLeft="isLeft" 
                :isTitleRight="isTitleRight"
                :titleWidth="titleWidth" 
                :fontSize="fontSize"
                :rightFontSize="rightFontSize"
                :max="max"
                :min="min"
                @formInput="input"
                @rightClick="rightClick"></formInput>

        <!-- <formCustom v-if="type=='input'" :ifRequire=ifRequire :titleSize=fontSize>
            <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
            <input class="input" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize}" v-if="!isBelow" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
            <input slot="below" class="input" v-if="isBelow" :style="{color:textColor,'text-align':isLeft?'left':'right', 'font-size': fontSize}" :type="inputType" :value="textValue" @input="input" :placeholder="placeholder"></input>
        </formCustom>
 -->
        <!-- textarea -->
        <formTextArea v-if="type=='textarea'"
                :index="index"
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :rightTitle="rightTitle"
                :rightTitleColor="rightTitleColor"
                :titleColor="titleColor"
                :textValue="textValue"
                :textColor="textColor"
                :lines="lines"
                :placeholder="placeholder"
                :placeholderColor="placeholderColor"
                :inputType="inputType"
                :maxNum="maxNum"
                :isBelow="isBelow" 
                :titleWidth="titleWidth" 
                :fontSize="fontSize"
                :rightFontSize="rightFontSize"
                :areaHeight="areaHeight"
                @formInput="input"
                @rightClick="rightClick"></formTextArea>


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
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :rightTitle="rightTitle"
                :titleColor="titleColor"
                :rightTitleColor="rightTitleColor"
                :hasAdd="hasAdd"
                :canCancel="canCancel"
                :list="list"
                :titleWidth="titleWidth" 
                :fontSize="fontSize"
                :rightFontSize="rightFontSize"
                :isBelow="isBelow"
                :maxImg="maxImg"
                :imgWidth="imgWidth"
                :imgHeight="imgHeight"
                @imgClick="imgClick"
                @imgCancel="imgCancel"
                @addPic="addPic"
                @rightClick="rightClick"></formImage>


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
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textColor="textColor"
                :isCheck="isCheck"
                :unCheck="unCheck"
                :selectRadio="selectRadio"
                :isLeft="isLeft"
                :isTitleRight="isTitleRight"
                :isBelow="isBelow"
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
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :rightTitle="rightTitle"
                :titleColor="titleColor"
                :rightTitleColor="rightTitleColor"
                :textColor="textColor"
                :isCheck="isCheck"
                :unCheck="unCheck"
                :isLeft="isLeft"
                :isTitleRight="isTitleRight"
                :isBelow="isBelow"
                :list="list"
                :titleWidth="titleWidth"
                :fontSize="fontSize"
                :rightFontSize="rightFontSize"
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
                :tag="tag"
                :ifRequire="ifRequire"
                :title="title"
                :titleColor="titleColor"
                :textColor="textColor"
                :ddtextColor="ddtextColor"
                :textValue="textValue"
                :isLeft="isLeft"
                :isTitleRight="isTitleRight"
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
import { image, modal } from './normal.js'
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
                tag:'',
                //dropdown:选择列表 image:图片选择 radio:单选框 checkbox:复选框
                type:'text',
                //字体大小
                fontSize:34,
                //右侧title字体大小
                rightFontSize:34,
                //title
                title:'',
                //右侧标题文本
                rightTitle:'',
                //title颜色
                titleColor:'#5f5f5f',
                //右侧title颜色
                rightTitleColor:'#5f5f5f',
                //title宽度
                titleWidth:180,
                //text文本
                textValue:'',
                //text颜色
                textColor:'#999999',
                //下拉列表中文本的颜色
                ddtextColor:'#999999',
                //类型为text时文本内容最大行数
                lines:3,
                //input占位符文本
                placeholder:'请输入内容',
                //input占位符颜色
                placeholderColor:'',
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
                //是否标题靠右
                isTitleRight:false,
                //标题是否粗体
                isTitleBold:false,
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
                // model:[],
                isRequireLeft:false,
            },
        },
    },
    computed: {
        index(){
            return this.itemData.index!=null?this.itemData.index:0;
        },
        tag(){
            return this.itemData.tag!=null?this.itemData.tag:'tag'+this.index;
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
        rightFontSize(){
            return this.itemData.rightFontSize?this.itemData.rightFontSize:34;
        },
        title(){
            // this.getOutPut();
            return this.itemData.title?this.itemData.title:'';
        },
        titleColor(){
            return this.itemData.titleColor?this.itemData.titleColor:'#5f5f5f';
        },
        rightTitleColor(){
            return this.itemData.rightTitleColor?this.itemData.rightTitleColor:'#5f5f5f';
        },
        titleWidth(){
            return this.itemData.titleWidth?this.itemData.titleWidth:180;
        },
        textColor(){
            return this.itemData.textColor?this.itemData.textColor:'black';
        },
        ddtextColor(){
            return this.itemData.ddtextColor?this.itemData.ddtextColor:this.itemData.textColor?this.itemData.textColor:'black'
        },
        placeholder(){
            return this.itemData.placeholder?this.itemData.placeholder:'请输入内容';
        },
        placeholderColor(){
            return this.itemData.placeholderColor?this.itemData.placeholderColor:'#999999';
        },
        textValue(){
            return this.itemData.textValue?this.itemData.textValue:'';
        },
        rightTitle(){
            return this.itemData.rightTitle?this.itemData.rightTitle:'';
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
        isTitleBold(){
            return this.itemData.isTitleBold?this.itemData.isTitleBold:false;
        },
        isTitleRight(){
            return this.itemData.isTitleRight?this.itemData.isTitleRight:false;
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
            let nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+7);
            // this.max = this.toDateString(nextDay);
            return this.itemData.max?this.itemData.max:this.toDateString(nextDay);
        },
        min(){
            let today = new Date();
            // this.min = this.toDateString(today);
            return this.itemData.min?this.itemData.min:this.toDateString(today);
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
        },
        isRequireLeft(){
            return this.itemData.isRequireLeft?this.itemData.isRequireLeft:false;
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
        // fontSize:34,
        // numColor:'#999999',
        open:'展开',
        myLines:-1,
    }),
    created(){
        if(this.itemData.type=="text"){
            this.myLines = this.itemData.lines;
        }
    },
    methods:{
        toDateString: function(date){
            if(typeof(date)!='object'){
                return '';
            }
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getYear() + 1900;
            month = month<10?"0"+month:month;
            day = day<10?"0"+day:day;
            return year+'-'+month+'-'+day;
        },
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
            if(this.itemData.lines!= 99){
                this.itemData.lines = 99;
            }else{
                this.itemData.lines = this.myLines;
            }
        },
        input(e){
            // this.output = e.value;
            this.itemData.textValue=e.value;
            // this.getOutPut();
            // if(this.textValue.length>this.maxNum){
            //     this.numColor='red';
            // }else{
            //     this.numColor='#999999';
            // }
            this.$emit("formInput",e);
        },
        imgClick(img) {
            let showPic = function(){
                let arr = [];
                for (var i = 0; i < this.itemData.list.length; i++) {
                    arr.push(this.itemData.list[i].src);
                }
                image.previewImage(arr[img.imgIndex], arr)
            }.bind(this);
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
        rightClick(){
            this.$emit('formTouchRight', this.itemData.tag);
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

