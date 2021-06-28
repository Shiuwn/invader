interface Vector{
  plus(vec:Vector):Vector
  minus(vec:Vector):Vector
  mulitply(vec:Vector):Vector
  magnitude():number

}
class Vector implements Vector{
  private elements:number[];
  constructor(elements:number[]){
    this.elements = elements;
  }
  plus(vec: Vector) {
    var el1 = vec.elements;
    var el2 = this.elements;
    if (el1.length !== el2.length) throw new Error('vector plus operator need vectors have same length')
    return new Vector(el1.map(function (e, i) {
      return e + el2[i]
    }));
  }
}
class Application {
  private context:CanvasRenderingContext2D;
  constructor(context:CanvasRenderingContext2D){
    this.context = context;
  }

}