function ColorGrid (sketch){

var w = 2000;
var h = 1000;
var div = 50;
var sz = 15;
sketch.setup = function() {
  //print("starting...");
  sketch.createCanvas(w, h);
  //print("done setup");
}

sketch.draw = function() {
  sketch.background(0);
	for (var x=0; x<(w); x+=div){
    //print(x);
    for (var y=0; y<(h); y+=div){
      //print(y);
      //fill(map(y,0,h,0,240));
      //fill(map(y,0,h,0,240), map(x,0,w,0,240), map(mouseY,0,w,100,200));
        sketch.fill(sketch.map(y,0,h,0,240), sketch.map(sketch.mouseX,0,w,100,200), sketch.map(sketch.mouseY,0,h,100,200));


        if(sketch.dist(x,y,sketch.mouseX,sketch.mouseY)>300){
            sketch.fill(sketch.map(y,0,h,0,240), sketch.map(sketch.mouseX,0,w,100,200), sketch.map(sketch.mouseY,0,h,100,200));
            sketch.rect(x, y, sz, sz);
        }
        else{
          sketch.fill(sketch.map(y,0,w,0,240),sketch.map(x,0,h,0,240),sketch.map(sketch.mouseY,0,w,100,220));
          sketch.ellipse(x,y,sz*1.2,sz*1.2);
        }

        //line(mouseX,mouseY,x,y);
      //print("running",x,"-",y);
    }
  }

  //print("Done Running ...................");
}

}
