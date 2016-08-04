var shareInfo = {
  link:'http://thesecretfarm.com/cheerup/',
  name: 'เชียร์ไทยสุดใจ ไกลถึงริโอ',
  description: 'ร่วมเป็น 1 ในล้านแรงใจ เป็นแรงเชียร์ให้นักกีฬาไทย คว้าชัยโอลิมปิก',
  title: 'เชียร์ไทยสุดใจ ไกลถึงริโอ',
  caption: 'www.cheerthai.co',
}
// Text1 : เชียร์ไทยสุดใจ ไกลถึงริโอ
// Text2 : ร่วมเป็น 1 ในล้านแรงใจ เป็นแรงเชียร์ให้นักกีฬาไทย คว้าชัยโอลิมปิก
// Text3 : www.cheerthai.co
// ลิ้งค์ด้านบน (ชื่อเกม) : cheerthaisudjai
if (process.env.PRODUCTION) {
  module.exports = {
    name: "เชียร์ไทยสุดใจ ไกลถึงริโอ",
    fbAppId: "839141089552242",
    redirectURL: 'http://www.cheerthai.co/facebook/cheerthaibanner/',
    shareInfo
  }
}else {
   module.exports = {
    name: "เชียร์ไทยสุดใจ ไกลถึงริโอ",
    fbAppId: "1051893558178674",
    redirectURL: 'http://localhost:8080/',
    shareInfo
  }
}