import { Component, OnInit, Input } from '@angular/core';
import {IItemStruct} from '../item/item.component';
import {TaskManagerService} from '../task-manager.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  readonly DAFAULTMSG:string="What needs to be done?";
  defaultInput:string =  this.DAFAULTMSG;
  isFolded:boolean = false;
  
  constructor(public taskService:TaskManagerService ) { }

  ngOnInit(): void {
  }

  addItem(name:string):void{
    let task:IItemStruct = {
      name,
      complete:false,
      isRemove:false,
      isTick:false
    }
    this.taskService.todoList.push(task);
  }

  foldList():void{
    this.isFolded = !this.isFolded;
  }

  onAllTcikComplete():void{
    // TODO send to the server that all task are completed.
    // and then clear all todoList
    this.taskService.todoList.forEach(x=>x.isTick=true);
  }

  onDeleteCompleteTask():void{
    this.taskService.removeAllCompleteTask();
  }

  onFocus():void{
    this.defaultInput = "";
  }

  onFocusOutEvent(event: any){
    this.defaultInput = this.DAFAULTMSG;
  }

  save(event: any) {
    if(!event.target.value) return;
    this.addItem(event.target.value);
    this.defaultInput = this.DAFAULTMSG;
  }

  getIcon():string{
    return this.taskService.todoList.length>0 ? "❯" : "";
  }

  
 

  onbtnRemoveAllCompletedTasks(){
    
   //let completedList = this.taskService.todoList.filter(x=>x.complete);
   //TODO send to the server
   this.taskService.todoList = this.taskService.todoList.filter(x=>!x.complete);
   console.log("clear")
  }




}


