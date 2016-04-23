//////////////////////////////////////


var things = [];
var num_things = 100;


//////////////////////////////////////

var w = 2000;
var h = 1000;
var div = 30;
var sz = 4;
var disp_w = 300;
var range = 250;
var consumer;
var cells = [];

var pause; 

function setup() {
    pause = new Game_Menu();
    frameRate(60);
    createCanvas(w, h);
    colorMode(HSB);
    noStroke();
    consumer = new Settler(250, mouseX, mouseY);
    for (var x=disp_w; x<(w); x+=div){
        for (var y=0; y<(h); y+=div){
            cell = new Cells_objs(x,y,100,15);
            cells.push(cell);
        }
    }
    ///////////////////////////////
    for(var i = 0;i < num_things ;i++) {
        things.push(new Thing() );
    }
    
    ///////////////////////////////
    
}

function draw() {
    
    if (pause.pause == false){
        colorMode(RGB);
        background(0,0,0,10);
        colorMode(HSB);
        consumer.display();
        consumer.motionTest();
        consumer.dispGraph();
        for (var i = 0; i<cells.length; i++){
            cells[i].show();
            cells[i].occ_test(consumer.r_sz);
        }
    }
    pause.menu();

    //////////////////////////////////////
    for(var i = 0;i < things.length;i++) {
        things[i].update();
        things[i].display();
    }
/////////////////////////////////


}

function Cells_objs(x,y,b,sz) {
    this.x = x;
    this.y = y;
    this.b = b;
    this.sz = sz;
    this.h = random(80,143);
    this.step = 1; 
    //map(mouseY,0,h,100,0)
      
    this.show = function(){
        this.H_jitter();
        fill(this.h,100,this.b/2);
        rect(this.x-2-this.sz/2,this.y-2-this.sz/2,this.sz+4,this.sz+4)
        //fill(this.h,100,this.b);
        //ellipse(this.x,this.y,this.sz,this.sz);
     }
    this.occ_test = function(range) {
        if (this.b > 5){
            if (dist(this.x,this.y,mouseX,mouseY)<range) {
                this.b -= 3
            }
        }
        if (this.b < 100){
            this.b +=.3
        }
    }
    
    this.H_jitter = function(){
        this.step = random(-.5,.5);
        if (this.h+this.step>143){
            this.h-=this.step;
        }
        else if (this.h+this.step<80){
            this.h+=(this.step*(-1));
        }
        else{this.h+=this.step;}
    }
    
}

function Settler(r,x,y){
    this.r_sz = r;
    this.lX = x;
    this.lY = y;
    this.changeRate = 100;
    
    this.display = function() {
        colorMode(HSB);
       //fill(32,32,64);
       fill(map(this.r_sz,0,1000,40,0),64,50)
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

function Thing() {
    this.poit = new p5.Vector(200,200);
    this.move = new p5.Vector(-1,1);

    //this.fade = funtion(){}
    //this.ExpandThing = function(){}
    
    
    this.update = function() {
    if(mouseIsPressed) {
      this.poit = new p5.Vector(mouseX,mouseY);
    }
      //this.poit = new p5.Vector(mouseX,mouseY);
      this.move = new p5.Vector(random(-2,2),random(-2,2));
      this.poit.add(this.move);
  }
   
    this.display = function() {
        
        stroke(random(150,255),0,0,150);
        //point(this.poit.x,this.poit.y);
        rect(this.poit.x,this.poit.y,4,4);
    }
}



function Pointers(a,r,x,y){//start angle//radious//centerx//centery
  this.angle  = radians(a);
  this.R = r;
  this.centerX = x;
  this.centerY = y;

  this.xloc = this.centerY + sin(this.angle) * this.R;
  this.yloc = this.centerX + cos(this.angle) * this.R;
  
  this.rotate = function(step) { 
    this.angle += radians(step); 
    this.xloc = this.centerY + sin(this.angle) * this.R;
    this.yloc = this.centerX + cos(this.angle) * this.R;
  }
  
  this.display = function() { 
    fill(200,150,130);
    ellipse(this.xloc,this.yloc,50,50);
    
  }
  
  
}
