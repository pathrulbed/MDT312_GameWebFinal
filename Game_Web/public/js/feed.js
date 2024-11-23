// check ว่ามีการ set cookies หรือยังถ้ามีจะไปยัง feed.html แต่ถ้าไม่มีจะกลับไปที่ login.html
function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}

checkCookie();
window.onload = pageLoad;

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

function pageLoad(){
	document.getElementById('postbutton').onclick = getData;

	document.getElementById('displayPic').onclick = fileUpload;
	document.getElementById('fileField').onchange = fileSubmit;
	
	var username = getCookie('username');

	document.getElementById("username").innerHTML = username;
	console.log(getCookie('img'));
	showImg('img/'+getCookie('img'));
	readPost();
}

function getData(){
	var msg = document.getElementById("textmsg").value;
	document.getElementById("textmsg").value = "";
	writePost(msg);
}

function fileUpload(){
	document.getElementById('fileField').click();
}

function fileSubmit(){
	document.getElementById('formId').submit();
}

// แสดงรูปในพื้นที่ที่กำหนด
function showImg(filename){
	if (filename !==""){
		var showpic = document.getElementById('displayPic');
		showpic.innerHTML = "";
		var temp = document.createElement("img");
		temp.src = filename;
		showpic.appendChild(temp);
	}
}

// complete it
async function readPost(){
	let response = await fetch('/readPost')
	let json = await response.json()
	showPost(json)
}

// complete it
async function writePost(msg){
	let newJson = {
		user: getCookie('username'),
		message: msg,
	};

	let response = await fetch('/writePost', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newJson)
	});

	readPost();
}

async function likePost(scoreId) {
    try {
        let requestBody = {
            score_id: scoreId,
        };

        let response = await fetch('/likePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Failed to like post: ${response.statusText}`);
        }

        // Optionally log success or server response
        console.log("Post liked successfully");

        // Refresh the posts to reflect the updated like count
        readPost();
    } catch (error) {
        console.error("Error liking post:", error);
        alert("Failed to like the post. Please try again.");
    }
}


// แสดง post ที่อ่านมาได้ ลงในพื้นที่ที่กำหนด
function showPost(data) {
    var keys = Object.keys(data); // ดึง Key ของ Object
    var divTag = document.getElementById("feed-container"); // เลือก container
    divTag.innerHTML = ""; // ล้างเนื้อหาเดิมออก

    for (var i = 0; i < keys.length; i++) {
        var temp = document.createElement("div");
        temp.className = "newsfeed";
        divTag.appendChild(temp);

        // แสดงชื่อผู้ใช้
        var userDiv = document.createElement("div");
        userDiv.className = "postuser";
        userDiv.innerHTML = "Posted by: " + data[keys[i]]["username"];
        temp.appendChild(userDiv);

        // แสดงจำนวน likes
        var likeDiv = document.createElement("div");
        likeDiv.className = "postlike";
        likeDiv.innerHTML = "Likes: " + data[keys[i]]["likes"];
        temp.appendChild(likeDiv);

        // เพิ่มปุ่ม Like
        var likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.innerHTML = "Like";
        likeButton.onclick = function() {
            // เพิ่มจำนวน like เมื่อคลิกปุ่ม
            likePost(data[keys[i]]);
           
        };
        temp.appendChild(likeButton);

        // แสดง timescore
        var timeDiv = document.createElement("div");
        timeDiv.className = "posttime";
        timeDiv.innerHTML = "Time: " + data[keys[i]]["timescore"];
        temp.appendChild(timeDiv);

        // เพิ่มช่องใส่ comment
        var commentDiv = document.createElement("div");
        commentDiv.className = "postcomment";
        temp.appendChild(commentDiv);

        var commentTextarea = document.createElement("textarea");
        commentTextarea.className = "comment-textarea";
        commentTextarea.placeholder = "Write a comment...";
        commentDiv.appendChild(commentTextarea);

        // เพิ่มปุ่มส่ง comment
        var commentButton = document.createElement("button");
        commentButton.className = "comment-button";
        commentButton.innerHTML = "Post Comment";
        commentButton.onclick = function() {
            var commentText = commentTextarea.value;
            if (commentText) {
                // var commentDisplay = document.createElement("div");
                // commentDisplay.className = "comment-display";
                // commentDisplay.innerHTML = commentText;
                // commentDiv.appendChild(commentDisplay);
                // commentTextarea.value = ""; // ล้าง textarea หลังจากโพสต์
            }
        };
        commentDiv.appendChild(commentButton);

		// เพิ่มช่องใส่ข้อความอธิบายที่สามารถ overflow ได้
        var descriptionDiv = document.createElement("div");
        descriptionDiv.className = "post-description";
        descriptionDiv.innerHTML = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        //descriptionDiv.innerHTML = data[keys[i]]["description"];  // ค่าข้อความอธิบายจาก data
        temp.appendChild(descriptionDiv);

        
    }
}


