const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const app = express();
app.use(cors());
app.get('/api/covid19', (req, res) => {
  fs.readFile(path.join(__dirname, './data.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
    console.log('发送成功！');
  })
}).listen(5208, () => {
  console.log('5208端口正在监听。。。。');
})