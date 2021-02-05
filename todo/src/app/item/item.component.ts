
import { Component, OnInit,Input,Output } from '@angular/core';
import {TaskManagerService} from '../task-manager.service';
import {IItemStruct} from '../def/defTask';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()item:IItemStruct;

  constructor(private taskService:TaskManagerService) { }
  ngOnInit(): void {
  }

  onComplete():void{
    this.taskService.completeTask(this.item,this.item.complete);
  }

  onDelete():void{
    this.taskService.removeTask(this.item);
  }

  mouseEnter(){
   this.item.isFocus = !this.item.isFocus;
 }

 save(event: any) {
  if(!event.target.value) return this.onDelete();

  this.taskService.updateTaskName(this.item,event.target.value);
}

  onChangeTick(){
    this.item.complete = !this.item.complete;
    this.onComplete();
  }



}
