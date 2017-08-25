const NORTH = 0, MID = 1, SOUTH = 2,
      WEST = 0,           EAST  = 2;

class Panel {
  constructor(texture, x,y, width = 100, height = 100,offset = 10){
    this.texture = texture;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.split = []
    this.offset = offset;
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        const side = Object.assign({}, texture)

        switch(i){
          case NORTH:
            side.height = offset;
            break;
          case MID:
            side.y = side.y + offset;
            side.height = 1;
            break;
          case SOUTH:
            side.y = side.y + side.height - offset;
            side.height = offset;
            break;
        }
        switch(j){
          case WEST:
            side.width = offset;
            break;
          case MID:
            side.x = side.x + offset;
            side.width = 1;
            break;
          case EAST:
            side.x = side.x + side.width - offset;
            side.width = offset;
            break;
        }
        this.split.push(side);
      }
    }

  }
  draw(drawTexture){
    const [nw,n,ne, w,m,e,sw,s,se] = this.split;
    let x = this.x, y = this.y;
    drawTexture(nw,x,y);

    x = this.x + this.offset;
    drawTexture(n,x,y,(this.width - this.offset*2), 1);

    x = this.x + this.width - this.offset;
    drawTexture(ne,x,y);

    x = this.x;
    y = this.y + this.offset;
    drawTexture(w,x,y,1,this.height - this.offset * 2);

    x = this.x + this.offset;
    drawTexture(m,x,y,this.width - this.offset*2,this.height - this.offset * 2);

    x = this.x + this.width - this.offset;
    drawTexture(e,x,y,1,this.height - this.offset * 2);

    x = this.x;
    y = this.y + this.height - this.offset;
    drawTexture(sw,x,y);

    x = this.x + this.offset;
    drawTexture(s,x,y,this.width - this.offset*2,1);

    x = this.x + this.width - this.offset;
    drawTexture(se,x,y);
  }
}

export default Panel;
