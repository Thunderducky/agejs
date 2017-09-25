import { Transform, nodeTransform} from "./transform"
import { between, last} from "./utils"

class InputManager {
  constructor(canvas){
    this.lastClick = {
      x:0,
      y:0,
      handled:true
    }
    this.clickedItems = [];
    this._transformStack = [new Transform()];

    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect()
      this.lastClick.x = e.clientX - rect.left;
      this.lastClick.y = e.clientY - rect.top;
      this.lastClick.handled = false;
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
  reset(){
    this.lastClick.handled = true;
    this.clickedItems.length = 0;
    this._transformStack.length = 0; // remove all except the first
    this._transformStack.push(new Transform());
  }
}

export { InputManager }
