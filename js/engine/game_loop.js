// TODO: Create LogicLoop and Animation Loop

function getTime(){

}

// uses request animation frame
class RenderLoop{
  constructor(onLoop = function(){}){
    this.onLoop = onLoop;
    this.breakLoop = false;
  }
  _loop(){
    // Loop is broken, we are done
    if(this.breakLoop){
      return;
    }
    this.onLoop();
    window.requestAnimationFrame(this._loop);
  }

  start(){
    this.breakLoop = false;
    this._loop();
    return this;
  }
  stop(){
    this.breakLoop = true;
    return this;
  }
}
// Maybe add an animation control loop or something, i dunno
