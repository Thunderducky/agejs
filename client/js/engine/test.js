// Initialize JS Engine with normal loads, and pass along the texture atlas
// if necessary
import GreySheet from "../asset_data/grey_sheet.json"
import BlueSheet from "../asset_data/blue_sheet.json"

import { loadAsset } from "./core/asset_loader"
// import { SceneNode } from "./core/scene_node"
import { Engine } from "./engine"
import { State } from "./core/state_management"
// import { RectangleBounds } from "./core/bounds"
// import { Panel } from "./panel"
// import { Button } from "./button"
// import { GameText } from "./core/game_text"


const canvas = document.getElementById("test");
const engine = new Engine(canvas);
let atlases;

function createLoadState(nextState,cb){
  const loadState = new State();
  loadState.onEnter = function(){
    var me = this;
    Promise.all([
      loadAsset(GreySheet),
      loadAsset(BlueSheet)
    ]).then((atlases) => {
      console.log("woo");
      cb(atlases);
      console.log(me);
      me.manager.setNext(nextState);
    });
  }
  return loadState;
}

function buildAndRun(
  nextState,
  cb = (atlases) => {
    console.log("Loaded")
  }
){
  const loadState = createLoadState(nextState,cb);
  engine.stateManager.setNext(loadState)
  engine.start();
}

export { buildAndRun, createLoadState }
