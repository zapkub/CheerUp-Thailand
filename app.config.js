var shareInfo = {
  link:'http://thesecretfarm.com/cheerup/',
  name: 'CheerUp Thailand',
  description: 'ยังไม่มี',
  title: 'ใครทำอะไร',
  caption: 'เชียร์จ้า',
}

if (process.env.PRODUCTION) {
  module.exports = {
    name: "Cheer Up",
    fbAppId: "667832946653119",
    redirectURL: 'http://thesecretfarm.com/cheerup/',
    shareInfo
  }
}else {
   module.exports = {
    name: "Cheer Up",
    fbAppId: "1051893558178674",
    redirectURL: 'http://localhost:8080/',
    shareInfo
  }
}