<template>
    <div>
        <div style="flex-direction: row;">
            <text class="title" style="align-self: center;padding: 20;">名称</text>
            <input class="input" type="text" :value="nameVal" @input="nameInput"></input>
        </div>
        <div style="flex-direction: row;">
            <text class="title" style="align-self: center;padding: 20;">数据</text>
            <input class="input" type="text" :value="dataVal" @input="dataInput"></input>
        </div>
        <div style="flex-direction: row;">
            <text class="title" style="align-self: center;padding: 20;">正则</text>
            <input class="input" type="text" :value="empVal" @input="empInput"></input>
        </div>
        <text class="title" style="padding: 20;border-width: 2;border-color: blue;text-align: center;" @click="test">运行</text>
        <scroller scroll-direction="horizontal" style="flex-direction: row;height: 80">
            <text class="title padding20" style="border-right-width: 2;border-color: red;margin-top: 10;margin-bottom: 10;" v-for="item,index in classList" @click="classClick(index)">{{item.name}}</text>
        </scroller>
        <scroller>
            <div style="flex-direction: row;padding: 20;" v-for="item,index in list" @click="itemClick(index)">
                <text class="title maxWidth textGray">{{item.name}}</text>
                <text class="title" style="margin-left: 20;flex: 1;">{{item.emp}}</text>
            </div>
        </scroller>
    </div>
</template>

<style scoped>

.input {
    margin-left: 20;
    flex:1;
    height: 80;
}
.title {
    font-size: 28;
}
.textGray{
    color: gray;
}
.maxWidth{
    width: 280;
}
.padding20{
    padding: 20;
}
</style>

