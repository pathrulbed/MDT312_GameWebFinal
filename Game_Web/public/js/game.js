window.onload = pageLoad;

function pageLoad() {
    document.getElementById("start").onclick = startGame;
}

function startGame() {
    addBox();   // เพิ่มกล่อง
    timeStart(); // เริ่มจับเวลา
}

function timeStart() {
    var TIMER_TICK = 1000;
    var timer = null;
    var min = 0.5; // 0.5 นาที
    var second = min * 60; 
    var x = document.getElementById('clock');
    // ตั้งเวลาโดยใช้ setInterval
    timer = setInterval(timeCount, TIMER_TICK);
    
    function timeCount() {
        second -= 1;
        x.innerHTML = second;

        if (second <= 0) {
            clearInterval(timer);
            var allbox = document.querySelectorAll("#layer div");
            if (allbox.length > 0) {
                clearScreen();
                alert("Game over! Time is up.");
            }
        } else if (document.querySelectorAll("#layer div").length === 0) {
            alert("You win!");
            clearInterval(timer);
        }
    }
}

function moveBox(box) {
    // สุ่มทิศทางการเคลื่อนที่ในแกน X และ Y
    var moveDirectionX = Math.random() < 0.5 ? 1 : -1; // ทิศทางการเคลื่อนที่ในแกน X
    var moveDirectionY = Math.random() < 0.5 ? 1 : -1; // ทิศทางการเคลื่อนที่ในแกน Y

    // สุ่มความเร็ว
    var moveSpeedX = Math.random() * 4 + 2; // ความเร็วในแกน X
    var moveSpeedY = Math.random() * 4 + 2; // ความเร็วในแกน Y

    var boxSize = 50;     // ขนาดของกล่อง
    
    // ตั้งค่าตำแหน่งเริ่มต้นให้กล่องเกิดตรงกลาง
    var boxX = Math.random() * (500 - boxSize);  // ตำแหน่ง X ของกล่อง
    var boxY = Math.random() * (500 - boxSize);  // ตำแหน่ง Y ของกล่อง

    // ขอบเขตของพื้นที่เกม (กรอบ 500x500px)
    var boundaryX = 900;  // ความกว้างของกรอบ
    var boundaryY = 600;  // ความสูงของกรอบ

    // ใช้ setInterval ในการเคลื่อนที่
    var moveInterval = setInterval(function() {
        // คำนวณตำแหน่งใหม่ของกล่อง
        boxX += moveDirectionX * moveSpeedX; // การเคลื่อนที่ในแกน X
        boxY += moveDirectionY * moveSpeedY; // การเคลื่อนที่ในแกน Y

        // ตรวจสอบไม่ให้กล่องเกินขอบกรอบ
        if (boxX < 0 || boxX + boxSize > boundaryX) {
            moveDirectionX = -moveDirectionX; // เปลี่ยนทิศทางในแกน X เมื่อชนขอบ
        }
        if (boxY < 0 || boxY + boxSize > boundaryY) {
            moveDirectionY = -moveDirectionY; // เปลี่ยนทิศทางในแกน Y เมื่อชนขอบ
        }

        // เปลี่ยนทิศทางใหม่สุ่มในระหว่างการเคลื่อนที่
        if (Math.random() < 0.01) { // 1% ของโอกาสที่จะเปลี่ยนทิศทาง
            moveDirectionX = Math.random() < 0.5 ? 1 : -1;
            moveDirectionY = Math.random() < 0.5 ? 1 : -1;
        }

        // ตั้งค่าตำแหน่งใหม่ให้กับกล่อง
        box.style.left = boxX + "px";
        box.style.top = boxY + "px";
    }, 20); // การเคลื่อนที่ทุกๆ 20 มิลลิวินาที
}




function addBox() {
    var numbox = document.getElementById("numbox").value; // จำนวนกล่อง
    var gameLayer = document.getElementById("layer");
    var colorDrop = document.getElementById("color").value; // สีจากการเลือกของผู้ใช้

    for (var i = 0; i < numbox; i++) {
        var tempbox = document.createElement("div");
        tempbox.className = `square ${colorDrop}`; // ตั้งสีจากตัวเลือก
        tempbox.id = "box" + i;
        var boxSize = 50; // ขนาดกล่อง 50px
        tempbox.style.width = boxSize + "px";  // ตั้งความกว้างของกล่อง
        tempbox.style.height = boxSize + "px"; // ตั้งความสูงของกล่อง
        tempbox.style.left = Math.random() * (500 - boxSize) + "px"; // ปรับให้กล่องไม่ออกขอบ
        tempbox.style.top = Math.random() * (500 - boxSize) + "px";  // ปรับให้กล่องไม่ออกขอบ
        gameLayer.appendChild(tempbox);

        // เริ่มต้นการเคลื่อนที่ของกล่อง
        moveBox(tempbox);
        bindBox(tempbox);
    }
}


function bindBox(box) {
    // เมื่อคลิกที่กล่อง กล่องจะหายไป
    box.onclick = function() {
        box.remove();
    }
}

function clearScreen() {
    var allbox = document.querySelectorAll("#layer div");
    // ลบกล่องทั้งหมด
    for (var i = 0; i < allbox.length; i++) {
        allbox[i].remove();
    }
}
