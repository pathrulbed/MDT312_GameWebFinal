โปรแกรม เกมจับปูใส่กระด้ง นี้คือผลงานในรายวิชา MDT312 WEB PROGRAMMING 
ของนักศึกษา
1.นายเอกรัฐภูมิ พละหาญ 65120501037 
2.นายอัครพล ภัทราพร 65120501055
3.นายภัทร แก้วหนู 65120501032

วิธีการใช้ 
1.import online_game.sql เข้าสู่โปรแกรม phpMyAdmin

2.มีการตั้งค่าใน server.js ดังนี้ 
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "online_game"
})

3.รัน server.js
