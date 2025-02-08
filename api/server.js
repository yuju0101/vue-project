const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors()) // 允許跨域請求
app.use(express.json()) // 解析 JSON 請求


// 假資料
let estimates = [
    { 
        id: 1, 
        backlogNum: "97453", 
        project: "Chatbot客服機器人", 
        name: "前台客服傳連結訊息可直接點擊", 
        estimateTime: 2, 
        reactiveTime: 2, 
        status: "已完成", 
        link:"https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_boards/board/t/Data%20Middle/Backlog%20items?System.AssignedTo=laurenweng%40cw.com.tw&workitem=97453"
    },
    { 
        id: 2, 
        backlogNum: "97464", 
        project: "Chatbot客服機器人", 
        name: "滿意度調查後台管理頁面抽屜呈現", 
        estimateTime: 8, 
        reactiveTime: 16, 
        status: "暫停中",
        link:"https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_boards/board/t/Data%20Middle/Backlog%20items?System.AssignedTo=laurenweng%40cw.com.tw&workitem=97464" 
    },
    { 
        id: 3, 
        backlogNum: "97453", 
        project: "TIT數位專輯", 
        name: "列表與detail頁串接/資料處理", 
        estimateTime: 21, 
        reactiveTime: 16, 
        status: "進行中",
        link:"https://dev.azure.com/cwgroup/digital-products/_boards/board/t/digital-products%20Team/Backlog%20items?System.AssignedTo=kelvinchen%40cw.com.tw%2Claurenweng%40cw.com.tw&workitem=97924" 
    },
    { 
        id: 4, 
        backlogNum: "97707", 
        project: "cs-admin合併至it-admin", 
        name: "會員列表/會員資料/自動續訂/訂戶權益", 
        estimateTime: 30, 
        reactiveTime: 36, 
        status: "未完成",
        link:"https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_workitems/edit/97707" 
    }
]

let relax = [
  {
    id: '1',
    imageUrl:
      'https://i.ytimg.com/vi/ZoU6EmLEvAY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD4aEmiLWxSpTiL3IHT_PId25Fu5A',
    name: '나라는 가수 MOVING VOICES',
    song: '인독일 2화 속 수지(Suzy)의 플레이리스트 모음.ZIP | #나라는가수',
    listened: true,
    link: 'https://www.youtube.com/watch?v=ZoU6EmLEvAY',
  },
  {
    id: '2',
    imageUrl:
      'https://i.ytimg.com/vi/klh7I70h3vg/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAsU8YC1ohEtf4kuUWmtbgvoNpJdQ',
    name: '율다우피아노 Yuldau Piano',
    song: '이 노래 너무 좋은걸? 나만 들을수 없지 ⎜ 잔잔한 피아노 연주곡 플리',
    listened: true,
    link: 'https://www.youtube.com/watch?v=klh7I70h3vg',
  },
  {
    id: '3',
    imageUrl:
      'https://i.ytimg.com/vi/O_Qu34TL9XI/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGEcgYChlMA8=&rs=AOn4CLAtiSJC-pHD0ruDX38RT_X3M9SnKg',
    name: 'DalKyoungMin‘s Playlist',
    song: '최유리 Choi Yu Ree | 숲,바다,잘 지내자, 우리,동그라미,사랑에게,바람',
    listened: true,
    link: 'https://www.youtube.com/watch?v=O_Qu34TL9XI'
  },
  {
    id: '4',
    imageUrl:
      'https://i.ytimg.com/vi/Rsxou6AOeio/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLACqZGjPhEhgH2gLd5EIkgQH5pNQw',
    name: '안테나 Antenna',
    song: '[Playlist] 사랑하는 수많은 방식들 : 권진아 플레이리스트 | 1시간 듣기',
    listened: false,
    link: 'https://www.youtube.com/watch?v=Rsxou6AOeio'
  },
  {
    id: '5',
    imageUrl:
      'https://i.ytimg.com/vi/kvNeCby8Rgo/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgWihMMA8=&rs=AOn4CLBQXNcCrnJByMd5zxovjhFBHJXVVg',
    name: 'Code Daily Playlist #코데플',
    song: '선우정아 - 집에 갈까 1시간 연속 재생 / 가사 / Lyrics',
    listened: true,
    link:'https://www.youtube.com/watch?v=4rUmKgJp1TE',
  },
  {
    id: '6',
    imageUrl:
      'https://i.ytimg.com/vi/Llour2YvsiI/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAvBeXi8PMXX3X1n8Bz5HiQBE8ndA',
    name: 'WRG 우리가 듣고 싶어서 연주한 playlist',
    song: '[Playlist] Cozy Jazz | Relaxing Background Music',
    listened: true,
    link:'https://www.youtube.com/watch?v=Llour2YvsiI',
  },
]

// ** get 取得所有估時紀錄**
app.get('/estimates', (req, res) => {
  res.json({ status: "success", data: estimates })
})

app.get('/relax', (req, res) => {
  res.json({ status: "success", data: relax })
})

// ** get 取得特定 ID 的估時紀錄**
app.get('/estimates/:id', (req, res) => {
  const estimate = estimates.find(e => e.id === parseInt(req.params.id))
  if (!estimate) return res.status(404).json({ status: "error", message: "找不到資料" })
  res.json({ status: "success", data: estimate })
})

app.get('/relax/:id', (req, res) => {
  const item = relax.find(e => e.id === req.params.id)
  if (!item) return res.status(404).json({ status: "error", message: "找不到資料" })
  res.json({ status: "success", data: item })
})

// ** post 新增一筆紀錄**
app.post('/estimates', (req, res) => {
  const newEstimate = { id: estimates.length + 1, ...req.body }
  estimates.push(newEstimate)
  res.status(201).json({ status: "success", data: newEstimate })
})

app.post('/relax', (req, res) => {
  const newRelax = { id: String(Date.now()), ...req.body }
  relax.push(newRelax)
  res.status(201).json({ status: "success", data: newRelax })
})


// ** put 更新紀錄**
app.put('/estimates/:id', (req, res) => {
  const index = estimates.findIndex(e => e.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ status: "error", message: "找不到資料" })
  
  estimates[index] = { ...estimates[index], ...req.body }
  res.json({ status: "success", data: estimates[index] })
})

app.put('/relax/:id', (req, res) => {
  const index = relax.findIndex(e => e.id === req.params.id)
  if (index === -1) return res.status(404).json({ status: "error", message: "找不到資料" })
  
  relax[index] = { ...relax[index], ...req.body }
  res.json({ status: "success", data: relax[index] })
})


// ** delete 刪除紀錄**
app.delete('/estimates/:id', (req, res) => {
  estimates = estimates.filter(e => e.id !== parseInt(req.params.id))
  res.json({ status: "success", message: "紀錄已刪除" })
})

app.delete('/relax/:id', (req, res) => {
  const idToDelete = String(req.params.id);
  const beforeCount = relax.length
  relax = relax.filter(e => String(e.id) !== idToDelete); 
  // relax = relax.filter(e => e.id !== req.params.id)
  if (relax.length === beforeCount) {
    return res.status(404).json({ status: "error", message: "找不到資料" })
  }
  res.json({ status: "success", message: "紀錄已刪除" })
})


// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`)
})
