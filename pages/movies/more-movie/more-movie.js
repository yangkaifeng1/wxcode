const util = require('../../../util/util.js')
const app = getApp()

Page({
  data: {
    start: 0,
    count: 21,
    url: '',
    movies: []
  },
  onLoad: function (options) {
    const g_doubanApi = app.globalData.g_doubanApi
    const listType = options.key
    let url = g_doubanApi + '/v2/movie/' + listType
    this.setData({
      url
    })
    let start = this.data.start
    let count = this.data.count
    this.getMoreMovies(start)
  },
  getMoreMovies(start) {
    let url = this.data.url + '?start='+start+'&count=' + this.data.count 
    util.getMsg(url, this.normalData, '')
  },
  onScrollGetMovies () {
    let start = this.data.start += 21
    this.getMoreMovies(start) 
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh () {
    this.setData({
      movies: []
    })
    let start = 20
    this.getMoreMovies(start)
    wx.showNavigationBarLoading()
  },
  onMovieTap(event) {
    let movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
  normalData(data) {
    let movies = this.data.movies
    for (let index in data.subjects) {
      let subject = data.subjects[index]
      let temp = {
        id: subject.id,
        title: subject.title,
        image: subject.images.medium,
        average: subject.rating.average,
        star: util.normalStar(subject.rating.stars)
      }
      movies.push(temp)
    }
    this.setData({
      movies
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
    wx.setNavigationBarTitle({
      title: data.title
    })
  }
})