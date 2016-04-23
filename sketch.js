
var things = [];
var num_things = 100;


//////////////////////////////////////

var w = 800;
var h = 900;
var div = 30;
var sz = 4;
var disp_w = 300;
var range = 250;
var consumer;
var cells = [];

var pause;

/*
 * @name Array of Objects
 * @description Create a Jitter class, instantiate an array of objects
 * and move them around the screen.
 */
var trees = []; // array of Tree objects
var millisec;

function setup() {
  print("strting...")
  createCanvas(w, h);
  millisec = millis();
  // Create objects
  //for (var i=0; i<50; i++) {
  //  bugs.push(new Tree());
  //}
  for (var x = 40; x < 1500; x+=(w/10)){
    for (var y = 40; y< 1000; y+=(h/5)){
      trees.push(new Tree(x, y, random(40,20), random(8,12), random(1500,1000)));////x,y,startsize , number of steps, length
      trees[trees.length-1].populate();
    }
  }

  pause = new Game_Menu();
  frameRate(60);
  createCanvas(w, h);
  colorMode(HSB);
  //noStroke();
  consumer = new Settler(250, mouseX, mouseY);


}

function draw() {

  if (pause.pause == false){
    colorMode(RGB);
    background(0,0,0,50);
    //background(0);
    colorMode(HSB);
    //consumer.display();
    //consumer.motionTest();
    //consumer.dispGraph();
    //for (var i = 0; i<cells.length; i++){
      //cells[i].show();
      //cells[i].occ_test(consumer.r_sz);

    //}
    consumer.display();
    for (var i = 0; i<trees.length; i++){
    trees[i].occ_test(consumer.r_sz);}

    for (var i = 0; i<trees.length; i++){
    trees[i].display();
  }

  }
  pause.menu();

  //background(50, 89, 100);

//  if (mouseIsPressed){
//    trees.push(new Tree(mouseX, mopuseY, 60, 80, 250));
//    trees[trees.length-1].populate();
//  }

  //if (keyIsPressed){
  //  for (var i = 0; i<trees.length; i++){
  //  trees[i].reduce();
  //  }
  //}



  //for (var i=0; i<trees.length; i++) {
  //  trees[i].move();
  //  trees[i].display();
  //}
}

// Treeclass
function Tree(x, y, s, num, len) { ///x,y,startsize , number of steps, length
  this.Start_x = x;
  this.Start_y = y;
  this.diameter = random(8, 9);
  this.Start_sz = s;
  this.num = num; // this is how many circles
  this.T_sz = len; // this is how big the start size is
  this.xlocs = [];
  this.ylocs = [];
  this.sizes = [];

  //this.sml_rate =
  this.scaler = (this.T_sz/this.num)  // this is the scale factor

////////////////////


  this.last_x;
  this.last_y;
  this.last_sz;


///////////////////

this.reduce = function(){
  this.xlocs.pop();
  this.ylocs.pop();
  this.sizes.pop();
}


//this.occ_test = function(range) {
//  if (this.sizes.length > 1){
//    if (dist(this.Start_x,this.Start_y,mouseX,mouseY)<range) {
//      this.xlocs.pop();
//      this.ylocs.pop();
//      this.sizes.pop();
//    }
//  }
//}

////////////////////////////////////////
this.occ_test = function(range) {

  if (dist(this.Start_x,this.Start_y,mouseX,mouseY)<range) {
    if (this.sizes.length > 2){
      this.xlocs.pop();
      this.ylocs.pop();
      this.sizes.pop();
    }
  }
  else{
    if(this.sizes.length < this.num){
      var len = this.xlocs.length-1;
      last_x = [this.xlocs[len][0],this.xlocs[len][1],this.xlocs[len][2],this.xlocs[len][3]];
      last_y = [this.ylocs[len][0],this.ylocs[len][1],this.ylocs[len][2],this.ylocs[len][3]];
      last_sz = this.sizes[len];

      this.xlocs.push([last_x[0] +random(0,last_sz*.3), last_x[1] -random(0,last_sz*.3), last_x[2] +random(0,last_sz*.3),last_x[3] -random(0,last_sz*.3)]);
      this.ylocs.push([last_y[0] +random(0,last_sz*.3), last_y[2] -random(0,last_sz*.3), last_y[2] -random(0,last_sz*.3),last_y[3] +random(0,last_sz*.3)]);
      this.sizes.push(last_sz * 0.9);
  }
}
}



///////////////////////////////////////

this.populate = function() {
  var last_x = [this.Start_x,this.Start_x,this.Start_x,this.Start_x];
  var last_y = [this.Start_y,this.Start_y,this.Start_y,this.Start_y];
  var last_sz = this.Start_sz;
  //var new_dist = start_dist;
  for (var i = 1; i< this.num; i++) {

      this.xlocs[i] = [last_x[0] +random(0,last_sz*.3), last_x[1] -random(0,last_sz*.3), last_x[2] +random(0,last_sz*.3),last_x[3] -random(0,last_sz*.3)];
      this.ylocs[i] = [last_y[0] +random(0,last_sz*.3), last_y[2] -random(0,last_sz*.3), last_y[2] -random(0,last_sz*.3),last_y[3] +random(0,last_sz*.3)];
      //this.sizes[i] = [];


      //this.xlocs[i] = last_x += random(0,last_sz*.3);
      //this.ylocs[i] = last_y += random(-last_sz*.3,last_sz*.3);
      this.sizes[i] = last_sz * 0.9;/// rate of decrease
      last_x = this.xlocs[i];
      last_y = this.ylocs[i];
      last_sz= this.sizes[i];
      //ellipse(this.xlocs[i], this.ylocs[i],this.sizes[i],this.sizes[i]);
    //  translate(last_x*new_dist, last_y*new_dist)
    //  rotate(radians(random(-5,5)))
      ////////Imaging a move vector rotate situation/////

      ///////////////////////////////////////////////////
    }

  }
this.display = function() {
  //var col = [color(20,200,30),color(100,30,100),color(200,100,50),color(230,20,150)];
  var col = [color(100,52,35),color(133,52,35),color(166,52,35),color(200,52,35)];
  for (var i = 2; i< this.xlocs.length; i++){

    for (var j = 0; j<4; j++){
      //print(j, this.xlocs[i][j]);
      fill(col[j]);
      ellipse(this.xlocs[i][j], this.ylocs[i][j],this.sizes[i],this.sizes[i]);
    }

  }
}
  //this.move = function() {
  //  this.x += random(-this.speed, this.speed);
  //  this.y += random(-this.speed, this.speed);
  //};

  //this.display = function() {
  //  ellipse(this.x, this.y, this.diameter, this.diameter);
  //};
}

