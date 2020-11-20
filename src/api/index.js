import request from '../utils/request'

function wordclound() {
  return request({
    url:'/screen/map/wordcloud',
    method:'get'
  })
}
function mapScatter() {
  return request({
    url:'/screen/map/scatter',
    method:'get'
  })
}
function mapData() {
  return request({
    url:'/screen/data',
    method:'get'
  })
}

export {
  wordclound,
  mapScatter,
  mapData
}
