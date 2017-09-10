// Let's draw a couple things from a scene graph
import BlueSheet from "../asset_data/blue_sheet.json"
import loadAtlas from "./asset_loader"
import SceneNode from "./scene_node"
import { Texture, drawTexture } from "./texture";
import Panel from "./panel"
import Button from "./button"

const canvas = document.getElementById("test");
const ctx = canvas.getContext("2d");
const NONE = undefined;

const TL = {x:0,y:0};
Object.freeze(TL);

const drawText = (ctx, text, textStyle, font = "48px veranda") => {
  ctx.font = font;
  ctx.fillStyle = textStyle;
  ctx.fillText(text, 0, 0);
};

const rootNode = new SceneNode();

function renderGraph(node){
  ctx.save();
  ctx.translate(node.translation.x, node.translation.y);
  ctx.rotate(node.rotation);
  ctx.scale(node.scale.x, node.scale.y);

  if(node.texture && node.visible){
    drawTexture(ctx, node.texture, node.offset);
  }
  if(node.text && node.visible){
    drawText(ctx, node.text, node.textStyle)
  }
  if(node.children && node.visible){
    node.children.forEach(child => renderGraph(child));
  }
  ctx.restore();
}

// nodes will go in a dfs traversal
var count = 0;
function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  renderGraph(rootNode);
  //
  // ctx.save();
  //
  // ctx.strokeStyle = "black";
  // ctx.font = "90px veranda";
  // ctx.lineWidth = 2;
  //
  // ctx.strokeText("Test Text", 100, 100);
  //
  // ctx.restore()
  count++;
  if(count % 300 === 0){
    button.toggle();
  }
}
let button = null;
loadAtlas(BlueSheet).then((atlas)=>{
  // let baseTexture = atlas.get("blue_panel")
  // we're going to build a special panel
  // we can give the size we want in order to use it
  rootNode.translation.x = 0;
  rootNode.translation.y = 0;

  button = new Button([
    atlas.get("blue_button00"),
    atlas.get("blue_button01")
  ]);
  rootNode.addChild(button.node);
  button.node.offset = {x:1, y:1};
  button.node.translation = {x:250, y:50};

  // let panel = new Panel(atlas.get("blue_panel"), 500, 500);
  // panel.panelNode.translation.x = 5;
  // panel.panelNode.translation.y = 5;
  // rootNode.addChild(panel.panelNode);

  // let textNode = new SceneNode(rootNode);
  // textNode.text = "Test Text";
  // textNode.textStyle = "white";
  // textNode.translation.x += 50;
  // textNode.translation.y += 50;

  // Let's build a button!
  //draw();


  setInterval(draw,1);
});
