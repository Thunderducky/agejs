import { Transform, nodeTransform} from "./transform"
import { between, last} from "./utils"

class InputManager {
  constructor(canvas){
    this.lastClick = {
      x:0,
      y:0,
      handled:true
    },
    this.mousePosition = {
      x:0,
      y:0
    }
    this.clickedItems = [];
    this._transformStack = [new Transform()];

    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect()
      this.lastClick.x = e.clientX - rect.left;
      this.lastClick.y = e.clientY - rect.top;
      this.lastClick.handled = false;
    }
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect()
      this.mousePosition.x = e.clientX - rect.left;
      this.mousePosition.y = e.clientY - rect.top;
    }

    // We are listening on the canvas
    this.canvas = canvas;
    console.log(this._transformStack);
  }
  onNode(node){
    if(this.lastClick.handled){
      return;
    }
    const nodeMatrix = nodeTransform(node);
    const matrix = last(this._transformStack);

    const nextMatrix = matrix.multiply(nodeMatrix);

    const mouseToPoint = nextMatrix.invert();
    const transferred = mouseToPoint.transformPoint(this.lastClick.x, this.lastClick.y);
    //console.log(`You clicked at ${transferred.x}, ${transferred.y}`);
    if(node.id == "btntest"){
      console.log(this.lastClick);
      console.log(transferred);
      console.log(node.bounds);
    }

    if(node.bounds && node.bounds.contains(transferred)){
      this.clickedItems.push(node);
      console.log(this.clickedItems);
    }

    this._transformStack.push(nextMatrix);
  }
  afterNode(node){
    if(this.lastClick.handled){
      return;
    }
    this._transformStack.pop();
  }

  processInput(){
    while(this.clickedItems.length > 0){
      console.log("OH NO ROBOTS");
      const item = this.clickedItems.pop();
      if(item.onclick && !item.onclick()){
        break;
      }
    }
    this.clickedItems.length = 0;
  }

  reset(){
    this.lastClick.handled = true;
    this.clickedItems.length = 0;
    this._transformStack.length = 0; // remove all except the first
    this._transformStack.push(new Transform());
  }
}

export { InputManager }
