const getDataFn = {
  
  // 获取视频
  getVideos:function(params){
    wx: wx.request({
      url: 'http://127.0.0.1:3000/video/search/all',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
       if(params && params.success){
         params.success(res.data)
       }
      },
      fail: function (res) {
        console.log('数据获取失败')
      }
    })
  }
}

export { getDataFn}