
// TODO: Really understand matrix transforms
class Transform {
  constructor(){
    this.reset();
  }
  reset(){
    this.m = [1,0,  // m11, m12 0,1 // Scale and rotation
              0,1,  // m21, m22 2,3
              0,0]; // dx, dy, 4,5  // Offset
    return this;
  }
  multiply(matrix){
    const m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
    const m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

    const m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
    const m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

    const dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
    const dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;

    return this;
  }
  invert(){
    const d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
    const m0 = this.m[3] * d;
    const m1 = -this.m[1] * d;
    const m2 = -this.m[2] * d;
    const m3 = this.m[0] * d;
    const m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
    const m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
    this.m[0] = m0;
    this.m[1] = m1;
    this.m[2] = m2;
    this.m[3] = m3;
    this.m[4] = m4;
    this.m[5] = m5;

    return this;
  }
  // Transformation is in radians
  rotate(rad){
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const m11 = this.m[0] * c + this.m[2] * s;
    const m12 = this.m[1] * c + this.m[3] * s;
    const m21 = this.m[0] * -s + this.m[2] * c;
    const m22 = this.m[1] * -s + this.m[3] * c;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;

    return this;
  }
  translate(x,y){
    this.m[4] += this.m[0] * x + this.m[2] * y;
    this.m[5] += this.m[1] * x + this.m[3] * y;

    return this;
  }
  scale(sx, sy){
    this.m[0] *= sx;
    this.m[1] *= sx;
    this.m[2] *= sy;
    this.m[3] *= sy;

    return this;
  }
  set(matrix){
    for(var i = 0; i < 6; i++){
      this.m[i] = matrix.m[i];
    }
    return this;
  }

  // Transform coordinate into current coordinate space
  transformPoint(px, py){
    var x = px;
    var y = py;
    px = x * this.m[0] + y * this.m[2] + this.m[4];
    py = x * this.m[1] + y * this.m[3] + this.m[5];

    return {x:px,y: py};
  }

  zeroPoint(){
    return this.transformPoint(0,0);
  }

  copy(){
    return new Transform().set(this);
  }

}

const approx = (number) => {
  return number.toFixed(2);
  // return Math.abs(number) < 0.0000000001
  //   ? "~0"
  //   : number

}

function printTransform(t){
  console.log(`
    [ ${approx(t.m[0])}, ${approx(t.m[1])}
      ${approx(t.m[2])}, ${approx(t.m[3])}
      ${approx(t.m[4])}, ${approx(t.m[5])} ]
  `);
  return this;
}

const nodeTransform = (node, transform = new Transform()) => {
  return transform.copy()
    .translate(node.translation.x,
               node.translation.y)
    .rotate(node.rotation)
    .scale(node.scale.x, node.scale.y);
};




export { Transform, nodeTransform, printTransform };
