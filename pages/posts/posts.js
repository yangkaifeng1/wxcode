var postdata = require('../../data/posts-data.js')

Page({
  data: {
  },
  onLoad () {
  	this.setData({
  		postdata: postdata.postdata
  	})
  },
  onItemTap (event) {
    let postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId 
    })
  },
  onSwiperTap (event) {
    let postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})