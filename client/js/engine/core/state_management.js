const noop = () => {}

class State {
  constructor(manager){
    this.manager = manager;
    this.onEnter = noop;
    this.onUpdate = noop;  // Function to run during the state
    this.onExit = noop;
  }
}

class StateManager {
  constructor(systems){
    this.systems = systems;
    this._currentState = new State();
    this._nextState = null;
  }
  setNext(state){
    state.manager = this;
    this._nextState = state;
  }
  update(){
    if(this._nextState){
      this._currentState.onExit();
      this._nextState.onEnter();
      this._currentState = this._nextState;
      this._nextState = null;
    }
    this._currentState.onUpdate();
  }
}

export { State, StateManager}