<script>
const normal = require('../view/template/normal.js').normal;
export default{
    components: {
        
    },
    data:()=>({
        dataVal:'',
        empVal:'',
        nameVal:'',
        classList:[{
            index:0,
            name:'基础',
            list:'baseList',
        },{
            index:1,
            name:'元字符',
            list:'originList',
        },{
            index:2,
            name:'量词',
            list:'measureList',
        },{
            index:3,
            name:'数学',
            list:'mathList',
        },{
            index:4,
            name:'业务',
            list:'businessList',
        },],
        package:{
            baseList:[{
                data:'aabbcc',
                emp:'[abc]',
                name:'【基础】a或b或c',
            },{
                data:'abdd',
                emp:'[^abc]',
                name:'【基础】abc以外的值',
            },{
                data:'A',
                emp:'[0-z]',
                name:'【基础】X到Y区间的单个字符(ASCII码)',
            },{
                data:'red',
                emp:'(red|blue|green)',
                name:'【基础】指定的值',
            }],
            originList:[{
                data:"It's hot!",
                emp:'h.t',
                name:'【元字符】.',
            },{
                data:'abc123',
                emp:'\\w',
                name:'【元字符】单词(字母数字 abc123)',
            },{
                data:'/',
                emp:'\\W',
                name:'【元字符】非单词(非字母数字 ,!我のα)',
            },{
                data:'1',
                emp:'\\d',
                name:'【元字符】数字',
            },{
                data:'a',
                emp:'\\D',
                name:'【元字符】非数字',
            },{
                data:' ',
                emp:'\\s',
                name:'【元字符】空白字符(空格)',
            },{
                data:'a',
                emp:'\\S',
                name:'【元字符】非空白字符',
            },{
                data:'Visit W3School',
                emp:'\\bW3',
                name:'【元字符】单词边界(前后不与另个单词字符直接相邻)',
            },{
                data:'Visit W3School',
                emp:'\\BSchool',
                name:'【元字符】非单词边界(前后与另个单词字符直接相邻)',
            },{
                data:'\ninput框无法输入但是可赋值',
                emp:'\\n',
                name:'【元字符】换行符',
            },{
                data:'\0\f\t\vinput框无法输入但是可赋值',
                emp:'\\0\\f\\t\\v',
                name:'【元字符】NUL字符\\0换页符\\f制表符\\t垂直制表符\\v',
            },{
                data:'',
                emp:'\\xxx',
                name:'【元字符】八进制数 xxx',
            },{
                data:'',
                emp:'\\xdd',
                name:'【元字符】十六进制数 dd',
            },{
                data:'',
                emp:'\\uxxxx',
                name:'【元字符】十六进制数 xxxx',
            },],
            measureList:[{
                data:'Hellooo World! Hello W3School!',
                emp:'o+',
                name:'【量词】+ 至少一个 o ',
            },{
                data:'Hellooo World! Hello W3School!',
                emp:'lo*',
                name:'【量词】* 零个或多个 o ',
            },{
                data:'1, 100 or 1000?',
                emp:'10?',
                name:'【量词】? 零个或一个 o',
            },{
                data:'100, 1000 or 10000?',
                emp:'\\d{4}',
                name:'【量词】n{X} X 个 n 的序列',
            },{
                data:'100, 1000 or 10000?',
                emp:'\\d{3,4}',
                name:'【量词】n{X,Y} X 至 Y 个 n 的序列',
            },{
                data:'100, 1000 or 10000?',
                emp:'\\d{3,}',
                name:'【量词】n{X,} 至少 X 个 n 的序列', 
            },{
                data:'Is this his',
                emp:'is$',
                name:'【量词】$ 结尾为 n 的序列(整个序列的末尾)', 
            },{
                data:'Is this his',
                emp:'^Is',
                name:'【量词】^ 开头为 n 的序列(整个序列的末尾)', 
            },{
                data:'Is this all there is',
                emp:'is(?= all)',
                name:'【量词】?= 后紧跟 "all" 的 "is" '
                // http://www.w3school.com.cn/jsref/jsref_regexp_nfollow.asp
            },{
                data:'Is this all there is',
                emp:'is(?! all)',
                name:'【量词】?! 其后没有紧跟 "all" 的 "is" '
                // http://www.w3school.com.cn/jsref/jsref_regexp_nfollow_not.asp
            },],
            mathList:[{
                data:'10',
                emp:'^\\d+$',
                name:'【数学】正整数',
            },],
            businessList:[{
                data:'😂',
                emp:'\\uD83C[\\uDF00-\\uDFFF]|\\uD83D[\\uDC00-\\uDE4F]',
                name:'【业务】emoji',
            },{
                data:'成吉思汗',
                emp:'^[\\u4e00-\\u9fa5]{2,4}$',
                name:'【业务】姓名',
            },{
                data:'330327199302148793',
                emp:'(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
                name:'【业务】身份证',
            },],
        },
        list:[],
    }),
    created(){
        this.classClick(0);
    },
    methods:{
        classClick(index){
            this.list = this.package[this.classList[index].list];
        },
        itemClick(index){
            this.empVal = this.list[index].emp;
            this.dataVal = this.list[index].data;
            this.nameVal = this.list[index].name;
        },
        nameInput(e){
            this.nameVal = e.value;
        },
        dataInput(e){
            this.dataVal = e.value;
        },
        empInput(e){
            this.empVal = e.value;
        },
        test(){
            //使用 同一个对象结果会不同
            let tmp = new RegExp(this.empVal, "g")
            let tmpE = new RegExp(this.empVal, "g")
            // let tmpE = /[abc]/g;
            // let str = 'aaabbbccc';
            normal.alert('————————————\n' 
                + this.dataVal 
                + '\n=====是否存在=====\n'
                + this.empVal
                + '\n=====test结果=====\n' 
                + tmp.test(this.dataVal) 
                + '\n=====exec结果=====\n' 
                //exec在纯匹配时会给出重复结果？
                + JSON.stringify(tmpE.exec(this.dataVal))
                //支持正则表达式的 String 对象的方法
                // search http://www.w3school.com.cn/jsref/jsref_search.asp
                // match http://www.w3school.com.cn/jsref/jsref_match.asp
                // split http://www.w3school.com.cn/jsref/jsref_split.asp
                // replace http://www.w3school.com.cn/jsref/jsref_replace.asp
                + '\n\n=====search结果===\n' 
                //search的匹配只有最前面一个
                + JSON.stringify(this.dataVal.search(tmpE))
                + '\n=====match结果====\n' 
                + JSON.stringify(this.dataVal.match(tmpE))
                + '\n=====split结果====\n' 
                + JSON.stringify(this.dataVal.split(tmpE))
                + '\n=====replace结果==\n' 
                + JSON.stringify(this.dataVal.replace(tmpE, ''))
                + '\n\n=====emp属性====\n' 
                + 'global:'+tmpE.global+'\n'
                + 'ignoreCase:'+tmpE.ignoreCase+'\n'
                + 'lastIndex:'+tmpE.lastIndex+'\n'
                + 'multiline:'+tmpE.multiline+'\n'
                + 'source:'+tmpE.source
                + '\n————————————');
        },
    }
}
</script>
