const normalStar = function (data) {
  let starLength = 5
  let Star = 1
  let Half_Star = 2
  let None_Star = 0
  let arr = []
  let score = Math.floor((data / 10) * 2) / 2
  let hasDemical = (score % 1) !== 0
  let integer = Math.floor(score)

  for(let i = 0; i<integer; i++){
    arr.push(Star)
  }
  if(hasDemical){
    arr.push(Half_Star)
  }
  while(arr.length < starLength){
    arr.push(None_Star)
  }
  return arr
}

const getMsg = function (url, callback, listKey) {
  wx.request({
    url,
    header: {
      "Content-Type": "json"
    },
    success(res) {
      let data = res.data
      callback(data, listKey)
    },
    fail(error) {
    }
  })
} 

module.exports = {
  normalStar,
  getMsg
}