var util = require('../../../util/util.js')
var app = getApp()

Page({
  data: {
  },
  onLoad (options) {
    let movieId = options.id;
    let url = app.globalData.g_doubanApi + '/v2/movie/subject/' + movieId
    util.getMsg(url, this.normalData, '')
  },
  normalData (data) {
    console.log(data)
    if (!data) {
      return
    }
    let director = {
      avatar: '',
      name: '',
      id: ''
    }
    if (data.directors[0] !== null) {
      if (data.directors[0].avatars !==null) {
        director.avatar = data.directors[0].avatars.medium
      }
      director.id = data.directors[0].id
      director.name = data.directors[0].name
    }
    let movie = {
      movieImg: data.images ? data.images.medium : '',
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentsCount: data.comments_count,
      summary: data.summary,
      year: data.year,
      generes: data.genres.join('、'),
      star: util.normalStar(data.rating.stars),
      average: data.rating.average,
      director,
      casts: this.convertToCastString(data.casts),
      castsInfo: this.convertToCastInfos(data.casts)
    }
    this.setData({
      movie
    })
  },
  convertToCastString (casts) {
    let castsjoin = '';
    for (let index in casts) {
      castsjoin = castsjoin + casts[index].name + '  /'
    } 
    console.log(castsjoin)
    return castsjoin.substring(0, castsjoin.length - 2);
  },
  convertToCastInfos (casts) {
    let castsArray = []
    for (let index in casts) {
      var cast = {
        img: casts[index].avatars ?  casts[index].avatars.medium : '',
        name: casts[index].name
      }
      castsArray.push(cast)
    }
    console.log(castsArray)
    return castsArray
  },
  onViewMovieTap (event) {
    let src = event.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})