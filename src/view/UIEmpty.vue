<template>
    <div>
        <scrollerT title="title">
            <div class="itemDiv">
                <search placeholder="请输入关键字" searchDisplayTxt="搜索" searchOutBackground="#f6f6f6" searchInnerBackground="white" 
                @searchShow="searchShow" @searchInput="searchInput" @input="input" @hideSearch="hideSearch" @returnClick="returnClick"></search>
            </div>
            <text>展示labelFlow</text>
            <div class="itemDiv">
                <label-flow :labels="list" @labelClick="labelClick"></label-flow>
            </div>
            <text>展示sheet</text>
            <div class="itemDiv">
                <label-flow :labels="sheetList" @labelClick="sheet"></label-flow>
            </div>
            <text>展示tabPage</text>
            <div class="itemDiv">
                <tabpage :items="items" itemViewColor="#FAFAFA" itemViewHeight="96" itemTextFont="34"
                itemNormolColor="#111111" itemSelectColor="#1c97fc" lineHeight="6" :isWideMode="true" @touchPage="touchPage"></tabpage>
            </div>
            <div class="itemDiv">
                <centerTabpage :items="centerItems" itemViewColor="#FAFAFA" itemViewHeight="96" itemTextFont="34"
                itemNormolColor="#111111" itemSelectColor="#1c97fc" lineHeight="6" :isWideMode="true" @touchPage="touchPage"></centerTabpage>
            </div>
            <text>展示弹框</text>
            <div style="padding:20px;background-color:red;" @click="showDialog = true">
                <text>showDialog</text>
            </div>
            <div style="padding:20px;" @click="showAlert = true">
                <text>showAlert</text>
            </div>
            <div style="padding:20px;background-color:red;" @click="sheetShow">
                <text>选择器{{selectval}}</text>
            </div>


        </scrollerT>
        <dialog :show="showDialog" :single="false" :outClickHide="true" cancelColor="#66ffcc" confirmColor="#66ccff" title="您本次电话咨询的接听号码为：18746574637" 
            @dialogCancel="dialogCancel" @dialogConfirm="dialogConfirm" @touchBG="showDialog = false"></dialog>

        <alert :width="608" :height="528" :isShow="showAlert" :outClickHide="false" @touchBG="showAlert = false">
            <alertVerify @closeClick="showAlert = false"></alertVerify>
        </alert>
        <!-- 确保sheet标签在最底部 -->
        <sheet :isShow="showSelect" width="400" height="400" BackgroundColor="white"
            :model="sheetModel" @touchBg="sheetTouchBg"></sheet>


        <sheet :isShow="showSheet" 
                model="bottom" @touchBg="cancel">
            <tslselect :isShow="showSheet"
                model="bottom"
                @touchBg="cancel"
                v-model="selectval" :data='selectList'
                @cancel="cancel" @confirm="confirm"></tslselect>
        </sheet>
    </div>
</template>

<style scoped>
.row {
    flex-direction: row;
    justify-content: space-around;
}
.btn {
    width: 150px;
    height: 60px;
    border-radius: 10px;
    border-width: 1px;
    border-color: #DDDDDD;
    align-items: center;
    justify-content: center;
}
.itemDiv {
    margin: 20px 0px;
}
</style>

<script>
import {modal} from "../template/normal.js";
export default{
    components: {
        scrollerT: require('../template/scrollerT.vue'),
        search: require('../template/UISearch.vue'),
        'label-flow': require('../template/UILabelFlow.vue'),
        sheet: require('../template/UISheet.vue'),
        tabpage: require('../template/UITabPage.vue'),
        centerTabpage: require('../template/UICenterTabPage.vue'),
        dialog: require('../template/UIDialog.vue'),
        alert:require('../template/UIAlert.vue'),
        tabbar:require('../template/UITabbar.vue'),
        tslselect:require('../template/UISelect.vue'),
        alertVerify:require('./alertVerify.vue'),
    },
    data:()=>({
        showSheet: false,
        showSelect: false,
        showDialog: false,
        showAlert: false,
        sheetModel: '',
        list:[
            { name: '标签1',    check: false },
            { name: '标签2',    check: false },
            { name: '标签3',    check: false },
            { name: '标签4',    check: false },
            { name: '标签5',    check: false },
            { name: '标签6',    check: false },
            { name: '标签7',    check: false },
            { name: '标签8',    check: false },
        ],
        sheetList:[{ name: 'top' },{ name: 'bottom' },{ name: 'left' },{ name: 'right' }],
        items:[{
            name:'标题1', isSelect: true,
        },{
            name:'标题2', isSelect: false,
        },{
            name:'标题3', isSelect: false,
        },{
            name:'标题4', isSelect: false,
        },{
            name:'标题5', isSelect: false,
        },{
            name:'标题6', isSelect: false, hasRP: true,
        }],
        centerItems:[{
            name:'标题1', isSelect: true,
        },{
            name:'标题2', isSelect: false, hasRP: true,
        }],
        selectval: {},
        selectList: [{ key:'2019年', value: '2019'},
                { key:'2018年', value: '2018' },
                { key:'2017年', value: '2017' },],
    }),
    created(){
        
    },
    methods:{
        searchShow(e) {
            // 打开搜索框触发
        },
        input(e) {
            // 点击输入框内叉叉图标触发，返回  value:''
        },
        searchInput(e){
            // 输入框的input事件
        },
        hideSearch(e) {
            // 点击取消的事件
        },
        returnClick(e) {
            modal.toast(e);
        },
        labelClick(index){
            this.list[index].check = !this.list[index].check;
        },
        sheet(index) {
            this.sheetModel = this.sheetList[index].name;
            this.showSelect = true;
        },
        sheetTouchBg() {
            this.showSelect = false;
        },
        touchPage(e) {
            // for (let index = 0; index < this.centerItems.length; index++) {
            //     const element = this.centerItems[index];
            //     element.hasRP = false;
            // }
            // for (let index = 0; index < this.items.length; index++) {
            //     const element = this.items[index];
            //     element.hasRP = false;
            // }
            e.ui();
        },
        dialogConfirm(){
            this.showDialog = false;
        },
        dialogCancel(){
            this.showDialog = false;
        },
        sheetShow() {
            this.showSheet = true;
        },
        cancel() {
            this.showSheet = false;
        },
        confirm() {
            this.showSheet = false;
        },
    }
}
</script>