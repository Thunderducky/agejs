// Let's draw a couple things from a scene graph
import BlueSheet from "../asset_data/blue_sheet.json"
import loadAtlas from "./asset_loader"
import SceneNode from "./scene_node"
import { Texture, drawTexture } from "./texture";
import Panel from "./panel"

const canvas = document.getElementById("test");
const ctx = canvas.getContext("2d");
const NONE = undefined;

const TL = {x:0,y:0};
Object.freeze(TL);

const rootNode = new SceneNode();

function renderGraph(node){
  ctx.save();
  ctx.translate(node.translation.x, node.translation.y);
  ctx.rotate(node.rotation);
  ctx.scale(node.scale.x, node.scale.y);

  if(node.texture && node.visible){
    drawTexture(ctx, node.texture, node.offset);
  }
  if(node.children){
    node.children.forEach(child => renderGraph(child));
  }
  ctx.restore();
}

// nodes will go in a dfs traversal
function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  renderGraph(rootNode);
}


loadAtlas(BlueSheet).then((atlas)=>{
  // let baseTexture = atlas.get("blue_panel")
  // we're going to build a special panel
  // we can give the size we want in order to use it
  rootNode.translation.x = 0;
  rootNode.translation.y = 0;


  let panel = new Panel(atlas.get("blue_panel"), 500, 50);
  panel.panelNode.translation.x = 5;
  panel.panelNode.translation.y = 5;
  rootNode.addChild(panel.panelNode);

  draw();
  //setInterval(draw,1);
});
