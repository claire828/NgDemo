import { Component, OnInit,Input } from '@angular/core';

export interface IItemStruct{
  name:string,
  complete:boolean
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()item:IItemStruct;

  isRemove:boolean;
  isFocus:boolean;

  constructor() { }
  ngOnInit(): void {
  }


  onEdit():void{
    // unlock the editable
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

  onRemove():void{
    //TODO 刪除自己
    this.isRemove = true;
  }

  onFocus():void{
    console.log("focus");
  }

  mouseEnter(){
   this.isFocus = !this.isFocus;
 }

 

}
