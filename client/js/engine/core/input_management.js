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
    //console.log(this._transformStack);
  }
  onNode(node){
    if(this.lastClick.handled){
      return;
    }
    const nodeMatrix = nodeTransform(node);
    // We need to make copies and not invert them
    const matrix =
      last(this._transformStack)
        .copy()
        .multiply(nodeMatrix);

    const mouseToPoint = matrix.copy().invert();
    const transferred = mouseToPoint.transformPoint(this.lastClick.x, this.lastClick.y);



    if(node.bounds && node.bounds.contains(transferred)){
      this.clickedItems.push(node);
    }

    if(node.id == "test"){
      console.log(transferred);
      console.log(this.clickedItems);
    }



    this._transformStack.push(matrix);
  }
  afterNode(node){
    if(this.lastClick.handled){
      return;
    }
    this._transformStack.pop();
  }

  processInput(){
    while(this.clickedItems.length > 0){
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
