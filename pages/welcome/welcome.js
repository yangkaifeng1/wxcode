Page({
  onTap () {
    // wx.redirectTo({
    //   url: '../posts/posts'
    // })
    // console.log('111')
    wx.switchTab({
      url: '../posts/posts',
    })
  }
})