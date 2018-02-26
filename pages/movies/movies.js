const util = require('../../util/util.js')  
const app = getApp()

Page({
  data: {
    templateShow: false,
    in_theaters: {},
    coming_soon: {},
    top250: {},
    search: {},
  },
  onLoad() {
    const g_doubanApi = app.globalData.g_doubanApi
    const inTheaters = g_doubanApi + '/v2/movie/in_theaters?start=0&count=3'
    const comingSoon = g_doubanApi + '/v2/movie/coming_soon?start=0&count=3'
    const top250 = g_doubanApi + '/v2/movie/top250?start=0&count=3'
    util.getMsg(inTheaters, this.normalData, 'in_theaters')
    util.getMsg(comingSoon, this.normalData, 'coming_soon')
    util.getMsg(top250, this.normalData, 'top250')
  },  
  normalData (data, listKey) {
    let movies = []
    for (let idx in data.subjects) {
      let subject = data.subjects[idx]
      let temp = {
        id: subject.id,
        title: subject.title,
        image: subject.images.medium,
        average: subject.rating.average,
        star: util.normalStar(subject.rating.stars)
      }
      movies.push(temp)
    } 
    var listType = {}
    listType[listKey] = {
      listTitle: data.title,
      listKey: listKey,
      movies
    }
    this.setData(listType)
  },
  onMoreTap (event) {
    console.log(event.currentTarget)
    var key = event.currentTarget.dataset.listkey
    wx.navigateTo({
      url: 'more-movie/more-movie?key=' + key,
    })
  },
  onInputFocus () {
    this.setData({
      templateShow: true
    })
  },
  onInputConfirm (event) {
    let query = event.detail.value
    let url = app.globalData.g_doubanApi + '/v2/movie/search?q=' + query
    util.getMsg(url, this.normalData, 'search')
  },
  onCancleTap () {
    this.setData({
      templateShow: false
    })
  },
  onMovieTap (event) {
    let movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId,
    })
  }
})