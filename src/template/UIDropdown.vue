<template>
    <div class="wrapper" :style="{overflow: 'hidden', height: (isMaskShow?getHeight:0)+'px'}" :tag="tag">

        <div class="options" ref="options" :style="{ height: getHeight+'px', visibility: isMaskShow ?'visible':'hidden'}"><!-- , width: mWidth -->
            <scroller>
                <div v-for="(item,index) in items" :key="index" class="cell" :style="{ height: itemHeight+'px', backgroundColor: itemColor }"
                      @click="onItemClick(index)">
                    <text class="name" :style="{ color: index==selectedIndex?selectedTextColor:textColor, fontSize: textSize+'px' }">{{item.name}}</text>
                    <image class="icon-curr-flag" :src="iconSelect" v-if="index==selectedIndex"></image>
                </div>
            </scroller>
        </div>
    </div>
</template>
<style scoped lang="postcss">
    .wrapper {
        position: relative;
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        flex: 1;
        background-color: rgba(0, 0, 0, .5);
        visibility: hidden;
    }

    .options {
        position: absolute;
        left: 0;
        right: 0;
        background-color: #fff;
        transform-origin: center center;
        z-index: 100;
    }

    .cell {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 54px;
        padding-right: 54px;
    }

    .name {
        flex: 1;
        padding-right: 10px;
        flex-wrap: wrap;
        lines:2;
        text-overflow: ellipsis;
    }

    .icon-curr-flag {
        width: 32px;
        height: 32px;
    }

    .icon-arrow {
        width: 27px;
        height: 23px;
    }


</style>
<script>
var animation = require('./animation.js').animation;
module.exports = {
    data(){
        return {
            mWidth: 750,
            selectedIndex: '-1',
            // headerColor: '#dfdfdf',
            // headerHeight: 90,
            isMaskShow: false,
            itemHeight: 90,
            itemColor: 'white',
            showNum: 5,
        }
    },
    props: {
        items: {default : [
                {id: '0', name: 'All'},
                {id: '1', name: 'Doing'},
                {id: '2', name: 'Done'}
            ]}, 
        tag: {default : ''},                            //必需，为接口中该值的名称
        // showNum: {default : 5},
        textSize: {default : 32},                       //字体大小
        textColor: {default : '#000000'},               //字体颜色
        selectedTextColor: {default : '#0088FB'},       //选择的字体颜色
        iconSelect: {default : ''},//TODO
    },
    created(){
        this.showNum = this.items.length;
    },
    computed: {
        optionTop(){
            return this.items.length>this.showNum?-(this.itemHeight*(this.showNum)):-((this.items.length)*this.itemHeight);
        },
        getHeight(){
            return this.items.length>this.showNum?this.itemHeight*this.showNum:this.items.length*this.itemHeight;
        }
    },
    methods: {
        switchView() {
            this.isMaskShow = !this.isMaskShow;
            // animation.opacity(this.$refs.mask, 0.1, 1, true);
            // animation.translate(this.$refs.options, 0, this.items.length>this.showNum?(this.itemHeight*this.showNum):(this.items.length*this.itemHeight), true);
        },

        onItemClick(index) {
            this.selectedIndex = index;
            this.$emit('dd_itemClick',index);
        },

        toggleMaskVisible() {
            
        },

        setSelected(selected) {
            for (var i = 0; i < this.items.length; i++) {
                if(this.items[i].name==selected){
                    this.selectedIndex = i;
                    break;
                }
            }
        },

        getSelected() {
            return this.items[this.selectedIndex].name;
        },

        getSelectedId() {
            return this.selectedIndex;
        },
    }
}
</script>