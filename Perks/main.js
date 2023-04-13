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
    let perkButtons = document.getElementById("perkTreeMenu").querySelectorAll(".button");
    perkButtons.forEach(button => {
        console.log(button);
        button.onclick = el => {
            onClickPerkTree(el.target.getAttribute("data-tab"));
        };
    })

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