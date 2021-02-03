import { Component, OnInit,Input } from '@angular/core';

export interface IItemStruct{
  name:string,
  complete:boolean,
  isTick:boolean,
  isRemove:boolean
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()item:IItemStruct;

  //isRemove:boolean;
  isFocus:boolean;

  constructor() { }
  ngOnInit(): void {
  }



  onChange(name:string):void{
    //TODO emit event: the task has been changed.
    //如果資料為空，刪除任務
    //反之，修改資料名稱
  }

  onComplete():void{
    //TODO emit event: the task has been changed.
    this.item.complete = !this.item.complete;
  }

  onDelete():void{
    this.item.isRemove = true;
  }

  mouseEnter(){
   this.isFocus = !this.isFocus;
 }

 save(event: any) {
  if(!event.target.value){
    return this.onDelete();
  }
  this.item.name = event.target.value;
}

  onChangeTick(){
    this.item.isTick = !this.item.isTick;
  }

  test(){
    console.log("test!!");
  }


}
