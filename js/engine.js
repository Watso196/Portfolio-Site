//The game engine for the JavaScript Canvas Cave Game Prototype

var canvasWidth = 400; 
var canvasHeight = 256;

var spriteWidth = 144; //sprite sheet height
var spriteHeight = 484; //sprite sheet width

var rows = 4; //rows and cols in sprite sheet .png file
var cols = 4;

var width = spriteWidth/cols; //width of sprite in sprite sheet .png file
var height = spriteHeight/rows;

var curFrame = 0; // current sprite animation frame in sprite sheet
var frameCount = 4; // number of sprite frames per row in sprite sheet

var x = 200; //where to render sprite in canvas
var y = 100;

var boxX = 201; // x coordinate of bounding box 
var boxY = 135; // y coord of bounding box

var srcX = 0; //coordinates to get frame in sprite sheet
var srcY = 0; //this changes based on keyPressed to draw sprite

var seePickaxe = true; // if true, we can see the pickaxe object, if false the user has picked it up
//this could later contribute to an inventory system that allows players to use items


// Create maps object to hold all map data so it is accessible to other functions but not global
maps = {};


maps.map1 = [// CURRENTLY: 25 A, 16 D
      [2,5,4,5,4,5,4,5,4,5,4,5,6,1,1,3,4,5,4,5,4,5,4,5,2],
      [13,10,11,10,11,10,11,10,11,10,11,10,12,1,1,9,10,11,10,11,10,11,10,11,14],
      [13,11,10,11,10,11,10,11,10,11,10,11,12,1,1,9,11,10,11,10,11,10,11,10,14],
      [13,16,17,16,17,16,17,16,17,16,17,16,18,1,1,15,16,17,16,17,16,17,16,17,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14],
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ]


//Initialize function to call up key functions, map, character and items
function init() {

	window.onkeydown = keydown; //triggers fxn keydown
	window.onkeyup = keyup; //triggers fxn keyup

	drawMap();
	//width and height /2 because I made my sprite too big and am too lazy to redraw all of the frames
	ctx.drawImage(character, srcX, srcY, width, height, x, y, (width/2), (height/2));
	
	window.setInterval(moveSprite, 100);
	
	drawItems(); // Draws items on map to canvas!

}





