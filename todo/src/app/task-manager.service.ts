import { Injectable } from '@angular/core';
import {IItemStruct} from './item/item.component'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  id:number;
  todoList:IItemStruct[] = [];
  constructor() { }

  addItem(task:IItemStruct){
    this.todoList.push(task);
  }


  getList():Observable<IItemStruct[]>{
    //TODO call server to extract list
    return of(this.todoList);
  }


  updateTask(task:IItemStruct){
    // call the server and save to the client
  }

  updateTaskName(task:IItemStruct, newName:string){
    this.getTask(task.name).name = newName;
  }

  removeTask(task:IItemStruct){
    this.getTask(task.name).isRemove = true;
  }

  completeTask(task:IItemStruct){
    this.getTask(task.name).complete = true;
  }

  removeAllCompleteTask(){
    this.todoList = this.todoList.filter(x=>x.complete != true);
  }


  getTask(name:string):IItemStruct{
    return this.todoList.find(x=>x.name == name);
  }


}
