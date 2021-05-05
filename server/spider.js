//爬取丁香园数据
//1.使用superagent请求网站
//2.通过jQuery的方法操作DOM
const cheerio = require('cheerio');
const superagent = require('superagent');
const fs = require('fs');
const path = require('path');
superagent.get('https://ncov.dxy.cn/ncovh5/view/pneumonia').then(res => {
  // 浏览器可以解析代码，node端直接返回源码,而res.text是我们需要的响应数据
  const $ = cheerio.load(res.text);
  const $getAreaStat = $('#getAreaStat').html();
  // 加入全国疫情数据
  let data = {};
  eval($getAreaStat.replace(/window/g, 'data'));
  console.log(data);
  // 字符串转换json
  fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(data), err => {
    if (err) throw err;
    console.log("写入中国数据成功！！！");
  })
}).catch(err => {
  throw err;
})