class GameText {
  constructor(text, align = "start", style = "white", font = "16px 'Space Mono'"){
    this.text = text;
    this.style = style;
    this.font = font ;
    this.align = align;
  }
}

const drawText = (ctx, gameText) => {
  ctx.save()
  ctx.font = gameText.font || ctx.font;
  ctx.fillStyle = gameText.style || ctx.fillStyle;
  ctx.textAlign = gameText.align;
  ctx.fillText(gameText.text,0,0);
  ctx.restore();
}

export { GameText, drawText }
