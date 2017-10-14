import { drawTexture } from "./texture"
import { drawText } from "./game_text"
class RenderManager {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); // Canvas 2D context
  }
  onNode(node){
    this.ctx.save();
    this.ctx.translate(node.translation.x, node.translation.y);
    this.ctx.rotate(node.rotation);
    this.ctx.scale(node.scale.x, node.scale.y);

    if(node.visible){
      if(node.texture){
        drawTexture(this.ctx, node.texture, node.offset);
      }
      if(node.text){
        drawText(this.ctx, node.text);
      }
    }

  }
  afterNode(node){
    this.ctx.restore();
  }
  clear(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
  }
}

export { RenderManager }
