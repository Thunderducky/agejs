import { SceneNode } from "../core/scene_node"
import { noop } from "../core/utils"

import { RectangleBounds } from "../core/bounds"

class Checkbox {
  constructor(checked = false){
    this.checked = checked;
    this.node = new SceneNode();
    this._texChecked = null;
    this._texUnchecked = null;
    this.oncheck = noop;
    this.onuncheck = noop;
    this.node.bounds = null;
  }
  init(parentNode, texChecked, texUnchecked){
    if(parentNode){
      parentNode.addChild(this.node);
    }
    this._texChecked = texChecked;
    this._texUnchecked = texUnchecked;
    this.node.texture = this.checked
      ? this._texChecked
      : this._texUnchecked

    this.node.bounds = new RectangleBounds(this._texChecked.width, this._texChecked.height);
    this.node.onclick = () => {
      this.toggle();
    }
    return this;
  }

  toggle(){
    if(this.checked){
      this.uncheck();
    } else {
      this.check();
    }
  }
  check(){
    this.checked = true;
    this.oncheck();
    this.node.texture = this._texChecked;
  }
  uncheck(){
    this.checked = false;
    this.onuncheck();
    this.node.texture = this._texUnchecked;
  }
}

export { Checkbox }
