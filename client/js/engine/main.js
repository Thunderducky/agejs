import buildAndRun from "./test.js"
import { State } from "./core/state_management"
import { SceneNode } from "./core/scene_node"
import { GameText } from "./core/game_text";
// import { Timer, TimerManager } from './core/timer_management'
//
// const tm = new TimerManager();

let atlases = null;
const test = new State();

let tex1 = null;
let tex2 = null;
// Let's make a button!

// this is a ui monitor, we can also make a console version, later
class Monitor {
  constructor(){
    this.target = null;
    this.node = new SceneNode();
    this.node.text = new GameText("Monitor");
    this.stringer = () => {};
  }
  init(parentNode, target, stringer = (target) => { return target.toString(); }){
    this.target = target;
    this.stringer = stringer;
    parentNode.addChild(this.node);
    return this;
  }
  update(stepTime, gameTime){
    this.node.text.text = this.stringer(this.target);
  }
}

// Build pieces as "builders" that add pieces to a class?

// This will run before onEnter/onUpdate/onExit
buildAndRun(test, (_atlases) => {
  atlases = _atlases;
  console.log(atlases);
  const [greyAtlas, blueAtlas] = atlases;
  tex1 = blueAtlas.get("blue_button00");
  tex2 = blueAtlas.get("blue_button01");
})
test.updateList = [];

test.onEnter = function(stepTime, totalTime){
  // Let's build a scene node and draw that one
  const input_manager = this.manager.systems.input_manager
  const root = this.manager.systems.scene_graph;
  const mouseMonitor = new Monitor().init(
    root, input_manager.mousePosition,
    (mp) => `Mouse Position: ${mp.x}, ${mp.y}`
  );
  const clickMonitor = new Monitor().init(
    root, input_manager.lastClick,
    (lc) => `Last Click: ${lc.x}, ${lc.y}`
  );
  // Set it's position
  mouseMonitor.node.translation = {x: 5, y: 16};
  clickMonitor.node.translation = {x: 5, y: 16 * 2 + 5};
  this.updateList.push(mouseMonitor);
  this.updateList.push(clickMonitor);
}

test.onUpdate = function(stepTime, totalTime){
  this.updateList.forEach((entry) => entry.update(stepTime, totalTime));
}
test.onExit = function(){

}

// Let's try using our test file
