export interface IStage{
  add:(el:IElement)=>{},
  remove:(el:IElement)=>{},
  render:()=>{}
}
export interface IVec2{
  x:number
  y:number
}
export interface IElement{
  render:()=>void
}
export interface ISprite extends IElement{
  index:number
  pos:IVec2
}

export type Context2D = CanvasRenderingContext2D

export class Stage{

  protected elements:IElement[];
  protected context:Context2D;
  protected stageColor:string|CanvasPattern|CanvasGradient
  constructor({context,stageColor}:{context:Context2D,stageColor:string|CanvasGradient|CanvasPattern}){
    this.elements = [];
    this.context = context;
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.stageColor = stageColor;
  }

  add(el:IElement){
    this.elements.push(el)
  }

  remove(el:IElement){
    const len = this.elements.length;
    for(let i=0;i<len;i++){
      if(this.elements[i]===el){
        this.elements.splice(i,1);
        break;
      }
    }
  }

  render(){
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.save();
    this.context.fillStyle = this.stageColor;
    this.context.fillRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.context.restore();
    this.elements.forEach(el=>el.render())
  }
  
  static loadImages(srcList:string[]){
    return new Promise<Promise<HTMLImageElement>[]>(resolve=>{
      resolve(srcList.map(src => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = src;
          image.onload = () => {
            resolve(image);
          };

          image.onerror = (e) => {
            reject(e)
          };

        })
      }) as Promise<HTMLImageElement>[]
      )
    }).then(list=>Promise.all(list)).then(images=>{
      const imageMap:{[key:string]:HTMLImageElement} = {};
      srcList.forEach((src,i)=>{
        imageMap[src] = images[i];
      });
      return imageMap
    });
  }
}
export interface SpriteProto{
  image:HTMLImageElement
  width:number
  height:number
  context:Context2D
}

export type SpriteU = ISprite&SpriteProto;

export function SpriteFactory(proto: SpriteProto) {

  let sprite:SpriteU = Object.create(proto);
  return function(index:number,pos:IVec2):SpriteU{
    sprite.index = index;
    sprite.pos = pos;
    sprite.render = function () {
      const index = this.index;
      const pos = this.pos;
      const iWidth = this.image.width;
      const iHeight = this.image.height;
      const cols = Math.floor(iWidth / this.width);
      const rows = Math.floor(iHeight / this.height);
      const row = Math.floor(index / cols);
      const col = index % cols;
      this.context.drawImage(this.image, col * this.width, row * this.height, this.width, this.height, pos.x, pos.y, this.width, this.height);
    }
    return sprite
  }
}

