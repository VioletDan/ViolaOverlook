const app = getApp();
const os = require('../../common/js/base/os.js');
const imath = require('../../common/js/base/math.js');
const icom = require('../../common/js/base/com.js');
const iuser = require('../../common/js/base/user.js');
const config = require('../../config.js');
const util = require('../../utils/utils.js');
const api = require('../../common/js/API.js');
//-------------------------------------------------------初始化-------------------------------------------------------
let $page, $query, SessionKey, OpenID;
let PageData = {
  tabArr: 1,
  fontFamily: 'Bitstream Vera Serif Bold',
  loaded: false,
  noteData: [],
  isShow: true
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
    // init_handler();
    app.initApp(false, function() {
      console.log('getQueryString', option);
      init_handler();
    });
    this.setData({
      loaded: false
    })
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
  getUserInfo: function(userRes) {
    // console.log('userRes.detail.errMsg:' + userRes.detail.errMsg);
    if (userRes.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '提示',
        content: '该小程序需要获取您的昵称和头像,请您允许该小程序访问您的个人信息。',
        showCancel: false
      })
    } else {
      iuser.parse(userRes.detail);
      this.setData({
        hasUserInfo: true,
        userInfo: iuser.userInfo
      });
      init_handler();
    }
  },
  bgmClick: function() { //背景音乐按钮点击事件
    app.bgm.click();
  },
  // toggleClick: app.toggleClick
  lower: function(e) {
    console.log(e)
    $page.setData({
      isShow: false
    })
  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },
  onReachBottom: function() {
    console.log('onReachBottom', new Date())
  },
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------

//---------------------------------------------------------init
function init_handler() {
  console.log('init_handler');
  // loadFontFace();
  wx.request({
    url: 'https://m.douban.com/rexxar/api/v2/recommend_feed',
    data: {
      alt: 'json',
      next_date: '',
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
      // console.log(res.data.recommend_feeds)
      $page.setData({
        noteData: res.data.recommend_feeds
      })
    }
  })
} //end init

function loadFontFace() {
  wx.loadFontFace({
    family: $page.data.fontFamily,
    source: 'url("https://sungd.github.io/Pacifico.ttf")',
    success(res) {
      console.log(res.status)
      $page.setData({
        loaded: true
      })
    },
    fail: function(res) {
      console.log(res.status)
    },
    complete: function(res) {
      console.log(res.status)
    }
  });
}