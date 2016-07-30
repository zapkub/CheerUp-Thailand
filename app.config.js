if (process.env.PRODUCTION) {
  module.exports = {
    name: "Cheer Up",
    fbAppId: ""
  }
}else {
   module.exports = {
    name: "Cheer Up",
    fbAppId: "1051893558178674"
  }
}