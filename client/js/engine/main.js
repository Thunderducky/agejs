import GreySheet from "../asset_data/grey_sheet.json"
import BlueSheet from "../asset_data/blue_sheet.json"
import loadAtlas from "./core/asset_loader"
import {SceneNode} from "./core/scene_node"
import Engine from "./engine"
import { State } from "./core/state_management"
import { RectangleBounds } from "./core/bounds"
import { Panel } from "./panel"
import { Button } from "./button"
import { GameText } from "./core/game_text"

const canvas = document.getElementById("test");
const engine = new Engine(canvas);

const loadState = new State();
const renderState = new State();

const newNode = new SceneNode();
let panel = null;
let text = null;
let button = null;
loadState.onEnter = function(){
  const me = this;
  const systems = me.manager.systems;
  const root = systems.scene_graph;
  Promise.all([loadAtlas(GreySheet), loadAtlas(BlueSheet)])
  .then((atlases)=>{
    const [greyAtlas, blueAtlas] = atlases;
    const panelTexture = greyAtlas.get("grey_panel");
    panel = new Panel(panelTexture, 600, 600);

    const btnTexture = blueAtlas.get("blue_button00");
    button = new Button({
      up: btnTexture,
      down: blueAtlas.get("blue_button01")
    }, {
      width: 190,
      height: 49
    }, new GameText("Click me!"), () => {
      console.log("WOO");
    })

    button.node.translation.x = 100;
    button.node.translation.y = 100;

    // root.node.translation.x = 10;
    // root.node.translation.y = 10;
    root.translation.x = 100;
    root.translation.y = 100;
    root.addChild(panel.node);
    panel.node.translation.x = 10;
    panel.node.translation.y = 10;

    root.addChild(button.node);
    button.node.id = "btntest";
    const newNode = new SceneNode();
    newNode.text = new GameText("test", "blue", "30px Arial")
    root.addChild(newNode);
    
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
