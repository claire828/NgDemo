import { Injectable } from '@angular/core';
import {IItemStruct,Page} from './def/defTask'
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {TaskDB} from './db/taskDB';
import faker from 'faker';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private taskDB:TaskDB;
  constructor(private apollo:Apollo) {
    this.taskDB = new TaskDB();
    console.log('send')
    this.apollo
    .watchQuery({
      query: gql`
        {
          list {
            id
            status
            value
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      try {
        const { data } = result
        if(data && data.list) {
          // return data.List
          console.log(result)
        }
      } catch(e) {
        console.log(e.message)
      }
    })
   }


  getListFromServer():Observable<IItemStruct[]>{
    return of(this.taskDB.todoList);
  }

  
  addItem(name:string):void{
    
    let task:IItemStruct = {
      name,
      uuid:`${name}.${faker.random.uuid()}`,
      complete:false,
      isRemove:false,
      isFocus:false
    }
    //TODO send to server, when success then add to the task
    this.taskDB.addTask(task);
  }


  updateTaskName(task:IItemStruct, newName:string){
    this.taskDB.getTask(task.uuid).name = newName;
    //TODO send to server
  }

  removeTask(task:IItemStruct){
    this.taskDB.getTask(task.uuid).isRemove = true;
    //TODO send to server
    this.taskDB.resetListAfterRemoving();
  }

  completeTask(task:IItemStruct, complete:boolean){
    //TODO send to the server
    this.taskDB.getTask(task.uuid).complete = complete;
  }

  completeAllTasks(complete:boolean){
    //TODO send to the server
    this.taskDB.completeAllTasks(complete);
  }

  removeAllCompleteTask(){
    //TODO send to the server
    this.taskDB.todoList.filter(x=>x.complete).map(task=>task.isRemove = true);
    this.taskDB.resetListAfterRemoving();
  }


  get list():IItemStruct[]{
    return this.taskDB.todoList;
  }

}
