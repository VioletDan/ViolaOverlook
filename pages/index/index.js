const app = getApp();
const os = require('../../common/js/base/os.js');
const imath = require('../../common/js/base/math.js');
const icom = require('../../common/js/base/com.js');
const iuser = require('../../common/js/base/user.js');
const config = require('../../config.js');
const util = require('../../utils/utils.js');
const api = require('../../common/js/API.js');
//-------------------------------------------------------初始化-------------------------------------------------------
let $page, $query, SessionKey, OpenID, noteDataArr = [],i=0;
let PageData = {
  tabArr: 1,
  fontFamily: 'Bitstream Vera Serif Bold',
  loaded: false,
  isShow: true,
};
Page({
  data: Object.assign({
    userInfo: {},
    hasUserInfo: false,
    loadBox: false,
    articleHeight: app.data.articleHeight,
    navigationHeight: app.data.navigationHeight,
    navigationPadding: app.data.navigationPadding,
    iphoneXBar: os.iphoneX,
    bgmBtn: false,
    bgmPlay: false
  }, PageData), //页面的初始数据
  onLoad: function(option) {
    $page = this;
    $query = option;
    app.initApp(false, init_handler);
  },
  onReady: function() {}, //监听页面初次渲染完成
  onShow: function() {
    // if (app.bgm){
    //     app.bgm.reShow();
    // }//edn if
  }, //监听页面显示
  onHide: function() {}, //监听页面隐藏
  onUnload: function() {}, //监听页面卸载
  onPullDownRefresh: function() {}, //页面相关事件处理函数--监听用户下拉动作
  onReachBottom: function() {}, //页面上拉触底事件的处理函数
  onShareAppMessage: function() { //用户点击右上角分享
    return app.setShareData();
  },
  bgmClick: function() { //背景音乐按钮点击事件
    app.bgm.click();
  },
  // toggleClick: app.toggleClick
  lower: function(e) {
    console.log('到底了');
    requestData($page.data.noteData[i].date);
    i++;
  }
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------

//---------------------------------------------------------init
function init_handler() {
  console.log('init_handler');
  requestData();
} //end init

function requestData(next_date){
  wx.request({
    url: 'https://m.douban.com/rexxar/api/v2/recommend_feed',
    data: {
      alt: 'json',
      next_date: next_date || '',
      loc_id: '108288',
      gender: '',
      birthday: '',
      udid: '9fcefbf2acf1dfc991054ac40ca5114be7cd092f',
      for_mobile: '1'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      // console.log(res.data)
      noteDataArr.push(res.data);
      $page.setData({
        noteData: noteDataArr
      })
    }
  })
}