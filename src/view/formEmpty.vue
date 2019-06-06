<template>
    <listT ref="list" title="申请单" :hasData="1" :hasRefresh="false" :hasLoad="false" :customBack="false" @listBack="listBack" @listAdapter="getList" @listAppear="appear" node="tree">
        <cell v-for = "(itemData,index) in list" :key="index">
            <formT class="borderBottom paddingTB20 white" :itemData="itemData" @imgClick="imgClick" @imgCancel="imgCancel" @addPic="addPic" @getOutPut="getOutPut" @textClick="textClick" @formInput="formInput" @radioSelect="radioSelect" @checkSelect="checkSelect" @ddItemClick="ddItemClick" @formTouchRight="formTouchRight"></formT>
        </cell>
        <cell>
            
        <!-- 按钮 -->
            <div class="btn" @click="clickBtn">
                <text class="btnText" >下一步</text>
            </div>
        </cell>

        <!-- 按钮 -->
        <div slot="action" class="btnAbsolute" @click="clickBtn">
            <text class="btnText" >下一步</text>
        </div>
    </listT>
</template>
<style scoped>
.white{
    background-color: white;
}
.paddingTB20{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 28px;
    padding-right: 28px;
}
.borderBottom{
    border-bottom-width: 1px;
    border-bottom-color: #e9e9e9;
}
.btnAbsolute{
    height: 80px;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #1C86EE;
    justify-content: center;
    border-radius: 10px;
}
.btn{
    flex: 1;
    height: 80px;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #1C86EE;
    justify-content: center;
    border-radius: 10px;
}
.btnText{
    text-align: center;
    font-size: 28px;
    color: white;
}
</style>
<script>
import {imageLoad} from '../template/imageUtil.js';
import {modal,cache} from '../template/normal.js';
export default{
    components: {
        listT: require('../template/listT.vue'),
        formT: require('../template/formT.vue'),
    },
    data:()=>({
        imageLoad,
        list:[],
        data:[],
    }),
    created(){
        this.getList();
    },
    methods:{
        appear() {
            // this.$refs.list.refresh();
        },
        textClick(textValue){
            modal.toast(textValue);
        },
        imgClick(img){
            img.showPic();
        },
        imgCancel(imgCancel){
            if(imgCancel.tag=='imageList1'){
                this.list[17].list.splice(imgCancel.imgIndex, 1);
            }else if(imgCancel.tag=='imageList2'){
                this.list[18].list.splice(imgCancel.imgIndex, 1);
            }
        },
        addPic(img){
            // modal.toast(img);
            if(img.tag=='imageList1'){
                this.list[17].list.push({
                    src:imageLoad('samplePic2',true),
                    title:"标题2"
                })
            }else if(img.tag=='imageList2'){
                this.list[18].list.push({
                    src:imageLoad('samplePic2',true),
                    title:"标题2"
                })
            }
        },
        drop(title){
            modal.toast(title.model);
        },
        getOutPut(output){
            // this.list[output.index].output = output.output;
            modal.alert(output)
        },
        clickBtn(){
            let output = new Map();
            for (var i = 0; i < this.list.length; i++) {
                output.set(this.list[i].tag, this.list[i].output);
            }
            cache.save('output', this.list);
            // modal.alert(output.get('more'));
        },
        formInput(event){
            // modal.alert(event.value);
        },
        radioSelect(val){
            // modal.alert(val.selected);
        },
        checkSelect(val){
            // modal.alert(val);
        },
        ddItemClick(dd){
            // modal.alert(dd.model.name);
        },
        // listBack(){//customBack为true时可用
        //     modal.alert("listBack");
        // },
        getList(listT) {
            this.list = [
                {
                    tag:'common1',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'isRequireLeft',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:true
                },
                {
                    tag:'common2',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'ifRequire',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:false,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common3',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'isBelow',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:true,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common4',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力title',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'title',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common5',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力title',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:280,//标题宽，默认180
                    textValue:'titleWidth',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common6',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:280,//标题宽，默认180
                    textValue:'isTitleRight',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:true,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common6+',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:280,//标题宽，默认180
                    textValue:'isTitleBold',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isTitleBold:true,//标题是否粗体
                    isRequireLeft:false
                },
                {
                    tag:'common7',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#66ccff',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'titleColor',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:false,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common8',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'textColor',//该行展示内容
                    textColor:'#66ccff',//文本内容颜色
                    ifRequire:false,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'common9',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'通用能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'fontSize',//该行展示内容
                    textColor:'#66ccff',//文本内容颜色
                    ifRequire:false,//是否必填（显示星号）
                    isLeft:false,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:28,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'text',//必需，为接口中该值的名称
                    index:0,//必需，为了output
                    type:'text',//展示信息，不传该属性则默认为text
                    title:'text能力',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:180,//标题宽，默认180
                    textValue:'isLeft',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:true,//是否靠左
                    lines:1,//最大行数，超过会显示“...”
                    hasOpen:true,//是否有展开按钮
                    lineNumber:15,//最大显示字数，hasOpen填了则必需
                    isBelow:false,//输入框是否在下方
                    fontSize:34,//字体大小，默认34
                    isTitleRight:false,//标题是否靠右
                    isRequireLeft:false
                },
                {
                    tag:'input1',//必需，为接口中该值的名称
                    index:1,//必需，为了output
                    type:'input',//单行输入
                    title:'input范例1',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    titleWidth:'200',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'可修改的placeholder',//占位符内容
                    placeholderColor:'#66ccff',//占位符颜色
                    inputType:'text',//输入类型
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:true,//输入框是否在下方
                    isLeft:false,//是否靠左
                    fontSize:34,//字体大小，默认34
                    rightFontSize:18,//右侧标题字体大小，默认34
                    max:'',//最大可输入字数，默认无
                    min:'',//最小需输入字数，默认无
                },
                {
                    tag:'input2',//必需，为接口中该值的名称
                    index:1,//必需，为了output
                    type:'input',//单行输入
                    title:'input范例2',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    titleWidth:'200',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'isBelow变更，最大字数10',//占位符内容
                    placeholderColor:'',//占位符颜色
                    inputType:'number',//输入类型
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:false,//输入框是否在下方
                    isLeft:false,//是否靠左
                    fontSize:34,//字体大小，默认34
                    rightFontSize:18,//右侧标题字体大小，默认34
                    max:'10',//最大可输入字数，默认无
                    min:'',//最小需输入字数，默认无
                },
                {
                    tag:'input3',//必需，为接口中该值的名称
                    index:1,//必需，为了output
                    type:'input',//单行输入
                    title:'input范例3',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    titleWidth:'200',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'isLeft范例',//占位符内容
                    placeholderColor:'',//占位符颜色
                    inputType:'number',//输入类型
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:false,//输入框是否在下方
                    isLeft:true,//是否靠左
                    fontSize:34,//字体大小，默认34
                    rightFontSize:18,//右侧标题字体大小，默认34
                    max:'',//最大可输入字数，默认无
                    min:'',//最小需输入字数，默认无
                },
                {
                    tag:'date',//必需，为接口中该值的名称
                    index:2,//必需，为了output
                    type:'input',//单行输入
                    title:'日期范例',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:'',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'限定10-2至10-10日选择',//占位符内容
                    inputType:'date',//输入类型：日期选择
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:false,//输入框是否在下方
                    isLeft:false,//是否靠左
                    fontSize:34,//字体大小，默认34
                    max:'2018-10-10',//可选择最大日期，格式为yyyy-mm-dd
                    min:'2018-10-2',//可选择最小日期，格式为yyyy-mm-dd
                },
                {
                    tag:'date',//必需，为接口中该值的名称
                    index:2,//必需，为了output
                    type:'input',//单行输入
                    title:'日期范例',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:'',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'限定10-2至10-10日选择，isBelow更改',//占位符内容
                    inputType:'date',//输入类型：日期选择
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:true,//输入框是否在下方
                    isLeft:true,//是否靠左
                    fontSize:34,//字体大小，默认34
                    max:'2018-10-10',//可选择最大日期，格式为yyyy-mm-dd
                    min:'2018-10-2',//可选择最小日期，格式为yyyy-mm-dd
                },
                {
                    tag:'more1',//必需，为接口中该值的名称
                    index:3,//必需，为了output
                    type:'textarea',//多行输入
                    title:'多行输入范例1',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:'260',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'可修改的placeholder，最大字数限制10，最多3行高度120',//占位符内容
                    placeholderColor:'#66ccff',//占位符颜色
                    inputType:'text',//输入类型
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:false,//输入框是否在下方
                    maxNum:10,//可输入最大字数，默认500
                    lines:3,//行数,默认3
                    fontSize:34,//字体大小，默认34
                    areaHeight:120,//该textarea高度，默认120
                },
                {
                    tag:'more2',//必需，为接口中该值的名称
                    index:3,//必需，为了output
                    type:'textarea',//多行输入
                    title:'多行输入范例2',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    titleWidth:'260',//标题宽，默认180
                    textValue:'',//该行展示内容
                    textColor:'#999999',//文本内容颜色
                    placeholder:'isBelow变更，无最大字数限制，最多4行高度160',//占位符内容
                    inputType:'text',//输入类型
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:true,//输入框是否在下方
                    maxNum:-1,//可输入最大字数，默认500
                    lines:4,//行数,默认3
                    fontSize:34,//字体大小，默认34
                    rightFontSize:18,//右侧标题字体大小，默认34
                    areaHeight:160,//该textarea高度，默认120
                },
                {
                    tag:'imageList1',//必需，为接口中该值的名称
                    index:4,//必需，为了output
                    type:'image',//图片行表
                    title:'上传图片',//该行的标题
                    rightTitle:'右边的标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    titleWidth:'',//标题宽，默认180
                    ifRequire:true,//是否必填（显示星号）
                    hasAdd:true,//是否允许添加图片
                    canCancel:true,//是否可删除图片
                    isBelow:true,//图片是否在下方
                    maxImg:9,//最大图片数量，99时不显示
                    imgWidth:100,//图片的宽
                    imgHeight:100,//图片的高
                    list:[{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    }],
                    fontSize:34,//字体大小，默认34
                    rightFontSize:18,//右侧标题字体大小，默认34
                },
                {
                    tag:'imageList2',//必需，为接口中该值的名称
                    index:4,//必需，为了output
                    type:'image',//图片行表
                    title:'上传图片',//该行的标题
                    rightTitle:'右边的标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    titleWidth:'',//标题宽，默认180
                    ifRequire:true,//是否必填（显示星号）
                    hasAdd:true,//是否允许添加图片
                    canCancel:true,//是否可删除图片
                    isBelow:false,//图片是否在下方
                    maxImg:9,//最大图片数量，99时不显示
                    imgWidth:100,//图片的宽
                    imgHeight:100,//图片的高
                    list:[{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    }],
                    fontSize:34,//字体大小，默认34
                    rightFontSize:18,//右侧标题字体大小，默认34
                },
                {
                    tag:'showList',//必需，为接口中该值的名称
                    index:5,//必需，为了output
                    type:'image',//图片列表
                    title:'显示图片',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:'',//标题宽，默认180
                    ifRequire:false,//是否必填（显示星号）
                    hasAdd:false,//是否允许添加图片
                    canCancel:false,//是否可删除图片
                    maxImg:99,//最大图片数量，99时不显示
                    imgWidth:100,//图片的宽
                    imgHeight:100,//图片的高
                    isBelow:false,
                    list:[{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },],
                    fontSize:34,//字体大小，默认34
                },
                {
                    tag:'showList',//必需，为接口中该值的名称
                    index:5,//必需，为了output
                    type:'image',//图片列表
                    title:'显示图片',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    titleWidth:'',//标题宽，默认180
                    ifRequire:false,//是否必填（显示星号）
                    hasAdd:false,//是否允许添加图片
                    canCancel:false,//是否可删除图片
                    maxImg:99,//最大图片数量，99时不显示
                    imgWidth:100,//图片的宽
                    imgHeight:100,//图片的高
                    isBelow:true,
                    list:[{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },{
                        src:imageLoad('samplePic2',true),
                        title:"标题2"
                    },{//要显示的图片行表
                        src:imageLoad('samplePic1',true),
                        title:"标题1"
                    },],
                    fontSize:34,//字体大小，默认34
                },
                {
                    tag:'sex',//必需，为接口中该值的名称
                    index:6,//必需，为了output
                    type:'radio',//单选
                    title:'性别',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    textColor:'#666666',
                    titleWidth:'120',//标题宽，默认180
                    isCheck:imageLoad('radioSelected',true),//选中的图片
                    unCheck:imageLoad('radioUnselected',true),//未选中图片
                    selectRadio:'0',//默认选中第一个选项时需要写为'0'
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:false,//选择框是否在下方
                    isLeft:false,//是否靠左
                    list:['男','女'],//选项
                    fontSize:34,//字体大小，默认34
                },
                {
                    tag:'sex',//必需，为接口中该值的名称
                    index:6,//必需，为了output
                    type:'radio',//单选
                    title:'性别（下方）',//该行的标题
                    titleColor:'#5f5f5f',//标题颜色
                    textColor:'#666666',
                    titleWidth:'240',//标题宽，默认180
                    isCheck:imageLoad('radioSelected',true),//选中的图片
                    unCheck:imageLoad('radioUnselected',true),//未选中图片
                    selectRadio:'0',//默认选中第一个选项时需要写为'0'
                    ifRequire:true,//是否必填（显示星号）
                    isBelow:true,//选择框是否在下方
                    isLeft:false,//是否靠左
                    list:['男','女'],//选项
                    fontSize:34,//字体大小，默认34
                },
                {
                    tag:'check',//必需，为接口中该值的名称
                    index:7,//必需，为了output
                    type:'checkbox',//多选
                    title:'复选',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    textColor:'#666666',
                    titleWidth:'120',//标题宽，默认180
                    isCheck:imageLoad('starSelected',true),//选中的图片
                    unCheck:imageLoad('starUnselected',true),//未选中图片
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左,复选框在下方时控制有标题是否靠左
                    isBelow:false,//复选框是否在下方
                    //title为选项名，selected为是否选中
                    list:[{title:'吃饭',selected:true},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}],
                    rightFontSize:18,//右侧标题字体大小，默认34
                },
                {
                    tag:'check',//必需，为接口中该值的名称
                    index:7,//必需，为了output
                    type:'checkbox',//多选
                    title:'复选',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    textColor:'#666666',
                    titleWidth:'120',//标题宽，默认180
                    isCheck:imageLoad('starSelected',true),//选中的图片
                    unCheck:imageLoad('starUnselected',true),//未选中图片
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:true,//是否靠左,复选框在下方时控制有标题是否靠左
                    isBelow:false,//复选框是否在下方
                    //title为选项名，selected为是否选中
                    list:[{title:'吃饭',selected:true},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}],
                    rightFontSize:18,//右侧标题字体大小，默认34
                },
                {
                    tag:'check',//必需，为接口中该值的名称
                    index:7,//必需，为了output
                    type:'checkbox',//多选
                    title:'复选（下方）',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    textColor:'#666666',
                    titleWidth:'240',//标题宽，默认180
                    isCheck:imageLoad('starSelected',true),//选中的图片
                    unCheck:imageLoad('starUnselected',true),//未选中图片
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:false,//是否靠左,复选框在下方时控制有标题是否靠左
                    isBelow:true,//复选框是否在下方
                    //title为选项名，selected为是否选中
                    list:[{title:'吃饭',selected:true},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}],
                    rightFontSize:18,//右侧标题字体大小，默认34
                },
                {
                    tag:'check',//必需，为接口中该值的名称
                    index:7,//必需，为了output
                    type:'checkbox',//多选
                    title:'复选（下方）',//该行的标题
                    rightTitle: '右侧标题',
                    titleColor:'#5f5f5f',//标题颜色
                    rightTitleColor:'pink',//右边的标题颜色
                    textColor:'#666666',
                    titleWidth:'240',//标题宽，默认180
                    isCheck:imageLoad('starSelected',true),//选中的图片
                    unCheck:imageLoad('starUnselected',true),//未选中图片
                    ifRequire:true,//是否必填（显示星号）
                    isLeft:true,//是否靠左,复选框在下方时控制有标题是否靠左
                    isBelow:true,//复选框是否在下方
                    //title为选项名，selected为是否选中
                    list:[{title:'吃饭',selected:true},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}],
                    rightFontSize:18,//右侧标题字体大小，默认34
                },
                // {
                //     tag:'drop1',//必需，为接口中该值的名称
                //     index:8,//必需，为了output
                //     type:'dropdown',//下拉列表
                //     title:'下拉列表',//该行的标题
                //     titleColor:'#5f5f5f',//标题颜色
                //     titleWidth:'',//标题宽，默认180
                //     textValue:'fff',//必需，否则选中项不会在该行显示
                //     textColor:'#999999',//文本内容颜色
                //     ddtextColor:'#666666',//下拉列表文本颜色，默认与textColor相同
                //     ifRequire:true,//是否必填（显示星号）
                //     isLeft:false,//是否靠左
                //     //code标识选项，name为该选项内容
                //     list:[{
                //         code:0,
                //         name:'吃饭',
                //     },{
                //         code:1,
                //         name:'睡觉',
                //     },{
                //         code:2,
                //         name:'打豆豆',
                //     }],
                //     fontSize:34,//字体大小，默认34
                // },
                // {
                //     tag:'drop2',//必需，为接口中该值的名称
                //     index:9,//必需，为了output
                //     type:'dropdown',//下拉列表
                //     title:'下拉列表',//该行的标题
                //     titleColor:'#5f5f5f',//标题颜色
                //     titleWidth:'',//标题宽，默认180
                //     textValue:'fff',//必需，否则选中项不会在该行显示
                //     textColor:'#999999',//文本内容颜色
                //     ifRequire:true,//是否必填（显示星号）
                //     isLeft:true,//是否靠左
                //     //code标识选项，name为该选项内容
                //     list:[{
                //         code:0,
                //         name:'吃饭',
                //     },{
                //         code:1,
                //         name:'睡觉',
                //     },{
                //         code:2,
                //         name:'打豆豆',
                //     }],
                //     fontSize:34,//字体大小，默认34
                // }
            ];
            listT.end();
        },
        formTouchRight(tag) {
            modal.toast(tag+'/右侧点击')
        }
    }
}
</script>