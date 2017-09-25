class GameText {
  constructor(text, style, font){
    this.text = text;
    this.style = style;
    this.font = font;
  }
}

const drawText = (ctx, gameText) => {
  ctx.save()
  ctx.font = gameText.font
  ctx.fillStyle = gameText.style;
  ctx.fillText(gameText.text,0,0);
  ctx.restore();
}

export { GameText, drawText }
