/*
  Our traversal, transform seems to be running into issues, so we're going to iron out the kinks
  we're going to start with translation and work on it from there
*/
import { SceneNode, traverseGraph } from "./core/scene_node"
import { Transform, nodeTransform, printTransform} from "./core/transform"
import { last } from "./core/utils"
const root = new SceneNode();
root.id = "root";
root.translation.x = 100;
root.translation.y = 100;
root.rotation = Math.PI/2;
//root.scale.x = 2;
//root.scale.y = 2;
// const child = new SceneNode(root);
// child.id = "child";
// child.translation.x = 10;
// child.translation.y = 10;
// const child2 = new SceneNode(root);
// child2.id = "child2";
// const grandchild = new SceneNode(child);
// grandchild.id = "grandchild";

// Let's build our transformation network, woo!

const transformStack = [];
transformStack.push(new Transform());

function graph(){
traverseGraph(root, (node)=>{
  // printNode(node);
  let t = nodeTransform(node, last(transformStack));
  // printTransform(t);
  // console.log("inverse");
  // printTransform(t.invert())
  transformStack.push(t);
  if(node.id == "root"){
    const inv = t.invert();
    const point = inv.transformPoint(x, y);
    console.log(`
        Inverse of ${x},${y}:
        ${point.x}, ${point.y}
      `)
    printTransform(inv);
  }
  return true;
}, (node) => {
  //printNode(node);
  transformStack.pop();
});
}


const transform = new Transform();

function printNode(node){
  console.log(
    `
      node: ${node.id}
      translation: ${node.translation.x}, ${node.translation.y}
      rotation: ${node.rotation} radians
      scale: ${node.scale.x}, ${node.scale.y}
    `
  )
}
let x = 0;
let y = 0;
const canvas = document.getElementById("test");
canvas.onmousemove = function(e){
  x = e.x;
  y = e.y;
}

canvas.onclick = function(e){
  console.log(x, y);
  graph();
}
