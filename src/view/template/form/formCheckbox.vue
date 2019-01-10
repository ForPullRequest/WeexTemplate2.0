<!-- 
    checkbox
 -->
<template>
    <!-- 复选框 -->
    <formCustom :ifRequire=ifRequire :titleSize=fontSize>
        <text class="title" :style="{color:titleColor, 'font-size': fontSize+'px', 'width': titleWidth+'px'}">{{title}}</text>
        <div class="groupDiv">
            <checkbox-group class="group" :style="{'justify-content':isLeft?'flex-start':'flex-end'}" :checkboxs="list" :selectImg="isCheck" :unselectImg="unCheck" :textSize=fontSize @onCheckboxSelect="checkSelect">
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
        tag:        {type: String, default: ''},
        title:      {type: String, default: ''},            //title
        titleColor: {type: String, default: '#5f5f5f'},     //title颜色
        isCheck:    {type: String, default: ''},            //选中img
        unCheck:    {type: String, default: ''},            //未选中img
        ifRequire:  {type: Boolean, default: false},        //是否必填
        isLeft:     {type: Boolean, default: false},        //是否靠左
        list:       {type: Array, default: []},             //列表
        titleWidth: {type: Number, default: 180},           //title宽度
        fontSize:   {type: Number, default: 34},            //文字大小
    },
    watch: {
        textValue(val){
            
        }
    },
    data:()=> ({
        output:'',
        selectCheck:[],
        numColor:'#999999',
    }),
    methods:{
        checkSelect(val){
            this.selectCheck = val;
            let check = [];
            for (var i = 0; i < this.selectCheck.length; i++) {
                check.push({
                    text:this.list[this.selectCheck[i]].title,
                    code:this.selectCheck[i]
                })
            }
            this.$emit('checkSelect', {
                selected:val,
                index:this.index,
                tag:this.tag,
                check:check,
            });
            this.$emit('getOutPut', {
                selected:val,
                index:this.index,
                tag:this.tag,
                output:check,
            });
        },
    },
    created(){
        
    }
}
</script>

<style scoped>
.title {
    margin-top: 10px;
    margin-bottom: 10px;
}
.groupDiv{
    flex: 1;
    flex-direction:row;
    margin-left: 20px;
}
.group{
    flex-wrap: wrap;
    flex: 1;
}

</style>
