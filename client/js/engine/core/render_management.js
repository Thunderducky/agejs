import { drawTexture } from "./texture"
import { drawText } from "./game_text"
class RenderManager {
  constructor(ctx){
    this.ctx = ctx; // Canvas 2D context
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
}

export { RenderManager }
