fetch("/ranking")
    .then((response) => response.json())
    .then((rankings) => {
        const rankingList = document.getElementById("ranking-list");
        rankings.forEach((rank) => {
            const li = document.createElement("li");
            li.textContent = `${rank.username}: ${rank.score}`;
            rankingList.appendChild(li);
        });
    });
