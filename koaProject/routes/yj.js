const router = require('koa-router')()
const _ = require('lodash')
const dayjs = require('dayjs')

const {
  getData,
  getDataByDate,
  getBzByDate
} = require('../db/db')

router.prefix('/yj')

router.get('/', async function (ctx, next) {
  let info = {
    "jh": "",
    "cc": "",
    "cc1": "",
    "data": [],
    "bz": []
  }
  let result = _.reverse(await getData())
  info["jh"] = result[result.length - 1].jh
  info["cc"] = result[result.length - 1].cc
  info["cc1"] = result[result.length - 1].cc1
  for (let i = 0; i < 30; i++) {
    info["data"].push([i + 1, result[i].rcyl1])
    info["bz"].push([i + 1, result[i].bz])
  }
  // console.log(info)
  // let postData = ctx.query
  ctx.body = JSON.stringify(info)
})

router.post('/', function (ctx, next) {
  ctx.body = ctx.request.body
})

router.get('/getTl', async function (ctx, next) {
  let bz = []
  let postData = ctx.query
  let result = _.reverse(await getBzByDate(postData['jh']))
  for (let i = 0; i < 365; i++) {
    if (result[i].bz != null) {
      bz.push([dayjs(result[i].rq).format('YYYY-MM-DD'), result[i].bz])
    }
  }
  ctx.body = JSON.stringify(bz)
})

router.get('/getDataByDate', async function (ctx, next) {
  let info = {
    "jh": "",
    "cc": "",
    "cc1": "",
    "data": [],
    "bz": []
  }
  let postData = ctx.query
  let result = await getDataByDate(dayjs(postData['date1']).format('YYYY-MM-DD'), dayjs(postData['date2']).format('YYYY-MM-DD'), postData['jh'])
  info["jh"] = result[result.length - 1].jh
  info["cc"] = result[result.length - 1].cc
  info["cc1"] = result[result.length - 1].cc1
  for (let i = 0; i < result.length; i++) {
    info["data"].push([i + 1, result[i].rcyl1])
    info["bz"].push([i + 1, result[i].bz])
  }
  ctx.body = JSON.stringify(info)
})

module.exports = router