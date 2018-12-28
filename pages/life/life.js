const app = getApp();
const os = require('../../common/js/base/os.js');
const imath = require('../../common/js/base/math.js');
const icom = require('../../common/js/base/com.js');
const iuser = require('../../common/js/base/user.js');
const config = require('../../config.js');
const util = require('../../utils/utils.js');
//-------------------------------------------------------初始化-------------------------------------------------------
let $page, $query, SessionKey, OpenID;
let PageData = { 
  tabArr: 0,
  navList: [
    {
      img: '/images/life/icon-1.png',
      text: '美食',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-2.png',
      text: '电影',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-3.png',
      text: '掌上商城',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-4.png',
      text: '积分',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-5.png',
      text: '推荐有礼',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-6.png',
      text: '分期信贷',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-7.png',
      text: '生活缴费',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-8.png',
      text: '机酒火车',
      link: '/pages/index/index'
    },{
      img: '/images/life/icon-9.png',
      text: '话费流量',
      link: '/pages/index/index'
    },
    {
      img: '/images/life/icon-10.png',
      text: '全部',
      link: '/pages/index/index'
    },

  ]
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
    bgmPlay: false,
    imgUrls: [
      '../../images/life/spic1.png',
      '../../images/life/spic2.png',
      '../../images/life/spic1.png',
      '../../images/life/spic2.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    displayMmultipleItems:3,
    nextMargin:'20px',
  }, PageData), //页面的初始数据
  onLoad: function (option) {
    $page = this;
    $query = option;
    console.log('getQueryString', option);
    app.initApp(false, init_handler);
  },
  onReady: function () { }, //监听页面初次渲染完成
  onShow: function () {
    // if (app.bgm){
    //     app.bgm.reShow();
    // }//edn if
  }, //监听页面显示
  onHide: function () { }, //监听页面隐藏
  onUnload: function () { }, //监听页面卸载
  onPullDownRefresh: function () { }, //页面相关事件处理函数--监听用户下拉动作
  onReachBottom: function () { }, //页面上拉触底事件的处理函数
  onShareAppMessage: function () { //用户点击右上角分享
    return app.setShareData();
  },
  bgmClick: function () {//背景音乐按钮点击事件
    app.bgm.click();
  },
  toggleClick: app.toggleClick
}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------

//---------------------------------------------------------init
function init_handler() {
  console.log('init_handler');
} //end init