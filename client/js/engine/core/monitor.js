import { SceneNode } from "./scene_node"
import { GameText } from "./game_text"
class Monitor {
  constructor(){
    this.target = null;
    this.node = new SceneNode();
    this.node.text = new GameText("Monitor");
    this.stringer = () => {};
  }
  init(parentNode, target, stringer = (target) => { return target.toString(); }){
    this.target = target;
    this.stringer = stringer;
    parentNode.addChild(this.node);
    return this;
  }
  update(stepTime, gameTime){
    this.node.text.text = this.stringer(this.target);
  }
}

export { Monitor }
