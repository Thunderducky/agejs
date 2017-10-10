import { SceneNode } from './core/scene_node'
import { RectangleBounds } from './core/bounds'

// TODO: While being clicked, shouldn't allow it to be triggered
// TODO: Make more robust (clicked button respects mousedown, mousemove, etc)
const BUTTON_CLICK_TIME = 1000; // take a second

class Button {
    constructor(textures, dimensions, gameText, onClientClick){

      this.node = new SceneNode();
      this._clickable = true;
      this.countdownTime = 0;
      this.upNode = new SceneNode(this.node);
      this.upNode.texture = textures.up;

      this.downNode = new SceneNode(this.node);
      this.downNode.texture = textures.down;
      this.downNode.visible = false;

      this.node.bounds = new RectangleBounds(dimensions.width, dimensions.height);

      this.textNode = new SceneNode(this.node);
      // TODO: rename this terrible thing
      this.onclientclick = onClientClick;
      this.onclick = function(){
        if(!this._clickable){
          return false; // stop early
        }
        this._clickable = false;
        this.countdownTime = BUTTON_CLICK_TIME;
        this.upNode.visible = false;
        this.downNode.visible = true;
        this.onclientclick();

        return false;
      }
    }
    // TODO: Abstract this into timers, so we're not doing it custom
    update(frameTime, totalTime){
      if(!this._clickable && this.countdownTime > 0){
        this.countdownTime -= frameTime;
        if(this.countdownTime < 0){
          this._clickable = true;
          this.upNode.visible = true;
          this.downNode.visible = false;
        }
      }
    }
}

export { Button };
