console.log("index.js linked");

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let playerWidthAndHeight = 0
let playerX = 0;
let playerY = 0;
let playerColor = 'orange';
let velocity = 0;

let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

function setUpCanvas(){ // sets default player attributes
    canvas.width = window.innerWidth;       // Example Width 1000px
    canvas.height = window.innerHeight;     // Example Height 1000px
    playerWidthAndHeight = canvas.width *0.1;   // Makes player WH = 100px. (1000 * 0.1)
    velocity = canvas.width * 0.01;             // Makes player Velocity 1.  (1000 * 0.01)

    playerX = (canvas.width - playerWidthAndHeight) / 2;        // (1000px - 100px) / 2.   aka 900 / 2 = 450.
    playerY = (canvas.height - playerWidthAndHeight) / 2;       // (1000px - 100px) / 2.   aka 900 / 2 = 450.
}

setUpCanvas(); 

window.addEventListener('resize', setUpCanvas); // listens for window resize

window.addEventListener('gamepadconnected', (event) => {    // gamepad Connected event listener. Must press button first.
    console.log('gamepad connected');
    controllerIndex = event.gamepad.index;
})

window.addEventListener('gamepaddisconnected', (event) => {    // gamepad Disconnected event listener
    console.log('gamepad DISconnected');
    controllerIndex = event.gamepad.index;
})

function clearScreen() { // clears the screen. Sets dark grey screen
    ctx.fillStyle = "#333331";
    ctx.fillRect(0,0,canvas.width, canvas.height)
}

function drawPlayer(){
    ctx.fillStyle = playerColor;
    ctx.fillRect( playerX, playerY, playerWidthAndHeight, playerWidthAndHeight );
}

function checkPlayerAttributes (){
    console.log('player W/H: ', playerWidthAndHeight, "x", playerWidthAndHeight);
    console.log('playerX: ', playerX, ". ", "playerY: ", playerY);

}
    
function gameLoop() { 
    console.log('gameLoop');
    clearScreen();  // clears the screen. Sets dark grey screen
    drawPlayer();   // 
    requestAnimationFrame(gameLoop); // recursion
}

gameLoop();
checkPlayerAttributes();