const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// เชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2134",
    database: "online_game",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
});

// ใช้ body-parser เพื่ออ่านข้อมูลที่ส่งมาจากฟอร์ม
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // เส้นทางสำหรับให้บริการไฟล์ในโฟลเดอร์ public

// ส่งไฟล์ HTML เมื่อเข้า URL
app.get("/register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/register.html"));
});

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/login.html"));
});

app.get("/game.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/game.html"));
});

app.get("/ranking.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/ranking.html"));
});

// POST สำหรับลงทะเบียน
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const checkSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkSql, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: "Error checking username" });
        if (results.length > 0) return res.status(400).json({ message: "Username already taken" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.query(sql, [username, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: "Error registering user" });
            res.status(200).json({ message: "User registered" });
        });
    });
});


// POST สำหรับล็อกอิน
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Invalid login" });
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid login" });
        }
    });
});


// POST สำหรับส่งคะแนน
app.post("/submit-score", (req, res) => {
    const { userId, score } = req.body;
    const sql = "INSERT INTO scores (user_id, score) VALUES (?, ?)";
    db.query(sql, [userId, score], (err) => {
        if (err) return res.status(500).send("Error saving score");
        res.status(200).send("Score saved");
    });
});

// ดึงข้อมูลการจัดอันดับ
app.get("/ranking", (req, res) => {
    const sql = `
        SELECT u.username, MAX(s.score) as score
        FROM users u
        JOIN scores s ON u.id = s.user_id
        GROUP BY u.username
        ORDER BY score DESC
        LIMIT 10;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send("Error retrieving rankings");
        res.status(200).json(results);
    });
});

// เปิดเซิร์ฟเวอร์ที่ port 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