function keyPressed(){
    if (keyCode === LEFT_ARROW){
      for (var i = 0; i<trees.length; i++){
      trees[i].reduce();
      }
    }
}

function mouseClicked(){
  trees.push(new Tree(mouseX, mouseY, 20, 80, 250));
  trees[trees.length-1].populate();
}

function Settler(r,x,y){
    this.r_sz = r;
    this.lX = x;
    this.lY = y;
    this.changeRate = 100;

    this.display = function() {
        colorMode(HSB);
       fill(0,0,7);
       //fill(map(this.r_sz,0,1000,40,0),64,50)
        ellipse(mouseX, mouseY, this.r_sz,this.r_sz);
    }

    this.motionTest = function(){
        change = dist(this.lX,this.lY,mouseX,mouseY);
        this.lX = mouseX;
        this.lY = mouseY;
        if (change < 4){
            this.r_sz += 1;
        }
        else{this.r_sz = this.r_sz-4;}

    }

    this.dispGraph = function(){
        colorMode(HSB);
        centX = disp_w/2;
        centY = disp_w/2;
        eSz = (disp_w*.75)

        stroke(0);
        fill(map(this.r_sz,0,1000,40,0),64,50);
        ellipse(centX,centY,disp_w*.75,disp_w*.75);
        stroke(2);
        line(centX, centY, disp_w/2+(eSz/2), centY);
        stroke(0);
        fill(240);
        ellipse(centX,centY,4,4);
        ellipse(centX+(eSz/2), centY,4,4);

        val = map(this.r_sz,0,1000,0 ,eSz/2)
        ellipse(centX+val,disp_w/2,4,4);
        textSize(18);
        textAlign(CENTER);
        text(this.r_sz,centX+val,(disp_w/2)-10);
    }
}

function Game_Menu(){
    this.pause = false;
    this.menu = function(){
        if (this.pause == true){
            fill(0);
            rectMode(CENTER);
            rect(w/2,h/2,500,250);
            fill(240);
            textAlign(CENTER);
            textSize(60);
            text("paused",w/2,h/2);
        }
    }

    this.pauseToggle = function(){
        if (this.pause == false){this.pause = true;}
        else{this.pause = false;}
    }
}

function  keyTyped() {
    if (key === "p"){
        pause.pauseToggle();
        pause.menu();
    }
}


//function mousePressed(){
//  trees.push(new Tree(mouseX, mouseY, 1, 15));
//}
