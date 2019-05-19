// This library is developed by Code Jabo.
// Follow Code Jabo on Twitter @jabo_bernardo


// This is the canvas of the game underneath is the context of the canvas.
var canvas;
var ctx;

var FPS;

var gameLoop = null;
var renderLoop = null;

window.onload = function() {
	FPS = 120;

	gameLoop = setInterval(Update, 1000/FPS);
	renderLoop = setInterval(Render, 1000/FPS);
}

// This function sets the values of the {canvas} and {ctx}
function Initialize() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext('2d');
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
var GameObject = function(x, y, w, h) {

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	var visible = true;
	// Image of the object;
	var texture;
	var tag = "GameObject";

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
			ctx.fillRect(x, y, w, h);
		else {
			try {
				ctx.drawImage(texture, x, y, w, h);
			} catch(err) {
				console.log("Failed to load texture for " + tag + "");
			}
		}
	}

	this.setVisibility = function(vis) {
		if(vis == true)
			visible = true;
		else if(vis == false)
			visible = false;
		else
			visible = true;
	}

	this.setTexture = function(path) {
		texture = path;
	}

	this.setTag = function(name) {
		tag = name;
	}

}

// useful for clearing the canvas
function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// set the maximum frames per second of the game.
function setMaxFps(fps) {
	FPS = fps;
}

function importScene(path) {
	document.write();
}