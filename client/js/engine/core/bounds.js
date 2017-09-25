import { between } from "./utils"

class RectangleBounds {
  constructor(width,height,offset, x = 0, y = 0){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    if(offset){
      this.x = this.x - offset.x*this.width,
      this.y = this.y - offset.y * this.height;
    }
  }
  contains(point){
    return (
      between(point.x, this.x, this.x + this.width) &&
      between(point.y, this.y, this.y + this.height)
    );
  }
}


export { RectangleBounds }
