import { SceneNode } from "../core/scene_node"
import { noop } from "../core/utils"
import { GameText } from "../core/game_text"
import { RectangleBounds } from "../core/bounds"

class Textbox {
  constructor(){
    this.node = new SceneNode();
    this.node.text = new GameText();
  }
  init(backgroundImage){
    this.node.texture = backgroundImage;
    return this;
  }

  get text(){
    return this.node.text.text;
  }
  set text(t){
    this.node.text.text = t;
  }
}
