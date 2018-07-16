<!-- 
   text
 -->
<template>
    <!-- text -->
    <formCustom style="justify-content: center;" :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
        <div class="textDiv" @click="textClick">
            <text class="text" :style="{color:textColor,'text-align':isLeft?'left':'right','lines':lines, 'font-size': fontSize}" :type="inputType" :value="textValue"></text>
        </div>
        <div class="inputNum" slot="below" v-if="hasOpen" @appear="appear">
            <div class="open" @click="clickOpen">
                <text :style="{color:'#2F7DCD', 'font-size': fontSize}">{{open}}</text>
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
        title:      {type: String, default: ''},
        titleColor: {type: String, default: '#5f5f5f'},
        textValue:  {type: String, default: ''},
        textColor:  {type: String, default: '#999999'},
        lines:      {type: Number, default: 3},
        inputType:  {type: String, default: 'text'},
        ifRequire:  {type: Boolean, default: false},
        isLeft:     {type: Boolean, default: false},
        hasOpen:    {type: Boolean, default: false},
        lineNumber: {type: Number, default: -1}
    },
    watch: {
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        output:'',
        fontSize:34,
        open:'展开'
    }),
    methods:{
        getOutPut(){
            let output = this.textValue;
            this.$emit('getOutPut', {
                output:output?output:'',
                index:this.index,
            });
        },
        textClick(){
            this.$emit('textClick',{
                title:this.title,
                index:this.index,
            });
        },
        appear(){
            if(this.lineNumber>=this.textValue.length){
                this.hasOpen=false;
            }
        },
        clickOpen(){
            if(this.open == '展开'){
                this.open = '收起';
            } else {
                this.open = '展开';
            }
            
            this.$emit('clickOpen',{
                titile:this.title,
                index:this.index,
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
.textDiv{
    flex: 1;
}
.text {
    margin-top: 10;
    margin-bottom: 10;
    flex: 1;
    text-overflow: ellipsis;
}
.inputNum{
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 20;
}
.open{
    width: 100;
    height:50;
    align-items: flex-end;
    justify-content: center;
}
</style>
