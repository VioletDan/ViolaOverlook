// pages/note/note.js
var WxParse = require('../../wxParse/wxParse.js');
let $page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    $page = this;
    init_handler(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

//---------------------------------------------------------init
// var reg = /<style[\s\S]*?</style>/g;
function init_handler(id) {
  console.log('init_handler');
  var article = '', htmlData ='<img data-src="https://img3.doubanio.com/view/note/l/public/p56246201.webp">';
  wx.request({
    url: 'https://m.douban.com/rexxar/api/v2/note/' + id + '',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log(res.data)
      $page.setData({
        noteInfo: res.data
      });
      var result = res.data.content.match(/<style(([\s\S])*?)<\/style>/g)
      console.log(result)
      // console.log(res.data.content);
      // console.log(res.data.content.slice(0, res.data.content.indexOf('</style>')+8))
      // console.log(res.data.content.slice(res.data.content.indexOf('</style>') + 8, res.data.content.length))
      htmlData = res.data.content.slice(res.data.content.indexOf('</style>') + 8, res.data.content.length);
      WxParse.wxParse('article', 'html', htmlData, $page,5)
    }
  })
} //end init