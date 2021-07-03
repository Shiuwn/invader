interface ResourceList{
  image:string[]
}
export default function loadResource(resourceList:ResourceList){
  
}
enum Status{
  LOADING,
  FINISH,
  IDLE
}
interface IImageThread{
  thread:HTMLImageElement
  id:number
  status:Status
  load(src:string):void
}

class ImageThread implements IImageThread{
  thread:HTMLImageElement
  id:number
  status:Status
  private context:ImageThreadPool
  constructor(id:number,context:ImageThreadPool){
    this.thread = new Image();
    this.id = id;
    this.status = Status.IDLE;
    this.context = context;
  }
  load(src:string){
    this.thread.src = src;
    this.status = Status.LOADING
    this.thread.onload = ()=>{
      this.status = Status.IDLE
      this.notify()
    }
  }
  notify(){
    this.context.commit(this);
  }
}

class ImageThreadPool{
  private pool:ImageThread []
  private activeFn:(data?:any)=>void
  constructor(max:number){
    this.pool = [];
    this.activeFn = ()=>{}
    let i = 0;
    while(i<max){
      this.pool.push(new ImageThread(i,this));
      i++
    }
    
  }
  private listen(fn:(data?:any)=>void){
    this.activeFn = fn;
  }
  commit(thread:ImageThread){
    this.activeFn(thread);
  }
  load(srcList:string[]){

    this.listen((thread)=>{
      srcList.length&&thread.load(srcList.pop())
    });

    this.pool.forEach((thread)=>{
      thread.load(srcList.pop() as string)
    });
    
  }
}