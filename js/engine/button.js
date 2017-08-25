class Button {
  constructor(textures,x,y,onclick){
    onclick = onclick || function(){};
    this.released = textures[0];
    this.pressed = textures[1] || textures[0];
    this.x = x;
    this.y = y;
    this.onclick = onclick;
    this.isPressed = false;

    this._current = this.released;
  }

  click(){
    this._current = this.pressed;
    this.isPressed = true;
  }

  release(){
    this._current = this.released;
    this.isPressed = false;
    this.onclick();


  }

  draw(drawTexture){
    let x = this.x, y = this.y;
    if(this.isPressed){
      y += 4;
    }
    drawTexture(this._current, x, y);
  }
}

export default Button;
