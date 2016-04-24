

function sketchTest ( sketch ) {

    var x =100;
    var y = 100;

    var w = 500;
    var h = 500;

    var len = 20;
    var objs = [len]
    sketch.setup = function() {

        sketch.createCanvas(w, h);
        var i = 0
        for (var x = 0; x< w; x+=(w/(len/2))){
          for (var y = 0; y< h; y+=(h/(len/(len/2)))){
            objs[i] = new sketch.Object(x,y,20);
            i+=1;
          }
        }

    }

    sketch.draw = function() {

        //sketch.background(0);
        sketch.fill(255);
        //sketch.rect(x,y,50,50);
        for (var i = 0; i<objs.length;i++){
          objs[i].display();
        }
        sketch.fill(24,64,207);
        sketch.rect(p5.mouseX,p5.mouseY,40,40);

      }

    sketch.Object = function(x,y,z){
      this.x = x;
      this.y = y;
      this.sz = z;

      this.display = function(){
        sketch.fill(244);
        sketch.rect(this.x,this.y,this.sz,this.sz);
      }
    }

}
