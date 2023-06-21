const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890' // 共62字元

function shortenURL(url_length) {
  let result = ''
  for (let i = 0; i < url_length; i++) {
    let radomIndex = Math.floor(Math.random() * characters.length) // 最多僅到61，勿+1
    result += characters[radomIndex]
  }
  return result
}

module.exports = shortenURL