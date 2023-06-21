const express = require('express')
const exphbs = require('express-handlebars')
const URL = require('./models/URL')
const shortenURL = require('./utils/shortenURL')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true})) // 直接從 express 取用 body-parser

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect('/')

  const originalURL = req.body.url
  const shortURL = shortenURL(5)

  URL.findOne({ originalURL })
    .then((data) => {
      // 確認有無資料，若有就直接取用現有網址，若無則在資料庫建立新資料
      if (data) {
        res.render('index', { origin: req.headers.origin, shortURL: data.shortURL })
      } else {
        URL.create({ originalURL, shortURL })
        res.render('index', { origin: req.headers.origin, shortURL })
      }
    })
    .catch(err => console.error(err))
})

app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  URL.findOne({ shortURL })
    .then((data) => {
      if (data) {
        res.redirect(data.originalURL)
      } else {
        res.render('error')
      }
    })
    .catch(err => console.error(err))
})

app.listen('3000', () => {
  console.log(`App is running on http://localhost:3000`)
})