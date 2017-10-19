import { buildAndRun } from "./test.js"
import { State } from "./core/state_management"
import { SceneNode } from "./core/scene_node"
import { GameText } from "./core/game_text"
import { Monitor } from "./core/monitor"
import { RectangleBounds } from "./core/bounds"
import { transformToString } from "./core/transform";

let atlases = null;
const test = new State();

let tex1 = null;
let tex2 = null;

// Let's build a small clickable
const clickableParent = new SceneNode();
const clickable = new SceneNode(clickableParent);


// This will run before onEnter/onUpdate/onExit
buildAndRun(test, (_atlases) => {
  atlases = _atlases;
  console.log(atlases);
  const [greyAtlas, blueAtlas] = atlases;
  tex1 = blueAtlas.get("blue_button00");
  tex2 = blueAtlas.get("blue_button01");
  // Offsets need to work the same
  clickable.bounds = new RectangleBounds(tex1.width,tex1.height, {x:0.5, y:0.5});
  clickable.texture = tex1;

  clickable.id = "clickable";
  clickable.onclick = function(){
    console.log("clicked");
  }
  clickableParent.translation = {x: 300, y: 50};
  clickableParent.rotation = 0.5;
  clickableParent.scale.x = 0.5;
  clickableParent.scale.y = 0.5;
  clickable.translation.x = 400;
  clickable.rotation = -0.5;
  clickable.scale.x = 0.5;
  //clickableParent.rotation = 10;
})

test.updateList = [];
test.onEnter = function(stepTime, totalTime){
  // Let's build a scene node and draw that one
  const input_manager = this.manager.systems.input_manager
  const root = this.manager.systems.scene_graph;

  root.addChild(clickableParent);

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

  this.updateList = this.updateList.concat([mouseMonitor, clickMonitor])
}

test.onUpdate = function(stepTime, totalTime){
  this.updateList.forEach((entry) => entry.update(stepTime, totalTime));
}
test.onExit = function(){

}

// Let's try using our test file
