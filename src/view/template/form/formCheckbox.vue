<!-- 
    checkbox
 -->
<template>
    <!-- 复选框 -->
    <formCustom :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize}" :value="title"></text>
        <div class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}">
            <checkbox-group :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" :textSize=fontSize @input="checkSelect">
            </checkbox-group>
        </div>
    </formCustom>
</template>

<script>
import formCustom from '../formCustom.vue';
export default {
    components:{
        formCustom,
        checkboxGroup: require('../UICheckboxGroup.vue'),
    },
    props:{
        index:      {type: Number, default: 0},
        title:      {type: String, default: ''},            //title
        titleColor: {type: String, default: '#5f5f5f'},     //title颜色
        isCheck:    {type: String, default: ''},            //选中img
        unCheck:    {type: String, default: ''},            //未选中img
        ifRequire:  {type: Boolean, default: false},        //是否必填
        isLeft:     {type: Boolean, default: false},        //是否靠左
        list:       {type: Array, default: []},
    },
    watch: {
        textValue(val){
            this.getOutPut();
        }
    },
    data:()=> ({
        output:'',
        selectCheck:[],
        fontSize:34,
        numColor:'#999999',
    }),
    methods:{
        checkSelect(val){
            this.selectCheck = val;
        },
        getOutPut(){
            let check = [];
            for (var i = 0; i < this.selectCheck.length; i++) {
                check.push({
                    text:this.list[this.selectCheck[i]].title,
                    code:this.selectCheck[i]
                })
            }
            let output = check;
            this.$emit('getOutPut', {
                output:output?output:'',
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
.group{
    flex: 1;
    flex-direction:row;
    margin-left: 20;
}
</style>
