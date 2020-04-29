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


router.post('/loadProject', async (req, res) => {
  let sql  = `CALL PROC_PROJECT_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, projects: r })
})

router.post('/loadAct', async (req, res) => {
  let sql  = `CALL PROC_ACT_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, acts: r })
})

router.post('/loadQues', async (req, res) => {
  let sql  = `CALL PROC_QUES_LOAD()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, quess: r })
})

router.post('/saveMsg', async (req, res) => {
  let params = req.body
  let sql  = `CALL PROC_MSG_SAVE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200 })
})



module.exports = router;