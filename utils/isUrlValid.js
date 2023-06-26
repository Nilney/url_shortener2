const http = require('http')
const https = require('https')
const dns = require('dns')

function isUrlValid(inputURL) {
  try {
    const url = new URL(inputURL)

    return new Promise((resolve, reject) => {
      // DNS 查詢
      dns.lookup(url.hostname, (err, address) => {
        if(err || !address) {
          console.log('Invalid DNS lookup:', err)
          reject()

        } else {
          // 判斷協定
          const protocol = url.protocol === 'https:' ? https : http

          // 請求檢查 URL 可用性
          protocol.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300 || res.statusCode === 301 || res.statusCode === 302) {
              resolve()
            } else {
              console.log('Invalid status code:', res.statusCode)
              reject()
            }
          }).on('error', (err) => {
            console.log('Request error:', err);
            reject();
          })
        }
      })
    })
  } catch (err) { // URL 若無效
    console.log('URL is not valid')
    return Promise.resolve()
  }
}

module.exports = isUrlValid