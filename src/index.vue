<!-- 
    本页可以算作是listT的demo
 -->
<template>
    <listT ref="list" title="index" :hasData="list.length!=0" :hasRefresh="true" :hasLoad="true" :hasEnd="pageNo >= totalPage" 
        :isIndex="true" @listAdapter="getList" @listAppear="appear">
        <cell v-for="(itemData, index) in list" :key="index">
            <list-item class="itemDiv" :hasTouchStyle="false" @onclick="itemClick(index)">
                <text class="item" >{{itemData.text}}</text>
                <div class="btnRowDiv">
                    <div class="btnDiv" v-if="itemData.src" @click="bodyClick(index)" @longpress="longpress(true, index)">
                        <text class="demoTxt">本体</text>
                    </div>
                    <div class="btnDiv" style="margin-left: 20px;" v-if="itemData.demoSrc" @click="demoClick(index)" @longpress="longpress(false, index)">
                        <text class="demoTxt">demo</text>
                    </div>
                </div>
            </list-item>
        </cell>
    </listT>
</template>
<style>
.btnDiv {
  border-color: #999999;
  border-width: 1px;
  border-radius: 16px;
  border-style: solid;
  padding: 12px;
}
.btnRowDiv {
  margin-top: 10px;
  flex-direction: row;
  justify-content: flex-end;
}
.bodyTxt {
  font-size: 28px;
  color: #66ccff;
}
.demoTxt {
  font-size: 28px;
  color: #ff7b35;
}
.itemDiv {
  flex-direction: column;
  padding: 20px;
}
.item {
  align-items: center;
  font-size: 32px;
}
</style>
<script>
import { getThemeObj, setModuleName, setTheme } from './template/config.js';
import { imageLoad } from "./template/imageUtil.js";
import { modal, navigator } from './template/normal.js';
// import { modal, navigator, image, cache } from "tesla-native-js"
export default {
  components: {
    // listT: require('./old/listT.vue'),
    // 'list-item': require('./old/UIListItem.vue'),
    listT: require("./template/listT.vue"),
    "list-item": require("./template/UIListItem.vue")
  },
  data: () => ({
    pageNo: 1,
    totalPage: 1,
    list: [],
    isNew: true,
    nowDir: "template"
  }),
  created() {
    setModuleName('index');
    let obj = getThemeObj();
    // obj.barTitleColor = 'yellow'
    // obj.barBackGroundColor = 'gray'
    // obj.backItemImage = imageLoad('logo.png')
    // obj.noContentImg = imageLoad('logo.png')
    // obj.noContentTxt = '暂无pp'
    // obj.contentBackGroundColor = 'white'
    // obj.barHasBaseline = false
    // obj.barTitleWeight = 'bold'
    // modal.alert(obj)
    setTheme(obj);
    // modal.alert(imageLoad('123'))
  },
  mounted() {
    modal.log('mounted')
  },
  methods: {
    getList(listT) {
      //模拟数据获取
      setTimeout(
        function() {
          if (listT.isRefresh) {
            //刷新
            this.pageNo = 1;
            this.totalPage = 3;
            this.list = [
              {
                text: "empty(只用于复制粘贴)",
                src: "empty"
              },
              {
                text: "base【推荐使用】",
                src: "base",
                demoSrc: "baseEmpty"
              },
              {
                text: "list【推荐使用】",
                src: "listT",
                demoSrc: "listEmpty"
              },
              {
                text: "scroller【推荐使用】",
                src: "scrollerT",
                demoSrc: "scrollerEmpty"
              },
              {
                text: "tabList【推荐使用】",
                src: "tabListT",
                demoSrc: "tabListEmpty"
              },
              {
                text: "form【推荐使用】",
                src: "formT",
                demoSrc: "formEmpty"
              },
              {
                text: "sheet【推荐使用】",
                src: "sheetT",
                demoSrc: "sheetEmpty"
              },
              {
                text: "column【推荐使用】",
                src: "columnT",
                demoSrc: "columnEmpty"
              },
              {
                text: "search【推荐使用】",
                src: "searchT",
                demoSrc: "searchEmpty"
              },
              {
                text: "控件列表",
                src: "",
                demoSrc: "UIEmpty"
              },
              {
                text: "富文本",
                src:'',
                demoSrc:'richEmpty'
              },
              {
                text: "web",
                src:'',
                demoSrc:'webEmpty',
                option : {
                  urlSrc: 'https://www.baidu.com'
                }
              },
              {
                text: "showPic",
                src:'',
                demoSrc:'showPicEmpty',
                option : {
                  imgUrl: 'http://img0.bdstatic.com/static/searchresult/img/logo-2X_b99594a.png'
                }
              },
              {
                text: "发送验证码倒计时【组件】", //新的已有
                src: ""
              },
              {
                text: "搜索框【组件】", //新的已有
                src: ""
              }
            ];
          } else {
            //加载更多
            this.pageNo++;
            let tmp = [{
              text: "empty"
            },{
              text: "empty"
            },{
              text: "empty"
            }]
            this.list = this.list.concat(tmp);
          }
          //结束
          listT.end();
        }.bind(this),
        500
      );
    },
    appear() {
      this.$refs.list.refresh();
    },
    itemClick(index) {
      modal.log('item', '0')
      // modal.toast(this.list[index]);
      // navigator.push({src:this.list[index].src})
    },
    longpress(isBody, index) {
      let oldSrc = this.nowDir + "/" + this.list[index].src;
      let newSrc = "./template/" + this.list[index].src;
      let oldDemoSrc = this.nowDir + "/" + this.list[index].demoSrc;
      let newDemoSrc = "./view/" + this.list[index].demoSrc;
      if (!this.isNew) {
        // modal.toast(isBody
        //     ? (this.isNew ? newSrc : oldSrc)
        //     : (this.isNew ? newDemoSrc : oldDemoSrc));
      } else {
        modal.toast(
          isBody
            ? this.isNew
              ? newSrc
              : oldSrc
            : this.isNew
              ? newDemoSrc
              : oldDemoSrc
        );
      }
    },
    bodyClick(index) {
      modal.log('body')
      let oldSrc = this.nowDir + "/" + this.list[index].src;
      let newSrc = "./template/" + this.list[index].src;
      if (!this.isNew) {
        // navigator.push({src: this.isNew ? newSrc : oldSrc});
      } else {
        navigator.push(this, { src: this.isNew ? newSrc : oldSrc });
        // navigator.push({
        //     url: this.isNew ? newSrc : oldSrc,
        //     option: {},
        // }, function () {
        // });
      }
    },
    demoClick(index) {
      modal.log('demo')
      let oldDemoSrc = this.nowDir + "/" + this.list[index].demoSrc;
      let newDemoSrc = "./view/" + this.list[index].demoSrc;
      if (!this.isNew) {
        // navigator.push({src: this.isNew ? newDemoSrc : oldDemoSrc});
      } else {
        navigator.push(this, { src: this.isNew ? newDemoSrc : oldDemoSrc }, this.list[index].option);
        // navigator.push({
        //     url: this.isNew ? newDemoSrc : oldDemoSrc,
        //     option: {},
        // }, function () {
        // });
      }
    }
  }
};
</script>
