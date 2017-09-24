// Let's draw a couple things from a scene graph
import BlueSheet from "../asset_data/blue_sheet.json"
import loadAtlas from "./asset_loader"
import { SceneNode, traverseGraph} from "./scene_node"
import { Texture, drawTexture } from "./texture"
import Panel from "./panel"
import Button from "./button"
import { between, last} from "./utils"
import { Transform, nodeTransform} from "./transform"
import { RectangleBounds } from "./bounds"
const canvas = document.getElementById("test");
const ctx = canvas.getContext("2d");

const lastClick = {x:0,y:0, handled: true}

function draw(){ // RENDER AND PROCESS UI EVENTS
  let buttonClicked = false;
  const transformStack = [new Transform()];
  ctx.clearRect(0,0, canvas.width, canvas.height);

  traverseGraph(rootNode,
  (node) => {
    ctx.save();
    ctx.translate(node.translation.x, node.translation.y);
    ctx.rotate(node.rotation);
    ctx.scale(node.scale.x, node.scale.y);
    // Update our current transform and push it onto the list
    const currentTransform = last(transformStack).multiply(nodeTransform(node));
    transformStack.push(currentTransform);

    const transferred = currentTransform.invert().transformPoint(lastClick.x, lastClick.y)
    // I don't think we've handled offset
    //last(transformStack).print();
    if(!lastClick.handled){
      if(node.bounds &&
          node.bounds.contains(
            transferred
          )
      ){
        buttonClicked = true;
      }
    }

    if(node.texture && node.visible){
      drawTexture(ctx, node.texture, node.offset);
    }

    return true;
  },
  (node) => {
    ctx.restore();
    transformStack.pop();
  });

  if(buttonClicked){
    console.log("You clicked the button!");
    buttonClicked = false;
  }

  lastClick.handled = true;
}

const rootNode = new SceneNode();
loadAtlas(BlueSheet).then((atlas)=>{
  rootNode.translation.x = 400;
  rootNode.translation.y = 80;
  rootNode.rotation = Math.PI/8
  const texture = atlas.get("blue_button00");
  rootNode.offset = {x:1, y:0};
  rootNode.bounds = new RectangleBounds(
    texture.width, texture.height, rootNode.offset
  );
  rootNode.texture = texture;
  setInterval(draw,1);
});

canvas.onclick = (e) => {
  const rect = canvas.getBoundingClientRect()
  lastClick.x = e.clientX - rect.left;
  lastClick.y = e.clientY - rect.top;
  lastClick.handled = false;
};
