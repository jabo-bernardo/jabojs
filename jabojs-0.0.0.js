// Jabo JS v0.0.0
// Follow Jabo JS on twitter @jabo_js
// For 

// This library is developed by Code Jabo.
// Follow Code Jabo on Twitter @jabo_bernardo


var canvas;
var ctx;

var FPS;

var gameLoop = null;
var renderLoop = null;

var core;

var gameObjects = [];

window.onload = function() {

	Initialize();

	FPS = 60;

	core = new Core();

	changeScene(core);
}

// This function sets the values of the {canvas} and {ctx}
function Initialize() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext('2d');
	canvas.onmousemove = mouseMove;
}

// Takes in two parameters x and y useful for coordinates.
var Vector2 = function(x, y) {

	this.x = x;
	this.y = y;	

	this.Translate = function(xMove, yMove) {
		this.x += xMove;
		this.y += yMove;
	}

}

// Graphics 
var Sprite = function(src) {
	var img = new Image();
	img.src = src;

	return img;
}

// Game Object
var GameObject = function(x2, y2, w2, h2) {

	// identifiers
	var tag = "GameObject";
	gameObjects.push(this)
	var id = gameObjects.length - 1;

	this.x = x2;
	this.y = y2;
	this.w = w2;
	this.h = h2;

	var visible = true;
	// Image of the object;
	var texture;

	// Methods
	this.Move = function(xMove, yMove) {
		this.x += xMove;
		this.y += yMove;
	}

	this.Translate = function(xMove, yMove) {
		this.x += xMove;
		this.y += yMove;
	}

	// Renders the object
	this.Render = function() {
		if(!visible)
			return;
		if(texture == null)
			ctx.fillRect(this.x, this.y, this.w, this.h);
		else {
			try {
				ctx.drawImage(texture, this.x, this.y, this.w, this.h);
			} catch(err) {
				Debug("Failed to load texture for " + tag + "(" + id + "), You can try the ff.");
				Debug("* use Sprite() see documentation[]");
				Debug("* maybe the file is missing, you can try double checking your directory")

			}
		}
	}

	// Setters
	this.setTexture = function(path) {
		texture = path;
	}

	this.setVisibility = function(vis) {
		if(vis == true)
			visible = true;
		else if(vis == false)
			visible = false;
		else
			visible = true;
	}

	this.setTag = function(name) {
		tag = name;
	}

	// Getters
	this.getID = function() {
		return id;
	}

}



// Scene Manager
function changeScene(scn) {

	clearInterval(gameLoop);
	clearInterval(renderLoop);

	scn.Init();
	gameLoop = setInterval(scn.Update, 1000/FPS);
	renderLoop = setInterval(scn.Render, 1000/FPS);

}

// Inputs
var Input = function() {

	this.mouseX = 0;
	this.mouseY = 0;

}

// Event Handlers
function mouseMove(evt) {

	Input.mouseX = evt.clientX;
	Input.mouseY = evt.clientY;

}

// Misc
function Debug(string) {
	console.log(string);
}

// useful for clearing the canvas
function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// set the maximum frames per second of the game.
function setMaxFps(fps) {
	FPS = fps;
}

function checkCollide(obj1, obj2) {

	if((obj1.x + obj1.w) >= obj2.x && 
		obj1.x <= (obj2.x + obj2.w)) {

		if((obj1.y + obj1.h) >= obj2.y && 
		obj1.y <= (obj2.y + obj2.h)) {

			return true;

		}

	}
	return false;
}

function getDistance(obj1, obj2) {

	return Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));

}

function Random(min, max) {

	var num = Math.floor(Math.random() * max);
	while(num < min)
		num = Math.floor(Math.random() * max);
	return num;

}
