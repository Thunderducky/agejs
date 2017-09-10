import SceneNode from './scene_node'

class Button {
  constructor(textures, width, height, onclick){
    this.node = new SceneNode();
    this.upNode = new SceneNode(this.node);   // Button Released
    this.upNode.texture = textures[0];
    this.downNode = new SceneNode(this.node); // Button Pressed
    this.downNode.texture = textures[1];
    this.downNode.visible = false;

    this.width = width;
    this.height = height;

    this.textNode = new SceneNode(this.node);
    this.textNode.text = "test";
    this.textNode.textStyle = "white"
    this.textNode.translation.x = -30;
    this.textNode.translation.y = 10;

  }
  toggle(){
    this.upNode.visible = this.downNode.visible;
    this.downNode.visible = !this.downNode.visible;
    if(this.upNode.visible){
      this.textNode.translation.y = 10;
    } else {
      this.textNode.translation.y = 12;
    }
  }
}

export default Button;
