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
        console.log("Liking post with score_id:", scoreId); // Log scoreId
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

        console.log("Post liked successfully");
        readPost();
    } catch (error) {
        console.error("Error liking post:", error);
        alert("Failed to like the post. Please try again.");
    }
}

async function writeComment(scoreId, commentText) {
    // Ensure that commentText is not empty before submitting
    if (!commentText) {
        alert("Please enter a comment before posting.");
        return;
    }

    let commentData = {
        score_id: scoreId,  // The ID of the post to which this comment belongs
        username: getCookie('username'),  // Get the username from the cookie
        text: commentText,  // The actual comment text
    };

    try {
        let response = await fetch('/writeComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),  // Send the comment data to the server
        });

        if (!response.ok) {
            throw new Error(`Failed to post comment: ${response.statusText}`);
        }

        // If comment was successfully added, reload the posts to show the new comment
        readPost();  // Refresh posts to include the new comment
    } catch (error) {
        console.error("Error writing comment:", error);
        alert("Failed to post comment. Please try again.");
    }
}




function showPost(data) {
    var keys = Object.keys(data); // Get the keys of the object (posts)
    var divTag = document.getElementById("feed-container"); // Select container for posts
    divTag.innerHTML = ""; // Clear existing content

    for (var i = 0; i < keys.length; i++) {
        var temp = document.createElement("div");
        temp.className = "newsfeed";
        divTag.appendChild(temp);

        // Show username of the post
        var userDiv = document.createElement("div");
        userDiv.className = "postuser";
        userDiv.innerHTML = "Posted by: " + data[keys[i]]["username"];
        temp.appendChild(userDiv);

        // Show number of likes
        var likeDiv = document.createElement("div");
        likeDiv.className = "postlike";
        likeDiv.innerHTML = "Likes: " + data[keys[i]]["likes"];
        temp.appendChild(likeDiv);

        // Add a Like button
        var likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.innerHTML = "Like";
        likeButton.setAttribute("data-score-id", data[keys[i]]["score_id"]); // Bind the score_id
        likeButton.onclick = function () {
            let scoreId = this.getAttribute("data-score-id");
            likePost(scoreId); // Call likePost function with score_id
        };
        temp.appendChild(likeButton);

        // Show time of post
        var timeDiv = document.createElement("div");
        timeDiv.className = "posttime";
        timeDiv.innerHTML = "Time: " + data[keys[i]]["timescore"];
        temp.appendChild(timeDiv);

        // Add comment section
        var commentDiv = document.createElement("div");
        commentDiv.className = "postcomment";
        temp.appendChild(commentDiv);

        var commentTextarea = document.createElement("textarea");
        commentTextarea.className = "comment-textarea";
        commentTextarea.placeholder = "Write a comment...";
        commentDiv.appendChild(commentTextarea);

        // Add "Post Comment" button with IIFE to capture the correct score_id
        var commentButton = document.createElement("button");
        commentButton.className = "comment-button";
        commentButton.innerHTML = "Post Comment";

         // Debug: Add input listener to see real-time value
         commentTextarea.addEventListener("input", function() {
            console.log("Current textarea value: ", commentTextarea.value); // Logs each time user types
        });

        commentButton.onclick = (function(scoreId, textarea) {
            return function() {
                // Log the textarea value to ensure we get the correct data
                console.log("Textarea value: " + textarea.value);  // This should log the text you type
        
                var commentText = textarea.value.trim();  // Get and trim the value to remove spaces
        
                if (!commentText) {
                    alert("Please enter a comment before posting");  // Prompt if the comment is empty
                    return;  // Exit if empty
                }
        
                // If the comment is not empty, submit it
                alert("Posting comment...");
                writeComment(scoreId, commentText);  // Call the writeComment function to submit the comment
                textarea.value = "";  // Clear the textarea after submitting
            };
        })(data[keys[i]]["score_id"], commentTextarea);  // Pass both score_id and the textarea element

        commentDiv.appendChild(commentButton);

        // Add description that can overflow
        var descriptionDiv = document.createElement("div");
        descriptionDiv.className = "post-description";
        descriptionDiv.innerHTML = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
        temp.appendChild(descriptionDiv);
    }
}




