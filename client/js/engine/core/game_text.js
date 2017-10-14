class GameText {
  constructor(text, style = "white", font = "16px arial"){
    this.text = text;
    this.style = style;
    this.font = font ;
  }
}

const drawText = (ctx, gameText) => {
  ctx.save()
  ctx.font = gameText.font || ctx.font;
  ctx.fillStyle = gameText.style || ctx.fillStyle;
  ctx.fillText(gameText.text,0,0);
  ctx.restore();
}

export { GameText, drawText }
