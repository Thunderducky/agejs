import { SceneNode } from "../core/scene_node"
import { GameText } from "../core/game_text"

class Label {
  constructor(text){
    this.node = new SceneNode();
    this.node.text = new GameText();
    this.node.text.text = text;
  }
  init(parentNode){
    if(parentNode){
      parentNode.addChild(this.node);
    }
    return this;
  }
  // Hey, let's try some FANCY shit
  get text(){
    return this.node.text.text;
  }
  set text(t){
    this.node.text.text = t;
  }
}

export { Label };
