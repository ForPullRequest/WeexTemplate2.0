<template>
    <listT ref="list" title="申请单" :hasData="1" :hasRefresh="false" :hasLoad="false" :customBack="false" @listBack="listBack" @listAdapter="getList" @listAppear="appear" node="tree">
        <cell v-for = "(itemData,index) in list" :key="index">
            <formT class="borderBottom paddingTB20 white" :itemData="itemData" @imgClick="imgClick" @imgCancel="imgCancel" @addPic="addPic" @getOutPut="getOutPut" @textClick="textClick" @formInput="formInput" @radioSelect="radioSelect" @checkSelect="checkSelect" @ddItemClick="ddItemClick"></formT>
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
import {imageLoad} from './imageUtil.js';
const normal = require('./normal.js').normal;
export default{
    components: {
        listT: require('./listT.vue'),
        formT: require('./formT.vue'),
    },
    data:()=>({
        imageLoad,
        list:[],
        data:[],
    }),
    created(){
        
    },
    methods:{
        appear() {
            this.$refs.list.refresh();
        },
        textClick(textValue){
            normal.toast(textValue);
        },
        imgClick(img){
            img.showPic();
        },
        imgCancel(imgCancel){
            this.list[5].list.splice(imgCancel.index, 1);
            normal.toast(imgCancel.index);
        },
        addPic(img){
            normal.toast(img);
        },
        drop(title){
            normal.toast(title.model);
        },
        getOutPut(output){
            // this.list[output.index].output = output.output;
            normal.alert(output)
        },
        clickBtn(){
            let output = new Map();
            for (var i = 0; i < this.list.length; i++) {
                output.set(this.list[i].tag, this.list[i].output);
            }
            normal.save('output', this.list);
            // normal.alert(output.get('more'));
        },
        formInput(event){
            // normal.alert(event.value);
        },
        radioSelect(val){
            // normal.alert(val.selected);
        },
        checkSelect(val){
            // normal.alert(val);
        },
        ddItemClick(dd){
            // normal.alert(dd.model.name);
        },
        // listBack(){//customBack为true时可用
        //     normal.alert("listBack");
        // },
        getList(listT) {
            normal.get('output', function(ret){
                // if(ret){
                    // normal.alert(ret)
                    // this.list = normal.parse(ret);
                // }else{
                    this.list = {
                        name:{
                            tag:'name',//必需，为接口中该值的名称
                            index:0,//必需，为了output
                            type:'text',//展示信息，不传该属性则默认为text
                            title:'姓名姓名姓名姓名姓名姓名:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:700,//标题宽，默认180
                            textValue:'你的名字你的名字你的名字你的名字你的名字你的名字你的名字你的名字你的名字你的名字你的名字你的名字',//该行展示内容
                            textColor:'#999999',//文本内容颜色
                            ifRequire:true,//是否必填（显示星号）
                            isLeft:false,//是否靠左
                            lines:1,//最大行数，超过会显示“...”
                            hasOpen:true,//是否有展开按钮
                            lineNumber:15,//最大显示字数，hasOpen填了则必需
                            isBelow:true,//输入框是否在下方
                            fontSize:34,//字体大小，默认34
                        },
                        input:{
                            tag:'input',//必需，为接口中该值的名称
                            index:1,//必需，为了output
                            type:'input',//单行输入
                            title:'输入:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            textValue:'',//该行展示内容
                            textColor:'#999999',//文本内容颜色
                            placeholder:'请输入内容',//占位符内容
                            placeholderColor:'',//占位符颜色
                            inputType:'text',//输入类型
                            ifRequire:true,//是否必填（显示星号）
                            isBelow:false,//输入框是否在下方
                            isLeft:false,//是否靠左
                            fontSize:34,//字体大小，默认34
                            max:'',//最大可输入字数，默认无
                            min:'',//最小需输入字数，默认无
                        },
                        date:{
                            tag:'date',//必需，为接口中该值的名称
                            index:2,//必需，为了output
                            type:'input',//单行输入
                            title:'日期:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            textValue:'',//该行展示内容
                            textColor:'#999999',//文本内容颜色
                            placeholder:'请输入日期',//占位符内容
                            inputType:'date',//输入类型：日期选择
                            ifRequire:true,//是否必填（显示星号）
                            isBelow:false,//输入框是否在下方
                            isLeft:false,//是否靠左
                            fontSize:34,//字体大小，默认34
                            max:'2018-10-5',//可选择最大日期，格式为yyyy-mm-dd
                            min:'2018-9-2',//可选择最小日期，格式为yyyy-mm-dd
                        },
                        more:{
                            tag:'more',//必需，为接口中该值的名称
                            index:3,//必需，为了output
                            type:'textarea',//多行输入
                            title:'多行输入:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            textValue:'',//该行展示内容
                            textColor:'#999999',//文本内容颜色
                            placeholder:'请输入内容',//占位符内容
                            placeholderColor:'',//占位符颜色
                            inputType:'text',//输入类型
                            ifRequire:true,//是否必填（显示星号）
                            isBelow:false,//输入框是否在下方
                            maxNum:10,//可输入最大字数，默认500
                            lines:3,//行数,默认3
                            fontSize:34,//字体大小，默认34
                            areaHeight:160,//该textarea高度，默认160
                        },
                        moreBelow:{
                            tag:'more',//必需，为接口中该值的名称
                            index:3,//必需，为了output
                            type:'textarea',//多行输入
                            title:'多行输入:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            textValue:'',//该行展示内容
                            textColor:'#999999',//文本内容颜色
                            placeholder:'请输入内容',//占位符内容
                            inputType:'text',//输入类型
                            ifRequire:true,//是否必填（显示星号）
                            isBelow:true,//输入框是否在下方
                            maxNum:10,//可输入最大字数，默认500
                            lines:3,//行数,默认3
                            fontSize:34,//字体大小，默认34
                            areaHeight:160,//该textarea高度，默认160
                        },
                        imageList:{
                            tag:'imageList',//必需，为接口中该值的名称
                            index:4,//必需，为了output
                            type:'image',//图片行表
                            title:'上传图片:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            ifRequire:false,//是否必填（显示星号）
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
                        },
                        showList:{
                            tag:'showList',//必需，为接口中该值的名称
                            index:5,//必需，为了output
                            type:'image',//图片列表
                            title:'显示图片:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            ifRequire:false,//是否必填（显示星号）
                            hasAdd:false,//是否允许添加图片
                            canCancel:false,//是否可删除图片
                            maxImg:99,//最大图片数量，99时不显示
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
                        },
                        sex:{
                            tag:'sex',//必需，为接口中该值的名称
                            index:6,//必需，为了output
                            type:'radio',//单选
                            title:'性别:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            isCheck:imageLoad('radioSelected',true),//选中的图片
                            unCheck:imageLoad('radioUnselected',true),//未选中图片
                            selectRadio:'0',//默认选中第一个选项时需要写为'0'
                            ifRequire:true,//是否必填（显示星号）
                            isLeft:false,//是否靠左
                            list:['男','女'],//选项
                            fontSize:34,//字体大小，默认34
                        },
                        check:{
                            tag:'check',//必需，为接口中该值的名称
                            index:7,//必需，为了output
                            type:'checkbox',//多选
                            title:'复选:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            isCheck:imageLoad('starSelected',true),//选中的图片
                            unCheck:imageLoad('starUnselected',true),//未选中图片
                            ifRequire:true,//是否必填（显示星号）
                            isLeft:false,//是否靠左
                            //title为选项名，selected为是否选中
                            list:[{title:'吃饭',selected:true},{title:'睡觉',selected:false},{title:'打豆豆',selected:false}],
                            fontSize:34,//字体大小，默认34
                        },
                        drop1:{
                            tag:'drop1',//必需，为接口中该值的名称
                            index:8,//必需，为了output
                            type:'dropdown',//下拉列表
                            title:'下拉列表:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            textValue:'fff',//必需，否则选中项不会在该行显示
                            textColor:'#999999',//文本内容颜色
                            ifRequire:true,//是否必填（显示星号）
                            isLeft:false,//是否靠左
                            //code标识选项，name为该选项内容
                            list:[{
                                code:0,
                                name:'吃饭',
                            },{
                                code:1,
                                name:'睡觉',
                            },{
                                code:2,
                                name:'打豆豆',
                            }],
                            fontSize:34,//字体大小，默认34
                        },
                        drop2:{
                            tag:'drop2',//必需，为接口中该值的名称
                            index:9,//必需，为了output
                            type:'dropdown',//下拉列表
                            title:'下拉列表:',//该行的标题
                            titleColor:'#5f5f5f',//标题颜色
                            titleWidth:'',//标题宽，默认180
                            textValue:'fff',//必需，否则选中项不会在该行显示
                            textColor:'#999999',//文本内容颜色
                            ifRequire:true,//是否必填（显示星号）
                            isLeft:true,//是否靠左
                            //code标识选项，name为该选项内容
                            list:[{
                                code:0,
                                name:'吃饭',
                            },{
                                code:1,
                                name:'睡觉',
                            },{
                                code:2,
                                name:'打豆豆',
                            }],
                            fontSize:34,//字体大小，默认34
                        }};
                // }
            }.bind(this));
            listT.end();
        },
    }
}
</script>