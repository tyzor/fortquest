document.body.onload = () => {

    // hookup menu
    let buttons = document.getElementById("menubar").querySelectorAll(".button");

    buttons.forEach(button => {
        console.log(button);
        button.onclick = el => {
            onClickTab(el.target.getAttribute("data-tab"));
        };
    })

    // perk tree selection
    /*
    let perkButtons = document.getElementById("perkTreeMenu").querySelectorAll(".button");
    perkButtons.forEach(button => {
        console.log(button);
        button.onclick = el => {
            onClickPerkTree(el.target.getAttribute("data-tab"));
        };
    })
    */

    // make rules active
    let ruleButton = Array.from(buttons).find(button => {
        return button.dataset.tab == 'rules'
    });
    ruleButton.click();

    // load points
    loadPointsSheet(document.getElementById("pointsContainer"));

}

function onClickTab(id) {

    console.log(`Clicked ${id}`);

    let buttons = Array.from(document.getElementById("menubar").querySelectorAll(".button"));
    let tabs = Array.from(document.querySelectorAll(".tabContainer"));

    let elements = buttons.concat(tabs);

    elements.forEach( el => {
        if(el.getAttribute("data-tab") != id)
        {
            el.classList.remove("active");
        } else
            el.classList.add("active");
    })

}

function onClickPerkTree(id)
{
    console.log(`Clicked ${id}`);

    let buttons = Array.from(document.getElementById("perkTreeMenu").querySelectorAll(".button"));
    let tabs = Array.from(document.querySelectorAll(".perkTreeRootContainer"));

    let elements = buttons.concat(tabs);

    elements.forEach( el => {
        if(el.getAttribute("data-tab") != id)
        {
            el.classList.remove("active");
        } else
            el.classList.add("active");
    })   
}

// Instead of embedding we can pull sheet data
async function loadPointsSheet(container) {
    //let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSMpwEditt1W2w-wOk9SoqpK_uOZ01ARoO_ATg98hnUk2g2fEKc_JHtaP651S-m_K-9P8nznyqzoS0q/pub?gid=1028857396&single=true&output=csv"
    let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQk61PfOFcU4eWhNnJKeAEnOtNpm96p_stpe4er01Wn9Te0FbNXb4a98No4-6O-QsrI8kOu4vO5fRYe/pub?gid=1028857396&single=true&output=csv"
    let response = await fetch(url);
    let pointsText = await response.text();
    // Get an array of each line
    let pointsLines = pointsText.match(/[^\r\n]+/g);
    // First line is players
    let players = pointsLines[0].split(',');
    // Second line is scores
    let scores = pointsLines[1].split(',');

    // 10th line is number of leads
    let playerLeads = pointsLines[9].split(',');
    // 14th line is number of lead wins
    let playerWins = pointsLines[13].split(',');

    // Lets assemble our data
    let playerData = [];
    players.forEach( (player,index) => {
        playerData.push({
            name: player,
            score: scores[index],
            leads: playerLeads[index],
            wins: playerWins[index]
        })
    })
    // Sort from first to last place
    playerData.sort( (a,b) => b.score-a.score );

    // Create the element
    let pointEl = document.createElement('div');
    pointEl.id = 'playerPointsChart';
    playerData.forEach(player => {
        pointEl.innerHTML += `
            <div class='pointsChartRow'>
                <div class='playerName'>${player.name}</div>
                <div class='playerStats'>
                    <div class='playerScore'>${player.score}</div>
                    <div class='playerLeads'>${player.leads}</div>
                    <div class='playerWins'>${player.wins}</div>
                </div>
            </div>
        `;
    })
    container.replaceChildren(pointEl);

    // 4/5th line is team wins
    let winLabel = pointsLines[4].split(',')[0]
    let winCount = parseInt(pointsLines[5].split(',')[0])

    let winsEl = document.createElement('div');
    winsEl.id = 'teamWinsChart';
    winsEl.innerHTML = `
        <div class='winsChartLabel'>${winLabel}</div>
        <div class='winsChartCount'>${winCount}</div>
    `
    container.appendChild(winsEl);

    // 

}