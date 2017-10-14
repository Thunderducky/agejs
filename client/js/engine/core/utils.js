const between = (a,b,c) =>{
  return (a >= b && a <= c) || (a <= b && a >= c);
}

const last = (arr) => {
  return arr[arr.length-1];
}

const noop = () => {};

export { between, last, noop}
