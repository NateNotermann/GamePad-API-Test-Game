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

let bluePressed = false;
let yellowPressed = false;
let redPressed = false;
let greenPressed = false;

let connected = false
let gameLoopCheck = false

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
    console.log('playerColor:', playerColor);
    if (gameLoopCheck) { console.log('gameLoop running');}
    // console.log(gamepad.controllerIndex);
    // console.log(gamepad.buttons);
}

// -------- BASIC CONTROLLER INPUT TEMPLATE FUNCTION -------- //
function controllerInput() {  
    if(controllerIndex !== null) {
        const gamepad = navigator.getGamepads()[controllerIndex]
        const buttons = gamepad.buttons;
        upPressed = buttons[12].pressed;
        downPressed = buttons[13].pressed;
        leftPressed = buttons[14].pressed;
        rightPressed = buttons[15].pressed;

        const stickDeadZone = 0.4;              // change to 0.8 to only allow movement in one direction at a time.
        const leftRightValue = gamepad.axes[0];
        const upDownValue = gamepad.axes[1];

        if(leftRightValue >= stickDeadZone) {   // if gamepad left/right axes is >= than deadZone, move right
            rightPressed = true;
        } 
        else if (leftRightValue <= -stickDeadZone) {    // if gamepad left/right axes is <= than deadZone, move left
            leftPressed = true;
        }

        if(upDownValue >= stickDeadZone) { // if gamepad up/down axes is >= than deadZone, move up
            downPressed = true;
        } 
        else if (upDownValue <= -stickDeadZone) { // if gamepad up/down axes is <= than deadZone, move down
            upPressed = true;
        }

        greenPressed = buttons[0].pressed;
        redPressed = buttons[1].pressed;
        bluePressed = buttons[2].pressed;
        yellowPressed = buttons[3].pressed;

    }
};

// -------- BASIC FUNCTION TO MOVE PLAYER -------- //
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
// -------- ONLY CHANGES C.RECT COLOR -------- //
function changePlayerColor(buttonPressed) {
switch (buttonPressed) {
    case "green":
        playerColor = "green";
        break;
    case "yellow":
        playerColor = "yellow";
        break;
    case "blue":
        playerColor = "blue";
        break;
    case "red":
        playerColor = "red";
        break;
    default:
        playerColor = "orange";
        break;
}
// console.log('change player color');
// console.log("buttonPressed: " + buttonPressed);
// console.log("playerColor: " + playerColor);

    // if(bluePressed) {
    //     // playerColor = "blue"
    // } 
    // if(redPressed) {
    //     playerColor = "yellow"
    // } 
    // if(yellowPressed) {
    //     playerColor = "red"
    // } 
    // if(greenPressed) {
    //     playerColor = "green"
    // } 
    // if(!bluePressed && !redPressed && !yellowPressed && !greenPressed) {
    //     playerColor = "orange"
    // }
    // if(greenPressed) {      // green[0], yellow[1], blue[2], red[3]
    //     playerColor = "green"
    // } else if (redPressed) {
    //     playerColor = "red"
    // } else if (bluePressed) {
    //     playerColor = "blue"
    // } else if (yellowPressed) {
    //     playerColor = "yellow"
    // } else {
    //     playerColor = "orange"
    // }
    // console.log("Green:" + greenPressed, " red:" + redPressed, " Blue:" + bluePressed, " Yellow:" + yellowPressed, "buttonPressed: " + buttonPressed, "playerColor: " + playerColor);
}

// ------ All this does is sperate the controller input console logs into a separate function to turn on an off 
function checkButtonPressed() {     // green[0], red[1], blue[2], yellow[3]
    if (controllerIndex !== null ){

    
        const gamepad = navigator.getGamepads()[controllerIndex]
        const buttons = gamepad.buttons;

        if(greenPressed) {              // [0]
            changePlayerColor("green")  // green
        } 
        if(buttons[1].pressed) {        // [1]
            changePlayerColor("red")    // red
            // playerColor = "red"         
        } 
        if(buttons[2].pressed) {        // [2]
            changePlayerColor("blue")   // blue
            // playerColor = "blue"        
        } 
        if(buttons[3].pressed) {        // [3]
            changePlayerColor("yellow") // yellow
            // playerColor = "yellow"      
        }
    }
}

function updatePlayer() {
    movePlayer();
    changePlayerColor();
}

function gameLoop() { 
    gameLoopCheck = true;
    clearScreen();  // clears the screen. Sets dark grey screen
    drawPlayer();   
    controllerInput();
    updatePlayer();
    checkButtonPressed();
    requestAnimationFrame(gameLoop); // recursion
    // checkPlayerAttributes();     // Checks/Console logs gamepad attributes
}

gameLoop();
checkPlayerAttributes();