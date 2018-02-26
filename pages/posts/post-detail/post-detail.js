const postData = require('../../../data/posts-data.js') 
const app = getApp()

Page({
  data: {
    playingMusic: false
  },
	onLoad (option) {
    let g_playingMusic = app.globalData.g_playingMusic
    let g_postId = app.globalData.g_postId
		let postId = option.id
		this.setData({
			postId,
			postdata: postData.postdata[postId]
		})

		const postsCollected = wx.getStorageSync('postsCollected')

    if (postsCollected[postId]) {
			let collected = postsCollected[postId]
      this.setData({
				collected
			})
		} else {
			const newPostsCollected = postsCollected ? postsCollected : {}
      newPostsCollected[postId] = false
			wx.setStorageSync('postsCollected', newPostsCollected)
		}
    if (g_playingMusic && g_postId === postId) {
      this.setData({
        playingMusic: true
      })
    }

    this.onMusicState()
	},
  onMusicState () {
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        playingMusic: true
      })
      app.globalData.g_playingMusic = true 
      app.globalData.g_postId = this.data.postId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        playingMusic: false
      })
      app.globalData.g_playingMusic = false
      app.globalData.g_postId = null
    })
  },
	onCollectionTap () {
		let collected = !this.data.collected;
		const postsCollected = wx.getStorageSync('postsCollected')
		postsCollected[this.data.postId] = collected
		// wx.setStorageSync('postsCollected', postsCollected)
    // this.showModal(collected, postsCollected)
    this.showToast(collected, postsCollected)
	},
  showModal (collected, postsCollected) {
    let that = this
    wx.showModal({
      title: '收藏',
      content: collected ? '确定收藏吗':'要取消收藏吗',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#666',
      confirmText: '确定',
      confirmColor: '#c2185b',
      success: function (res) { 
        if(res.confirm){
          that.setData({
            collected
          })
          wx.setStorageSync('postsCollected', postsCollected)
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showToast(collected, postsCollected) {
    this.setData({
      collected
    })
    wx.setStorageSync('postsCollected', postsCollected)

    wx.showToast({
      title: collected? '收藏成功': '取消收藏',
      icon: 'success',
      // image: '',
      duration: 1000,
      mask: true
    })
  },
  onShareTap () {
    const arr = [
      '分享到QQ',
      '分享到朋友圈',
      '分享给好友',
      '分享到微博',
      '分享到群组',
      '分享到QQ空间'
    ] 
    wx.showActionSheet({
      itemList: arr,
      itemColor: '#c2185b',
      success: function (res) {
          wx.showModal({
            title: '分享',
            content: '确定' + arr[res.tapIndex],
            showCancel: true,
            cancalText: '取消',
            cancalColor: '#666',
            confirmText: '确定',
            confirmColor: '#c2185b',
            success (res) {
              console.log(this)
              if(res.confirm) {
                wx.showToast({
                  title: '分享成功'
                })
              }
            }  
          })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onPlayMusic () {
    let playing = this.data.playingMusic
    let music = this.data.postdata.music
    if (playing) {
      wx.pauseBackgroundAudio()
      this.setData({
        playingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })
      this.setData({
        playingMusic: true
      })
    }
  }
})