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
    this.apollo
    .watchQuery({
      query: gql`
        query {
          list {uuid status name}
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      try {
        if(result?.data?.list) {
          this.taskDB.insertAllData(result.data.list);
          console.log(result)
        }
      } catch(e) {
        console.log(e.message)
      }
    })
   }


  
  addItem(name:string):void{
    let task:IItemStruct = {
      name,
      uuid:`${name}.${faker.random.uuid()}`,
      complete:false,
      isRemove:false,
      isFocus:false
    };
    this.apollo.mutate({
      mutation: gql`mutation {
        create(uuid: "${task.uuid}", name: "${name}") {
          id uuid status name }
      }`
    }).subscribe(result => {
      this.taskDB.addTask(task);
    }, error => {
      console.log(`failed request:[add item]`);
    });
  }


  updateTaskName(task:IItemStruct, newName:string){
    let newTask = Object.assign({},task);
    newTask.name = newName;
    this.apollo.mutate({
      mutation: gql`${this.generateUpdateQuery(newTask)}`
    }).subscribe(result => {
      this.taskDB.getTask(task.uuid).name = newName;
    }, error => {
      console.log(`failed request:[add item]`);
    });
  }


  completeTask(task:IItemStruct, complete:boolean){
    let newTask = Object.assign({},task);
    newTask.complete = complete;
    this.apollo.mutate({
      mutation: gql`${this.generateUpdateQuery(newTask)}`
    }).subscribe(result => {
      this.taskDB.getTask(task.uuid).complete = complete;
    }, error => {
      console.log(`failed request:[add item]`);
    });
  }

  generateUpdateQuery(newTask:IItemStruct):string{
    return `mutation {
      update(uuid: "${newTask.uuid}", name: "${newTask.name}", status:${Number(newTask.complete)}) {
        id uuid status name }
    }`;
  }

  completeAllTasks(complete:boolean){
    //TODO send to the server
    this.taskDB.completeAllTasks(complete);
  }

  removeTask(task:IItemStruct){
    this.apollo.mutate({
      mutation: gql`mutation {
        delete(uuid: "${task.uuid}") {id uuid status name }
      }`
    }).subscribe(result => {
      this.taskDB.getTask(task.uuid).isRemove = true;
      this.taskDB.resetListAfterRemoving();
    }, error => {
      console.log(`failed request:[add item]`);
    });
  }

  removeAllCompleteTask(){
    //TODO send to the server
    this.taskDB.todoList.filter(x=>x.complete).map(task=>task.isRemove = true);
    this.taskDB.resetListAfterRemoving();
  }


  get List():IItemStruct[]{
    return this.taskDB.todoList;
  }




}
