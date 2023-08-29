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

let connected = false

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
    connected = true
    controllerIndex = event.gamepad.index;
})

window.addEventListener('gamepaddisconnected', (event) => {    // gamepad Disconnected event listener
    connected = false
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
    console.log('gamepad Connected Status: ', connected);
    // console.log(gamepad.controllerIndex);
    // console.log(gamepad.buttons);
}

function controllerInput() {
    if(controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex]
        const buttons = gamepad.buttons;
        upPressed = buttons[12].pressed;
        downPressed = buttons[13].pressed;
        leftPressed = buttons[14].pressed;
        rightPressed = buttons[15].pressed;

        const stickDeadZone = 0.4;
        const leftRightValue = gamepad.axes[0];
        const upDownValue = gamepad.axes[1];

        if(leftRightValue >= stickDeadZone) {
            rightPressed = true;
        } 
        else if (leftRightValue <= -stickDeadZone) {
            leftPressed = true;
        }

        if(upDownValue >= stickDeadZone) { // if gamepad up/down axes is >= than deadZone, move up
            upPressed = true;
        } 
        else if (upDownValue <= -stickDeadZone) { // if gamepad up/down axes is <= than deadZone, move down
            downPressed = true;
        }

    }
};
    
function movePlayer() {
    if(upPressed) {
        playerY -= velocity;
    }
    if(downPressed) {
        playerY += velocity;
    }
    if(leftPressed) {
        playerX -= velocity;
    }
    if(rightPressed) {
        playerX += velocity;
    }
}

function updatePlayer() {
    movePlayer();
    //changePlayerColor();
}

function gameLoop() { 
    // console.log('gameLoop');
    clearScreen();  // clears the screen. Sets dark grey screen
    drawPlayer();   
    controllerInput();
    updatePlayer();
    requestAnimationFrame(gameLoop); // recursion
    // checkPlayerAttributes();     // Checks/Console logs gamepad attributes
}

gameLoop();
checkPlayerAttributes();