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
  pos:IVec2,
  render:()=>void
}
export interface ISpirite extends IElement{
  index:number
  image:HTMLImageElement
}
export type Context2D = CanvasRenderingContext2D
class Stage{

  protected elements:IElement[];

  constructor(){
    this.elements = []
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
    this.elements.forEach(el=>el.render())
  }
  
}
export interface SpiriteOption{
  image:HTMLImageElement
  width:number
  height:number
  context:Context2D
}

export function SpiriteFactory(proto: SpiriteOption) {

  let spirite = Object.create(proto);

  spirite.render = function (index: number, pos: IVec2) {
    const iWidth = this.image.width;
    const iHeight = this.image.height;
    const cols = Math.floor(iWidth / this.width);
    const rows = Math.floor(iHeight / this.height);
    const row = Math.floor(index / cols);
    const col = index % cols;
    this.context.drawImage(this.image, col * this.width, row * this.height, this.width, this.height, pos.x, pos.y, this.width, this.height);
  }
  
  return spirite
}

