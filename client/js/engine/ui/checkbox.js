import { SceneNode } from "../core/scene_node"
import { noop } from "../core/utils";
class Checkbox {
  constructor(checked = false){
    this.checked = checked;
    this.node = new SceneNode();
    this._texChecked = null;
    this._texUnchecked = null;
    this.oncheck = noop;
    this.onuncheck = noop;
  }
  init(texChecked, texUnchecked){
    this._texChecked = texChecked;
    this._texUnchecked = texUnchecked;
    this.node.texture = this.checked
      ? this._texChecked
      : this._texUnchecked
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
    this.node.textutre = this._texChecked;
  }
  uncheck(){
    this.unchecked = true;
    this.onuncheck();
    this.node.texture = this._texUnchecked;
  }
}
