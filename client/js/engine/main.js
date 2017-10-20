import { buildAndRun } from "./test.js"

import { State } from "./core/state_management"
import { SceneNode } from "./core/scene_node"
import { GameText } from "./core/game_text"
import { Monitor } from "./core/monitor"
import { RectangleBounds } from "./core/bounds"
import { transformToString } from "./core/transform"

import { Button } from "./ui/button"
import { Panel } from "./ui/panel"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"

import { noop } from "./core/utils"

let atlases = null;
const test = new State();

let tex1 = null;
let tex2 = null;
let panelTex = null;
let label = null;
let check1 = null;
let check2 = null;
// This will run before onEnter/onUpdate/onExit
buildAndRun(test, (_atlases) => {
  atlases = _atlases;
  console.log(atlases);
  const [greyAtlas, blueAtlas] = atlases;
  tex1 = blueAtlas.get("blue_button00");
  tex2 = blueAtlas.get("blue_button01");
  panelTex = greyAtlas.get("grey_panel");
  check1 = blueAtlas.get("blue_boxCheckmark");
  check2 = blueAtlas.get("blue_boxCross");
});

// Let's make a TEXT BOOX BOIIIII
// Also something like a panel ain't bad
// Actually let's try that first

let button = null;
let panel = null;
let checkbox = null;
label = new Label("This is a Test");
checkbox = new Checkbox(true);
test.updateList = [];
test.onEnter = function(stepTime, totalTime){
  const root = this.manager.systems.scene_graph;

  const panel = new Panel();
  panel.init(panelTex, 500, 500);
  root.addChild(panel.node);

  label.init(panel.node);
  label.node.text.style = "blue";
  label.node.translation.x = 200;
  label.node.translation.y = 200;

  checkbox.init(panel.node, check1, check2);
  checkbox.node.translation.x = 200;
  checkbox.node.translation.y = 250;
  checkbox.node.offset = {x: 0, y: 0};

  checkbox.node.id = "test";
  checkbox.oncheck = () => console.log("check");
  checkbox.onuncheck = () => console.log("uncheck");

  const timer_manager = this.manager.systems.timer_manager;

  button = new Button(timer_manager);
  button.onpress = function(){
    this.textNode.text.text = "PRESSED"
  }
  button.onrelease = function(){
    this.textNode.text.text = "PRESSED";
  }
  // Let's build a scene node and draw that one
  const input_manager = this.manager.systems.input_manager


  button.init(panel.node, tex1, tex2, "A test!");
  button.node.translation.x = 100;
  button.node.translation.y = 200;




  const mouseMonitor = new Monitor().init(
    root, input_manager.mousePosition,
    (mp) => `Mouse Position: ${mp.x}, ${mp.y}`
  );
  const clickMonitor = new Monitor().init(
    root, input_manager.lastClick,
    (lc) => `Last Click: ${lc.x}, ${lc.y}`
  );
  const buttonMonitor = new Monitor().init(
    root, button,
    (b) => `Pressed: ${b.pressed}`
  )

  // Set it's position
  mouseMonitor.node.translation = {x: 5, y: 16};
  clickMonitor.node.translation = {x: 5, y: 16 * 2 + 5};
  buttonMonitor.node.translation = {x: 5, y: 16 * 3 + 5 * 2};
  this.updateList = this.updateList.concat([mouseMonitor, clickMonitor, buttonMonitor])
}

test.onUpdate = function(stepTime, totalTime){
  this.updateList.forEach((entry) => entry.update(stepTime, totalTime));
}
test.onExit = function(){

}

// Let's try using our test file
