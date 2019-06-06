<template>			
	<div class="flex">
		<div class="sheet">
			<text :style="{color: cancelColor, 'font-size': textSize+'px'}" @click="cancel">{{cancelText}}</text>
			<text :style="{color: titleColor, 'font-size': titleSize+'px'}">{{title}}</text>
			<text :style="{color: confirmColor, 'font-size': textSize+'px'}" @click="confirm">{{confirmText}}</text>
		</div>
		<div class="ts-selector-box">
			<div class="ts-selector-selected"></div>
			<list class="ts-selector" :style="{width:(750/colcount)+'px'}" @scroll='e=>onscroll(e,items)' @touchend='touchend(i)' v-for="(items,i) in dataObj" :key="i">
				<cell style="height:132px"></cell>
				<cell class="ts-selector-item" v-for="(item , index) in items" :ref="`${i}${index}`" :key="`${i}${index}`" @click="clickItem(item)">
					<text class="ts-selector-item-text">{{item.key}}</text>
				</cell>
				<cell style="height:132px;"></cell>
			</list>
		</div>
	</div>
</template>
<script>
const dom = weex.requireModule("dom");
export default {
	//   name: "TsSelector",
	components: {
	},
	props: {
		//标题栏部分
		title:          {default:'标题'},     //标题
		titleColor:     {default:'#111111'},  //标题颜色
		titleSize:      {default:34},         //标题字体大小
		cancelText:     {default:'取消'},     //左侧按钮文字
		cancelColor:    {default:'#666666'},  //左侧按钮颜色
		confirmText:    {default:'确定'},     //右侧按钮文字
		confirmColor:   {default:'#4185F3'},  //右侧按钮颜色
		textSize:       {default:32},  //按钮字体大小
		//自有
		data: [Object, Array],
		value: [Object],
		width: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			postion: 0,
			itemheight: 0,
			selectitem: {data: 0},
			count: 0,
			mode: "single", //muti
			vals: null,
			dataObj: {},
			colcount: 0,
			isClick: false,
		};
	},
	computed: {
		osname() {
			return WXEnvironment.osName;
		},
	},
	methods: {
		onscroll(e, items) {
			this.postion = e.contentOffset.y;
			this.itemheight = e.contentSize.height / (items.length + 4);
		},
		startlisten(target) {
			setTimeout(() => {
				if(this.isClick) {
					this.isClick = false;
					return;
				}
				let postion = this.postion;
				let linsten = setInterval(() => {
					if (this.postion != postion) {
						postion = this.postion;
					} else {
						let newtoitem = Math.abs(this.postion / this.itemheight);
						if (newtoitem < this.selectitem[target])
							this.selectitem[target] = Math.floor(newtoitem);
						else {
							this.selectitem[target] = Math.ceil(newtoitem) || 0;
						}
						dom.scrollToElement(
							this.$refs[`${target}${this.selectitem[target]}`][0],
							{
								offset: -132,
								animated: !(this.osname == "android")
							}
						);
						clearInterval(linsten);
					}
				}, 50);
			}, 50);
		},
		touchend(target) {
			this.count++;
			if (this.osname == "android" && this.count % 2 == 1) return;
			else this.count = 0;
			this.startlisten(target);
		},
		getval() {
			let val = Object.assign({}, this.value);
							console.log(JSON.stringify(this.selectitem))
			for (let k in this.selectitem) {
				let thisval = this.dataObj[k][this.selectitem[k]].key;
				let item = this.dataObj[k][this.selectitem[k]];
				val[k] = thisval;
				val['item'] = item;
				val['index'] = this.selectitem.data;
			}
			return val;
		},
		clickItem(item) {
			this.isClick = true;
			for (let i in this.dataObj) {
				let valselect = item.key;
				if (valselect) {
					this.dataObj[i].forEach((val, index) => {
						if (val.key == valselect) {
							this.selectitem[i] = index;
							setTimeout(() => {
								dom.scrollToElement(this.$refs[`${i}${this.selectitem[i]}`][0], {
									offset: -132,
									animated: !(this.osname == "android")
								});
							}, 50);
						}
					});
				}
			}
		},
		touchBg() {
			this.$emit('touchBg',{});
		},
		cancel() {
			this.$emit('cancel',{});
		},
		confirm() {
			this.$emit("input", this.getval());
			this.$emit('confirm',{});
		},
	},
	mounted() {
		let colcount = 0;
		let dataobj = {};
		if (this.data instanceof Array) {
			dataobj["data"] = this.data;
		} else {
			Object.assign(dataobj, this.data);
		}
		console.log('dataobj:',JSON.stringify(dataobj))
		for (let i in dataobj) {
			colcount++;
			let valselect = this.value[i];
			if (valselect) {
				dataobj[i].forEach((val, index) => {
					if (val.key == valselect) {
						this.selectitem[i] = index;
						setTimeout(() => {
							dom.scrollToElement(this.$refs[`${i}${this.selectitem[i]}`][0], {
								offset: -132,
								animated: !(this.osname == "android")
							});
						}, 50);
					}
				});
			}
		}
		this.colcount = colcount;
		this.dataObj = dataobj;
	}
};
</script>
<style scoped>
.sheet {
    justify-content: space-between;
    padding: 24px 28px;
    flex-direction: row;
}
.ts-selector-box{
    background-color: #ffffff;
    flex-direction: row;
}
.ts-selector-selected{
    position: absolute;
    top: 132px;
    left: 0px;
    right: 0px;
    height: 66px;
    border-bottom-width: 1px;
    border-bottom-color:  #CCCCCC;
    border-bottom-style: solid;
    border-top-width: 1px;
    border-top-color:  #CCCCCC;
    border-top-style: solid;
}
.ts-selector{
    height: 332px;
}
.ts-selector-item{
    height: 66px;
    justify-content: center;
    align-items: center;
}
.ts-selector-item-text{
    font-size:36px;
    color: #333333;
}
</style>
