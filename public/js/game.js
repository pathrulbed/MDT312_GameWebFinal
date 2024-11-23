window.onload = pageLoad;

function pageLoad() {
    document.getElementById("start").onclick = startGame;
}

function startGame() {
    var numbox = parseInt(document.getElementById('numbox').value);

    if (Number.isInteger(numbox) && (numbox > 0)) {
        alert("Ready");
        addBox();
        timeStart();
    } else {
        alert("Input Number");
        document.getElementById('numbox').value = " ";
    }
}

function timeStart() {
    var TIMER_TICK = 1000;
    var timer = null;
    var min = 0.5; // 0.5 minute
    var second = min * 10;
    var x = document.getElementById('clock');
    x.innerHTML = second;

    //setting timer using setInterval function
    timer = setInterval(timeCount, TIMER_TICK);

    function timeCount() {
        var allbox = document.querySelectorAll("#layer div");

        if (allbox.length > 0) {
            second--;
            if (second < 0) {
                x.innerHTML = 0;
            } else {
                x.innerHTML = second;
            }
        }

        if (allbox.length == 0) {
            clearInterval(timer);
            clearScreen();
            alert("You Win! (>w<)");
            document.getElementById('numbox').value = " ";
        }

        if ((allbox.length > 0) && (second < 0)) {
            clearInterval(timer);
            clearScreen();
            alert("You Lose! (TwT)");
            document.getElementById('numbox').value = " ";
        }
    }
}

function addBox() {
    var numbox = parseInt(document.getElementById('numbox').value);
    var gameLayer = document.getElementById('layer');
    var colorDrop = document.getElementById('color').value;

    for (var i = 0; i < numbox; i++) {
        var tempbox = document.createElement("div");
        tempbox.className = "square " + colorDrop;
        tempbox.id = "box" + i;
        tempbox.style.left = Math.random() * (500 - 25) + "px";
        tempbox.style.top = Math.random() * (500 - 25) + "px";
        gameLayer.appendChild(tempbox);
        bindBox(tempbox);
    }
}

function bindBox(box) {
    box.onclick = function() {
        box.remove();
    }
}

function clearScreen() {
    var allbox = document.querySelectorAll("#layer div");

    for (var i = 0; i < allbox.length; i++) {
        allbox[i].remove();
    }
}
