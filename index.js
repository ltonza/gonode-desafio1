const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('FormAge')
})

const checkAgeParam = (req, res, next) => {
  let { idade } = req.query
  if (idade && !isNaN(idade)) {
    console.log(`Parametro idade recebido: ${idade}`)
    next()
  } else {
    console.log('Parametro idade não existe')
    res.redirect('/')
  }
}

app.get('/check', checkAgeParam, (req, res) => {
  let { idade } = req.query
  return res.redirect((idade < 18 ? '/minor' : '/major') + `?idade=${idade}`)
})

app.get('/major', checkAgeParam, (req, res) => {
  let { idade } = req.query
  return res.render('ShowAge', { idade, condicao: 'maior' })
})

app.get('/minor', checkAgeParam, (req, res) => {
  let { idade } = req.query
  return res.render('ShowAge', { idade, condicao: 'menor' })
})

app.listen(3000)
