var fs = require('fs')
var url = require('url')
var path = require('path')
var XLSX = require('xlsx')
var axios = require('axios')
var dayjs = require('dayjs')
var multer = require('multer')
var moment = require('moment')
var express = require('express')
var jwt = require('jsonwebtoken')
var formidable = require('formidable')
var { clone } = require('../utils/clone')
var auth = require('../utils/auth')


var router = express.Router()
var db = require("../db/db")
var __projdir = path.resolve(__dirname,'../')


const SECRET_KEY = 'MOOC_SECRET'


function callSQLProc(sql, params, res) {
  return new Promise (resolve => {
    db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
      if (err) {
        res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null})
      }else{
        resolve(ret)
      }
    })
  })
}

var callP = async (sql, params, res) => {
  return  await callSQLProc(sql, params, res)
}


var decodeUser =async (req)=>{
  let token = req.headers.authorization
  let ret 
  if (token !== undefined) {
    token = token.split(' ')[1]
    ret = await jwt.verify(token, 'MOOC_SECRET')
  }else{
    ret = null
  }
  return  ret
}


//登录
// router.post('/login',async (req, res, next) =>{
//   let sql = `CALL PROC_USER_LOGIN(?)`
//   let params = req.body

//   callProc(sql, params, res, (ret) => {
//     if (ret.length > 0) {
//       let token = jwt.sign(clone(ret[0]), SECRET_KEY)
//       res.status(200).json({code: 200, data: ret[0], token: token, msg: '登录成功'})
//     } else {
//       res.status(200).json({code: 301, data: null, msg: '用户名或密码错误'})
//     }
//   })
// })

router.post('/loadUnionInfo', async (req, res) => {
  let sql  = `CALL PROC_UNION_INFO_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, unioninfo: r })
})
router.post('/saveUnionInfo', async (req, res) => {
  let params = { data: req.body }
  let sql  = `CALL PROC_UNION_INFO_SAVE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, unioninfo: r })
})



router.post('/loadProject', async (req, res) => {
  let sql  = `CALL PROC_PROJECT_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, projects: r })
})
router.post('/saveProject', async (req, res) => {
  let params = { data: req.body }
  let sql  = `CALL PROC_PROJECT_SAVE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, projects: r })
})


router.post('/loadAct', async (req, res) => {
  let sql  = `CALL PROC_ACT_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, acts: r })
})
router.post('/delAct', async (req, res) => {
  let params = req.body
  let sql  = `CALL PROC_ACT_DEL(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, acts: r })
})
router.post('/addAct', async (req, res) => {
  let params = req.body, sql
  params.pic = params.actImgList.join('|')

  switch(req.body.type) {
    case '线下': sql  = `CALL PROC_ACT_ADD_OFL(?)`;break;
    case '征集': sql  = `CALL PROC_ACT_ADD_COL(?)`;break;
  }
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, acts: r })
})

router.post('/loadQues', async (req, res) => {
  let sql  = `CALL PROC_QUES_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, quess: r })
})
router.post('/saveQues', async (req, res) => {
  let params = { data: req.body }
  let sql  = `CALL PROC_QUES_SAVE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, quess: r })
})




router.post('/saveMsg', async (req, res) => {
  let params = req.body
  let sql  = `CALL PROC_MSG_SAVE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200 })
})
router.post('/loadMsgs', async (req, res) => {
  let sql  = `CALL PROC_MSGS_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, msgs: r })
})
router.post('/saveMsgs', async (req, res) => {
  let params = { data: req.body }
  let sql  = `CALL PROC_MSGS_SAVE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, msgs: r })
})


router.post('/uploadImg', function (req, res) {
  const form = new formidable.IncomingForm()
  form.parse(req)

  form.on('fileBegin', function (name, file) {
    file.path = `upload/${dayjs().format('YYYYMMDDhhmmss')}.jpeg`
  })

  form.on('file', (name, file) => {
    res.status(200).json({
      code: 200,
      msg: '上传照片成功',
      data: {path: file.path}
    })
  })
})


const AppID = 'wxf0f0bcce54ffbf72'
const Secret = 'f919d04eb44bcc9859a7f2893cbd071b'
const URL_TOKEN  = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppID}&secret=${Secret}`
const URL_OPENID = (code)=>{ return `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${AppID}&secret=${Secret}&code=${code}&grant_type=authorization_code` } 
const URL_USER = (token,openid)=>{
  return `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`
}

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0f0bcce54ffbf72&redirect_uri=http://www.sjhx.online/userlogin?app=ques&response_type=code&scope=snsapi_base&state=1#wechat_redirect

// 用户登录 
// appid + secret -> token
// code           -> openid
// opid + token   -> user
router.get('/userlogin', function(req, res, next) {
  // console.log(req.url)
  let code = req.query.code
  let app  = req.query.app
  axios.all([
    axios.get(URL_TOKEN),
    axios.get(URL_OPENID(code))
  ]).then((r)=> {
    let token  = r[0].data.access_token
    let openid = r[1].data.openid
    axios.get(URL_USER(token,openid)).then((e)=> {
      // console.log(url)
      let nick = e.data.nickname
      let head = e.data.headimgurl
      let url = `http://www.sjhx.online/#${app}?code=${openid}&nick=${nick}&head='${head}'`

      console.log(url)
      res.redirect(url);
    })
  })
})



module.exports = router;