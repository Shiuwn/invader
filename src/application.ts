export interface VectorInterface{
  plus(vec:Vector):Vector
  dot(vec:Vector):number
  normal():number

}
const dimError = new Error('vector plus operator need vectors have same length');

export class Vector implements VectorInterface{
  private elements:number[];
  constructor(...args:number[]){
    this.elements = args;
  }
  plus(vec: Vector) {
    const el1 = vec.elements;
    const el2 = this.elements;
    if (el1.length !== el2.length) throw dimError;
    return new Vector(...el1.map(function (e, i) {
      return e + el2[i]
    }));
  }

  dot(vec:Vector):number{
    const el1 = vec.elements;
    const el2 = this.elements;
    if(el1.length!==el2.length) throw dimError
    return el1.map((e,i)=>e+el2[i]).reduce((sum,el)=>sum+el,0)
  }
  normal(){
    const el = this.elements;
    return Math.pow(el.reduce((sum,num)=>sum+Math.pow(num,2),0),0.5)
  }

}

export class Application {
  private context:CanvasRenderingContext2D|null;
  private canvas:HTMLCanvasElement;
  constructor(canvas:HTMLCanvasElement){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  public start(){

  }
  public stop(){

  }
  protected step(timeStamp:DOMHighResTimeStamp){
    
  }

}