//begin drawMap function
function drawMap() {

	window.addEventListener('load', drawMap, true);

    var ctx = document.getElementById('canvas').getContext('2d');
    

    var tileAtlas = new Image();
    tileAtlas.src='images/rpg/cavetilesmin.png';
    
    
    var tileSize = 16;


	curMap = 1;
  

    // Now we loop through our map from start to end via the length of multidimensional array.
    for (var i = 0; i < maps.map1.length; i++) { // loop through the columns
      for (var j = 0; j < maps.map1[i].length; j++) { // loop through the rows
        switch (maps.map1[i][j]){ 
        
          case 1: // TILE NAME: GROUND
            ctx.drawImage(tileAtlas, 0, 0, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
            tileSize);
          break;
                          
          case 2: // BLACK
            ctx.drawImage(tileAtlas, 16, 0, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
            tileSize);
          break;
            
          case 3: // WALL TOP CORNER LEFT 
          	ctx.drawImage(tileAtlas, 32, 0, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 4: // WALL TOP CENTER LEFT 
          	ctx.drawImage(tileAtlas, 48, 0, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 5: // WALL TOP CENTER RIGHT
          	ctx.drawImage(tileAtlas, 64, 0, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 6: // WALL TOP CORNER RIGHT
          	ctx.drawImage(tileAtlas, 80, 0, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 7: // WALL SIDE RIGHT-FACING CORNER
          	ctx.drawImage(tileAtlas, 0, 16, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 8: // WALL SIDE LEFT-FACING CORNER
          	ctx.drawImage(tileAtlas, 16, 16, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 9: // WALL MIDDLE CORNER LEFT
          	ctx.drawImage(tileAtlas, 32, 16, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 10: // WALL CENTER LEFT
          	ctx.drawImage(tileAtlas, 48, 16, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 11: // WALL CENTER RIGHT
          	ctx.drawImage(tileAtlas, 64, 16, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 12: // WALL MIDDLE CORNER RIGHT
          	ctx.drawImage(tileAtlas, 80, 16, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 13: // WALL SIDE RIGHT-FACING
          	ctx.drawImage(tileAtlas, 0, 32, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 14: // WALL SIDE LEFT-FACING
          	ctx.drawImage(tileAtlas, 16, 32, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 15: //WALL BOTTOM CORNER LEFT
          	ctx.drawImage(tileAtlas, 32, 32, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 16: // WALL BOTTOM CENTER LEFT
          	ctx.drawImage(tileAtlas, 48, 32, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 17: // WALL BOTTOM CENTER RIGHT
          	ctx.drawImage(tileAtlas, 64, 32, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
          case 18: // WALL BOTTOM CORNER RIGHT
          	ctx.drawImage(tileAtlas, 80, 32, tileSize, tileSize, j * tileSize, i * tileSize, tileSize, 
          	tileSize);
          break;
          
        }
      }
    }
}

// DRAW THE MAP!
drawMap();



function drawItems() {

	if (curMap === 1) {
	
		if (seePickaxe === true) {
	
			var pickaxe = new Image();
			pickaxe.src="images/rpg/pickaxe.png";
			ctx.drawImage(pickaxe, 0, 0, 16, 16, 300, 200, 16, 16); // draw the pickaxe!
			
		}
		
	}

}


//BEGIN BUILDING SPRITE AND MOVEMENT
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var ctx = canvas.getContext("2d"); //dimensional context for canvas

var character = new Image(); //create image object for sprite

character.src = "images/rpg/tomspritesheet.png";




keyPressed = {};


// Function to check to see which tiles are walkable tiles
function isGroundTile(map, y, x) {

	return (map[y][x] === 1); // because 1 is the only walkable tile in my tile set (*currently)

}



// Create an array that holds all of the integer values of walkable tiles, then check isGroundTiles for those spots in the array (0,1,2)
// Also create a boundng box to detect sprite movement instead of using full sprite for detection
function moveSprite(e) {


		var mappedX = Math.ceil(boxX / 16); //these variables tell the program which tile my sprite is in
		var mappedY = Math.ceil(boxY / 16); // divide by 16 because x and y are in pixels - tiles = 16x16
	
	
		if (keyPressed["Left"] || keyPressed["ArrowLeft"]) { // LEFT ARROW
		srcY = 363;
		if (boxX >= 5 && isGroundTile(maps.map1, mappedY, mappedX - 1)) {
			x -= 6;
			boxX -= 6; // move the sprite bounding box
			draw();
			//console.log(mappedX, mappedY); // debugging math problems
			}
		}
		
		if (keyPressed["Up"] || keyPressed["ArrowUp"]) { // UP ARROW
		srcY = 121;
		if (boxY >= 5 && isGroundTile(maps.map1, mappedY - 1, mappedX)) {
			y -= 6;
			boxY -= 6;
			draw();
			//console.log(mappedX, mappedY);
			}
		}
		
		if (keyPressed["Right"] || keyPressed["ArrowRight"]) { // RIGHT ARROW
		srcY = 242;
		if (boxX <= 380 && isGroundTile(maps.map1, mappedY, mappedX + 1)) {
			x += 6;
			boxX += 6;
			draw();
			}
		}
		
		if (keyPressed["Down"] || keyPressed["ArrowDown"]) { // DOWN ARROW
		srcY = 0;
		if (boxY <= 195 && isGroundTile(maps.map1, mappedY + 1, mappedX)) {
			y += 8;
			boxY += 8;
			draw();
			}
		
		else {	
		
			srcX = 0; // sets sprite to first frame in animation
		
		}
		
		}
		
	}
	
	

function touch() { // x = 250 y = 150

	if (boxX + 15 >= 300) {
	
		if (boxY + 15 >= 200){
	
			if (seePickaxe === true) {
		
				seePickaxe = false; // causes the program to stop drawing the pickaxe
		
			}
			
		}
	
	}

}
	
	
	
function updateFrame() {

//updating frame index
curFrame = ++curFrame % frameCount;

//calculating x coordinate on sprite sheet to get frame
srcX = curFrame * width;

//clearing the canvas so that frames don't stay on screen after they've been played
ctx.clearRect(0, 0, 400, 256);// I've cleared the whole canvas due to some problems with dirty boxing
							  // only my sprite (leaves weird white box around sprite)

drawMap();

}


	
function keydown(e){ 
	
	e.preventDefault();
	keyPressed[e.key] = true;//harness data, want it to return info about the key being pressed, true allows it to trigger the if else. 
	
};

function keyup(e){
	
	keyPressed[e.key] = false; // causes the if/else statement to stop
	
};


//function to render the sprite
function draw() {


if (keyPressed["ArrowRight"] || ["ArrowLeft"] || ["ArrowUp"] || ["ArrowDown"] || ["Right"] || 
["Left"] || ["Up"] || ["Down"] === true) {

	//call updating frame function to update sprite frames
	updateFrame();

	// width/2 and height/2 because sprite was too big; didn't know what px size I would be using
	// I could redesign the whole sprite sheet but I really don't want to at this point. It's the end of the semester
	ctx.drawImage(character, srcX, srcY, width, height, x, y, (width/2), (height/2));
	
	ctx.beginPath();
	ctx.rect(boxX, boxY, 5, 20); //height = sprite screen height/2 (60px) width = sprite width - 6 /2 (15) 
	//sprite width accommodates the sideview of the sprite animations so that collision looks accurate
	//variables are used for the x and y drawing coordinates so that the box can move with the player!
	ctx.closePath();
	
	drawItems();
	touch();
	
	
}

else {

	ctx.drawImage(character, 0, srcY, width, height, x, y, (width/2), (height/2));
	
}


}

window.addEventListener('load', init, true);



