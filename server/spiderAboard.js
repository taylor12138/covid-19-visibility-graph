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
  const $getListByCountryTypeService2true = $('#getListByCountryTypeService2true').html();
  // 加入国外疫情数据
  let aboard = {};
  eval($getListByCountryTypeService2true.replace(/window/g, 'aboard'));
  // 字符串转换json
  fs.writeFile(path.join(__dirname, './aboardData.json'), JSON.stringify(aboard), err => {
    if (err) throw err;
    console.log("写入国外数据成功！！！");
  })
}).catch(err => {
  throw err;
})