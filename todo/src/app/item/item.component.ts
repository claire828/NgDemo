import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,Input } from '@angular/core';
import {TaskManagerService} from '../task-manager.service';

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

  constructor(public taskService:TaskManagerService) { }
  ngOnInit(): void {
  }



  onComplete():void{
    this.taskService.completeTask(this.item);
  }

  onDelete():void{
    this.taskService.removeTask(this.item);
  }

  mouseEnter(){
   this.isFocus = !this.isFocus;
 }

 save(event: any) {
  if(!event.target.value){
    return this.onDelete();
  }
  this.taskService.updateTaskName(this.item,event.target.value);
  //this.item.name = event.target.value;
  //this.taskService.todoList.find(x=>x.name == this.item.name).name = this.item.name;
}

  onChangeTick(){
    this.item.isTick = !this.item.isTick;
    this.taskService.todoList.find(x=>x.name == this.item.name).isTick = this.item.isTick;
    this.onComplete();
  }

  test(){
    console.log("test!!");
  }



}
