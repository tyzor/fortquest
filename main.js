const mapOrigX = 780;
const mapOrigY = 843;

document.body.onload = function () {
    console.log('loaded')

    let targetEl = document.querySelector('#target');
    let rollBtn = document.querySelector('#rollButton');
    targetEl.style.opacity = 0

    rollBtn.onclick = (evt) => {
        setNewTarget(targetEl)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNewTarget(targetEl)
{
    let x = getRandomInt(100,mapOrigX-100)
    let y = getRandomInt(100,mapOrigY-100)
    let pos = getScaledCoords(x,y)
    
    let props = window.getComputedStyle(targetEl, null)
    let tw = parseInt(props.width)
    let th = parseInt(props.height)

    targetEl.style.left = Math.floor(pos.x - tw/2) + 'px'
    targetEl.style.top = Math.floor(pos.y - th/2) + 'px'
    targetEl.style.opacity = 0.8
}

function getScaledCoords(x,y) {

    let mapEl = document.querySelector('#map')
    let xRatio = mapEl.width / mapOrigX;
    let yRatio = mapEl.height / mapOrigY;
    
    return {x: x*xRatio, y: y*yRatio}

}
