const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');

const HEROES = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
]

const app = express();

app.get('/', function(req,res){
    res.redirect('/heroes')
})

app.use(bodyParser.urlencoded({ extended: true })) // 解析表单提交
app.use(bodyParser.json()) // 解析json

var server = app.listen(8080, function() {
    // 监听3000接口
    console.log('test app listening at http://localhost:8080');
});

// 所有请求
app.use(function(req, res, next) {
    console.log('======request type:', req.method, '; request url:', req.url, '======');
    next();
});

app.use('/heroes', (req, res) => {
    res.send({
        code: 200,
        result: HEROES
    })
})

app.use('/hero', (req, res) => {
    let id = req.url.substring(1)
    let hero = HEROES.find((v) => {
        return v.id == id
    })
    res.send({
        code: 200,
        result: hero
    })
})

app.post('/updateHero', (req, res) => {
    console.log(req.body)
    let id = req.body.id;
    let name = req.body.name
    HEROES.forEach(v => {
        if(v.id == id) v.name = name
    })
    res.send({
        code: 200,
        msg: 'success',
        result: HEROES
    })
})

app.post('/addHero', (req, res) => {
    let name = req.body.name;
    HEROES.push({
        id: HEROES[HEROES.length-1].id+1,
        name: name
    })

    res.send({
        code: 200
    })
})

app.post('/deleteHero', (req, res) => {
    let id = req.body.id;
    HEROES.forEach((v, i) => {
        if(v.id == id) HEROES.splice(i,1)
    })

    res.send({
        code: 200
    })
})

app.use('/searchHero', (req, res) => {
    let kw = req.body.kw;
    let result = []
    HEROES.forEach(v => {
        if(v.name.indexOf(kw) != -1) result.push(v)
    })

    res.send(result)
})

app.use('/searchGet', (req,res) => {
    res.send(HEROES)
})