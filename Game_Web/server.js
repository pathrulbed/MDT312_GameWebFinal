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
app.use(bodyParser.urlencoded({ extended: false }));
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
    if (err) throw (err);
    else {
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve, reject) => {
        // query method
        con.query(sql, (err, result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

//ทำให้สมบูรณ์
app.post('/regisDB', async (req, res) => {
    let now_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = "CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,profilepic VARCHAR(255) DEFAULT 'avatar.png')";
    await queryDB(query);

    let query1 = `SELECT username, password FROM users`;
    let queryResponse = await queryDB(query1);
    let username = req.body.username;
    let password = req.body.password;

    let creds = Object.assign({}, queryResponse)

    let keys = Object.keys(creds);
    for (let user of keys) {
        if (creds[user].username == username) {
           
            return res.redirect('register.html?error=1');
        }
    }


   
    let query2 = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    await queryDB(query2);

    return res.redirect('login.html');

    
 
})

//ทำให้สมบูรณ์
app.post('/profilepic', (req, res) => {
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
    let query = `UPDATE users SET profilepic = '${filen}' WHERE username = '${username}'`
    await queryDB(query);
}

//ทำให้สมบูรณ์
app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('img');
    return res.redirect('login.html');
})

//ทำให้สมบูรณ์
app.get('/readPost', async (req, res) => {
    // Create table first if this is the first time.
    let query = `
    CREATE TABLE IF NOT EXISTS scores (
        score_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        likes INT DEFAULT 0,
        timescore FLOAT DEFAULT 0.0,
        comments VARCHAR(100000000) NOT NULL
    )
`;
    await queryDB(query)

    // Let's grab all messages to show from the database.
    let query2 = "SELECT * FROM scores ORDER BY timescore ASC";
    let queryResponse2 = await queryDB(query2)
    let messages = Object.assign({}, queryResponse2)
    res.status(200).send(messages);
})

//ทำให้สมบูรณ์
app.post('/writePost', async (req, res) => {
    let username = req.body.user
    let message = req.body.message
    let query = `INSERT INTO scores (score_id, username, likes, timescore, comments ) VALUES ('NULL', '${username}','NULL','${message}',"")`
    await queryDB(query);

    res.status(200).send("OK!");
})

// Route to like a post
app.post('/likePost', async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        let scoreId = req.body.score_id;
        if (!scoreId) {
            return res.status(400).send("Missing score_id.");
        }

        let query = `UPDATE scores SET likes = likes + 1 WHERE score_id = '${scoreId}'`;
        await queryDB(query);

        res.status(200).send("Post liked successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while liking the post.");
    }
});

// Route to like a post
app.post('/writeComment', async (req, res) => {
    try {
        console.log(req.body); // Log the incoming request body
        let scoreId = req.body.score_id;
        let message = req.body.message;
        let username = req.body.username;
        if (!scoreId) {
            return res.status(400).send("Missing score_id.");
        }

        
        let text = `${username} : ${message}\\n`; // Add \n for newlines
        let query = `UPDATE scores SET comments = CONCAT(IFNULL(comments, ''), '${text}') WHERE score_id = '${scoreId}'`;
        await queryDB(query);

        res.status(200).send("Comment liked successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while liking the post.");
    }
});






//ทำให้สมบูรณ์
app.post('/checkLogin', async (req, res) => {
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
    for (let user of keys) {
        if (creds[user].username == username && creds[user].password == password) {
            res.cookie('username', username);
            res.cookie('img', creds[user].profilepic);
            return res.redirect('index.html');
        }
    }

    return res.redirect('login.html?error=1');
})

// app.get('/readComment', async (req, res) => {
//     console.log(req.body); // Log the incoming request body
//         let scoreId = req.body.score_id;
//     // Create table first if this is the first time.
//     let query = `
//     CREATE TABLE IF NOT EXISTS comments (
//         comment_id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(255) NOT NULL,
//         text VARCHAR(255) NOT NULL,
//         score_id VARCHAR(255) NOT NULL
//     )
// `;
//     await queryDB(query)

//     // Let's grab all messages to show from the database.
//     let query2 = "SELECT * FROM comments WHERE score_id = '${scoreId}'";
//     let queryResponse2 = await queryDB(query2)
//     let messages = Object.assign({}, queryResponse2)
//     res.status(200).send(messages);
// })




app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/login.html`);
});
