class Timer {
  constructor(endTime, onDone){
    this.endTime = endTime;
    this.onDone = onDone;
    this.isDone = false;
    this.overStep = 0;
  }
  update(totalTime){
    if(this.isDone){
      return;
    }
    if(totalTime >= this.endTime){
      this.overStep = totalTime - this.endTime;
      this.isDone = true;
    }
  }
}

class TimerManager {
  constructor(currentTime = window.performance.now()){
    this.timers = [];
    this.lastTime = currentTime;
  }

  update(stepTime, totalTime){
    this.timers.forEach(timer => timer.update(totalTime))
    const resolveTimers = this.timers.filter(timer => timer.isDone);
    this.timers = this.timers.filter(timer => !timer.isDone);

    // This guarantees timer order
    resolveTimers.sort((a,b,) => a.endTime - b.endTime);
    resolveTimers.forEach(timer => timer.onDone(timer.overStep));

    this.lastTime = totalTime;
  }

  addTimerRelative(time, cb){
    const t = new Timer(this.lastTime + time, cb);
    this.timers.push(t);
    return t;
  }

  addTimerAbsolute(time){
    const t = new Timer(time, cb)
    this.timers.push(t);
    return t;
  }
}

export { Timer, TimerManager }
