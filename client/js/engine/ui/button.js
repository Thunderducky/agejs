import { SceneNode } from "../core/scene_node"
import { GameText } from "../core/game_text"

import { RectangleBounds } from "../core/bounds"

import { noop } from "../core/utils"

class Button {
  constructor(timer_manager){
    this.node = new SceneNode();
    this.releasedNode = new SceneNode(this.node);
    this.pressedNode = new SceneNode(this.node);
    this.textNode = new SceneNode(this.node);
    this.pressedNode.visible = false;
    this.pressed = false;
    this.onpress = noop;
    this.onrelease = noop;
    this._tm = timer_manager;
    this._t = null;
    this.depressDistance = 4;
  }
  init(parentNode, texture1, texture2, text = ""){
    parentNode.addChild(this.node);
    this.releasedNode.texture = texture1;
    this.pressedNode.texture = texture2;
    this.node.bounds = new RectangleBounds(texture1.width, texture1.height,{x:0.5, y:0.5});
    this.node.onclick = () => {
      this.press();
    }

    this.pressedNode.translation.y += this.depressDistance;
    this.textNode.text = new GameText(text, "center");
  }
  press(){
    this.pressed = true;
    this.pressedNode.visible = true;
    this.releasedNode.visible = false;
    this.textNode.translation.y = 6;
    this.onpress();
    // Not sure about this implementation :/
    if(this._t){
      this._t.delay(1000);
    } else {
      this._t = this._tm.addTimerRelative(
        1000, () => {
          this.release()
          this._t = null;
        }
      );
    }
  }
  release(){
    this.pressed = false;
    this.pressedNode.visible = false;
    this.releasedNode.visible = true;

    this.textNode.translation.y = 0;
    this.onrelease();
  }
}

export { Button };
