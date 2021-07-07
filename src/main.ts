import { SpriteFactory,SpriteProto,Context2D,Stage } from "./Sprite";

function main(){
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if(!canvas) throw new Error('can not get canvas');
  const context = canvas.getContext('2d') as Context2D;
  const img = new Image();
  // img.src = './images/invaders.png';
  var promise:Promise<number> = Promise.resolve(1);
  Stage.loadImages(['./images/invaders.png']).then((imageMap)=>{
    const spriteSetting:SpriteProto = {
      image:imageMap['./images/invaders.png'],
      width:32,
      height:32,
      context:context
    }
    const Sprite = SpriteFactory(spriteSetting);
    const sprite = Sprite(0,{x:10,y:10});
    const stage = new Stage({context,stageColor:'#121212'});
    stage.add(sprite);
    stage.render();
    setInterval(function(){
      sprite.index = sprite.index + 1;
      stage.render();
      console.log(sprite.index)
    },1000);
  });
  
}
main();