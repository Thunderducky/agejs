// TODO: Create LogicLoop and Animation Loop

function getTime(){
   return window.performance.now();
}
const noop = () => {};
// uses request animation frame, might split out another loop if necessary
class Loop{
  constructor(onLoop = noop){
    this.onLoop = onLoop;
    this.breakLoop = false;
    this.startTime = getTime();
    this.lastTime = getTime();
    this._loop = this._loop.bind(this);
  }
  _loop(){
    // Loop is broken, we are done
    if(this.breakLoop){
      return;
    }
    const currentTime = getTime();
    // time since last frame and time since start
    this.onLoop(currentTime - this.lastTime, currentTime - this.startTime);
    window.requestAnimationFrame(this._loop);
    this.lastTime = currentTime;
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

export { Loop }
