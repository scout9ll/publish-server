const axios = require('axios')

const baseURL = 'http://bff.xiaoantech.com'

const bffAxios = axios.create({
  baseURL,
//   headers: {
//     'Cache-Control': 'no-cache' // 取消强缓存
//   }
})
bffAxios.interceptors.response.use(res => {
  return res.data
})

module.exports = bffAxios
