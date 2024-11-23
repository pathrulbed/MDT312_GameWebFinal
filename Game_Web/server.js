const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/img/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// ใส่ค่าตามที่เราตั้งไว้ใน mysql
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "online_game"
})

con.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        // query method
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

//ทำให้สมบูรณ์
app.post('/regisDB', async (req,res) => {
    let now_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = "CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
    await queryDB(query);

    let username = req.body.username;
    let password = req.body.password;
    let query2 = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    await queryDB(query2);

    return res.redirect('login.html');
})

//ทำให้สมบูรณ์
app.post('/profilepic', (req,res) => {
    let upload = multer({
        storage: storage,
        fileFilter: imageFilter,
    }).single('avatar');

    upload(req, res, async (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send("Please send an image to upload!");
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.cookie('img', req.file.filename);
        await updateImg(req.cookies.username, req.file.filename);
        return res.redirect('feed.html')
    });
})

const updateImg = async (username, filen) => {
    let query = `UPDATE userinfo SET profilepic = '${filen}' WHERE username = '${username}'`
    await queryDB(query);
}

//ทำให้สมบูรณ์
app.get('/logout', (req,res) => {
    res.clearCookie('username');
    res.clearCookie('img');
    return res.redirect('login.html');
})

//ทำให้สมบูรณ์
app.get('/readPost', async (req,res) => {
    // Create table first if this is the first time.
    let query = "CREATE TABLE IF NOT EXISTS scores (score_id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255) NOT NULL, message VARCHAR(500))"
    await queryDB(query)

    // Let's grab all messages to show from the database.
    let query2 = "SELECT * FROM userposts"
    let queryResponse2 = await queryDB(query2)
    let messages = Object.assign({}, queryResponse2)
    res.status(200).send(messages);
})

//ทำให้สมบูรณ์
app.post('/writePost',async (req,res) => {
    let username = req.body.user
    let message = req.body.message
    let query = `INSERT INTO userposts (user, message) VALUES ('${username}', '${message}')`
    await queryDB(query);

    res.status(200).send("OK!");
})

//ทำให้สมบูรณ์
app.post('/checkLogin',async (req,res) => {
    // ถ้าเช็คแล้ว username และ password ถูกต้อง
    // return res.redirect('feed.html');
    // ถ้าเช็คแล้ว username และ password ไม่ถูกต้อง
    // return res.redirect('login.html?error=1')
    let query = `SELECT username, password FROM users`;
    let queryResponse = await queryDB(query);

    let username = req.body.username;
    let password = req.body.password;

    let creds = Object.assign({}, queryResponse)

    let keys = Object.keys(creds);
    for (let user of keys)
    {
        if (creds[user].username == username && creds[user].password == password)
        {
            res.cookie('username', username);
            res.cookie('img', creds[user].profilepic);
            return res.redirect('index.html');
        }
    }

    return res.redirect('login.html?error=1');
})


 app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/index.html`);
});