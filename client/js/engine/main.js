// Let's draw a couple things from a scene graph
// import { SceneNode, traverseGraph} from "./scene_node"
// import { Texture, drawTexture } from "./texture"
// import Panel from "./panel"
// import Button from "./button"
// import { between, last} from "./utils"
// import { Transform, nodeTransform} from "./transform"
// const canvas = document.getElementById("test");
// const ctx = canvas.getContext("2d");

// const rootNode = new SceneNode();
// loadAtlas(BlueSheet).then((atlas)=>{
//   rootNode.translation.x = 400;
//   rootNode.translation.y = 80;
//   rootNode.rotation = Math.PI/8
//   const texture = atlas.get("blue_button00");
//   rootNode.offset = {x:1, y:0};
//   rootNode.bounds = new RectangleBounds(
//     texture.width, texture.height, rootNode.offset
//   );
//   rootNode.texture = texture;
//   setInterval(function(){
//     ui();
//     update();
//   },1);
// });

import GreySheet from "../asset_data/grey_sheet.json"
import BlueSheet from "../asset_data/blue_sheet.json"
import loadAtlas from "./core/asset_loader"
import {SceneNode} from "./core/scene_node"
import Engine from "./engine"
import { State } from "./core/state_management"
import { RectangleBounds } from "./core/bounds"
import Panel from "./panel"
import Button from "./button"
import { GameText } from "./core/game_text"

const canvas = document.getElementById("test");
const engine = new Engine(canvas);

const loadState = new State();
const renderState = new State();

const newNode = new SceneNode();
let panel = null;
let text = null;

loadState.onEnter = function(){
  const me = this;
  const systems = me.manager.systems;
  const root = systems.scene_graph;
  Promise.all([loadAtlas(GreySheet), loadAtlas(BlueSheet)])
  .then((atlases)=>{
    const [greyAtlas, blueAtlas] = atlases;
    const panelTexture = greyAtlas.get("grey_panel");
    panel = new Panel(panelTexture, 600, 600);
    root.addChild(panel.node);
    panel.node.translation.x = 10;
    panel.node.translation.y = 10;

    const newNode = new SceneNode();
    newNode.translation.x = 10;
    newNode.translation.y = 30;
    newNode.text = new GameText("test", "blue", "30px Arial")
    panel.node.addChild(newNode);

    me.manager.setNext(renderState);
  });

};

loadState.onUpdate = () => {
  console.log("loading");
};


renderState.onEnter= () => {
  console.log("drawing");
};

renderState.onUpdate= () => {

};

engine.stateManager.setNext(loadState)

engine.start();
