import BlueSheet from "../asset_data/blue_sheet.json"
import GreenSheet from "../asset_data/green_sheet.json"
import GreySheet from "../asset_data/grey_sheet.json"
import RedSheet from "../asset_data/red_sheet.json"
import YellowSheet from "../asset_data/yellow_sheet.json"

import loadAtlas from "./asset_loader"

import Panel from "./panel"
import Button from "./button"

// Let's just draw a couple images to canvas
var canvas = document.getElementById("test");
var ctx = canvas.getContext("2d");

const drawTexture = (texture, x, y, scaleX=1, scaleY=1) => {
  ctx.drawImage(texture.image,
    texture.x, texture.y,
    texture.width, texture.height,
    x,y,
    texture.width*scaleX, texture.height*scaleY)
}

const loadAllAssets = () => {
  Promise.all([
    loadAtlas(BlueSheet),
    loadAtlas(GreenSheet),
    loadAtlas(GreySheet),
    loadAtlas(RedSheet),
    loadAtlas(YellowSheet)
  ]).then((atlases) => {
    const [blueAtlas, greenAtlas, greyAtlas, redAtlas, yellowAtlas] = atlases;

    const panel = new Panel(blueAtlas.get("blue_panel"), 0, 0,800,400);
    panel.draw(drawTexture);

    const button = new Button([
      greenAtlas.get("green_button00"),
      greenAtlas.get("green_button01")
    ], 0, 0);

    button.x = panel.x + panel.width - button._current.width - 20;
    button.y = panel.y + panel.height - button._current.height - 20;

    ctx.font = "16px Space Mono";
    ctx.fillStyle = "#DDFFDD";

    setInterval(function(){
      panel.draw(drawTexture);
      button.draw(drawTexture);
      var x = 648;
      var y = 358;
      if(button.isPressed){
        y += 4;
      }
      ctx.fillText("CLICK ME", x, y);
    },1);

    window.button = button;

    canvas.onclick = function(){
      button.click();
      setTimeout(function(){
        button.release();
      },500);
    }

  });
};

loadAllAssets();
